import { Pomodoro, cache } from "../runtime"
import {
  IPomoStartCtrl200,
  IPomoStateCtrl200,
  IPomoStateCtrl40x,
  IStopRequest,
  IPomoStopCtrl40x,
  IPomoStopCtrl200,
  IStorage
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
  const id = await db.getNextId()
  const pomodoro = new Pomodoro(id)
  await db.addPomodoro(pomodoro, id)

  return { data: pomodoro, status: 200 } as IPomoStartCtrl200
}

/**
 * Get the state of a pomodoro by id.
 */
export async function state(ctx: KoaRouter.IRouterContext) {
  const { id: idString } = ctx.query as IStateRequest
  const id = parseInt(idString, 10)
  // TODO: once context is interfaced, remove as IStorage
  let db: IStorage;
  // @ts-ignore
  db = ctx.storage;

  // no id in request or id is number stringNum
  if (isNaN(id)) {
    console.log("No id present on request")
    return {
      status: 400,
      data: "Pass in a querystring param 'id=<number>'"
    } as IPomoStateCtrl40x
  }

  const pomodoro = await db.queryPomodoro(id)

  // found using id
  if (pomodoro) {
    const minutesElapsed = Math.floor(pomodoro.getElapsedMs() / 100000)
    console.log(`Responding with state of pomodoro id ${id}`)
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
  console.log("Failed in finding pomodoro by id.")
  return { status: 404, data: `Could not find id ${id}` } as IPomoStateCtrl40x
}

/**
 * Stop pomodoro timer.
 */
export async function stop(
  ctx: KoaRouter.IRouterContext
  ): Promise<IPomoStopCtrl200 | IPomoStopCtrl40x> {
    const { id: idString } = ctx.query as IStopRequest
    const id = parseInt(idString)
    // TODO: once context is interfaced, remove as IStorage
    let db: IStorage;
    // @ts-ignore
    db = ctx.storage;

    // no id in request
    if (isNaN(id)) {
    console.log("No id present on request")
    return {
      status: 400,
      data: "Pass in a querystring param 'id=<number>'"
    } as IPomoStopCtrl40x
  }

  const pomodoro = await db.queryPomodoro(id)

  // found using id
  if (pomodoro) {
    console.log(`Stopping pomodoro id ${id}`)

    pomodoro.stop()
    await db.updatePomodoro(pomodoro, id)

    return {
      status: 200,
      data: `Stopped ${id}`
    } as IPomoStopCtrl200
  }

  // not found using id
  console.log("Could not find pomodoro by id.")
  return { status: 404, data: `Could not find id ${id}` } as IPomoStopCtrl40x
}
