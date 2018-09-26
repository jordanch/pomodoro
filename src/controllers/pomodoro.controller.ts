import { Pomodoro, cache } from "../runtime"
import {
  IPomoStartCtrl200,
  IPomoStateCtrl200,
  IPomoStateCtrl40x,
  IStopRequest,
  IPomoStopCtrl40x,
  IPomoStopCtrl200
} from "../models"
import KoaRouter from "koa-router"
import { IStateRequest } from "../models"

/**
 * Start a pomodoro timer.
 */
export async function start(ctx: KoaRouter.IRouterContext) {
  // TODO: wrap in try catch and handle success and error.
  // @ts-ignore
  const db = ctx.storage;
  const id = await db.getNextId(cache)
  const pomodoro = new Pomodoro(id)
  await db.addPomodoro(pomodoro, id)

  return { data: pomodoro, status: 200 } as IPomoStartCtrl200
}

/**
 * Get the state of a pomodoro by id.
 */
export function state(ctx: KoaRouter.IRouterContext) {
  const { id } = ctx.query as IStateRequest

  // no id in request
  if (!id) {
    console.log("No id present on request")
    return {
      status: 400,
      data: "Pass in a querystring param 'id=<number>'"
    } as IPomoStateCtrl40x
  }

  const pomodoro = cache.sessions.byId[id]

  // found using id
  if (pomodoro) {
    console.log(`Getting state of pomodoro id ${id}`)
    const minutesElapsed = Math.floor(pomodoro.getElapsedMs() / 100000)

    return {
      status: 200,
      data: {
        ms: pomodoro.getElapsedMs(),
        min: minutesElapsed,
        hasFinished: minutesElapsed >= 25,
        ...pomodoro
      }
    } as IPomoStateCtrl200
  }

  // not found using id
  console.log("Could not find pomodoro by id.")
  return { status: 404, data: `Could not find id ${id}` } as IPomoStateCtrl40x
}

/**
 * Stop pomodoro timer.
 */
export function stop(
  ctx: KoaRouter.IRouterContext
): IPomoStopCtrl200 | IPomoStopCtrl40x {
  const { id } = ctx.query as IStopRequest

  // no id in request
  if (!id) {
    console.log("No id present on request")
    return {
      status: 400,
      data: "Pass in a querystring param 'id=<number>'"
    } as IPomoStopCtrl40x
  }

  const pomodoro = cache.sessions.byId[id]

  // found using id
  if (pomodoro) {
    console.log(`Stopping pomodoro id ${id}`)

    pomodoro.stop()

    return {
      status: 200,
      data: `Stopped ${id}`
    } as IPomoStopCtrl200
  }

  // not found using id
  console.log("Could not find pomodoro by id.")
  return { status: 404, data: `Could not find id ${id}` } as IPomoStopCtrl40x
}
