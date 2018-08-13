import { Pomodoro, cache } from "../runtime"
import {
  ISessionCache,
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
export async function start() {
  const id = await getNextId(cache)
  const pomodoro = new Pomodoro(id)
  cache.sessions.byId[id] = pomodoro
  cache.sessions.allIds.push(id)

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
    const minutesElapsed = Math.floor(pomodoro.elapsedMs / 100000)

    return {
      status: 200,
      data: {
        ms: pomodoro.elapsedMs,
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

/**
 * Get the next pomodoro's id. Async operation. todo: add db query.
 */
function getNextId(storage: ISessionCache): number {
  const allIds = storage.sessions.allIds.slice()
  const [lastId] = allIds.sort().splice(-1)
  console.log(`Last id ${lastId}, new pomodoro id ${nextId(lastId)}`)

  return nextId(lastId)

  function nextId(lastId: undefined | number): number {
    if (!lastId) {
      return 1
    }

    return lastId + 1
  }
}
