import KoaRouter from "koa-router"
import { IStateRequest, IStorage, IStateController } from "../models"
import { debug } from "."
/**
 * Get the state of a pomodoro by id.
 */
export async function state(
  ctx: KoaRouter.IRouterContext
): Promise<IStateController> {
  const { id: idString } = ctx.query as IStateRequest
  const id = parseInt(idString, 10)
  // TODO: once context is interfaced, remove as IStorage
  let db: IStorage
  // @ts-ignore
  db = ctx.storage

  // no id in request or id is number stringNum
  if (isNaN(id)) {
    debug("No id present on request")

    return {
      status: 400,
      body: "Pass in a querystring param 'id=<number>'"
    }
  }

  const pomodoro = await db.queryPomodoro(id)

  // found using id
  if (pomodoro) {
    debug(`Found pomodoro ${id}`)
    const minutesElapsed = Math.floor(pomodoro.getElapsedMs() / 100000)

    return {
      status: 200,
      body: {
        ms: pomodoro.getElapsedMs(),
        min: minutesElapsed,
        hasFinished: minutesElapsed >= 25,
        ...pomodoro
      }
    }
  }

  // not found using id
  debug(`Pomodoro id ${id} does not exist`)

  return {
    status: 404,
    body: `Could not find id ${id}`
  }
}
