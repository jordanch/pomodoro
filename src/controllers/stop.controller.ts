import KoaRouter from "koa-router"
import { IStopRequest, IStorage, IStopController } from "../models"
import { debug } from "."

/**
 * Stop pomodoro timer.
 */
export async function stop(
  ctx: KoaRouter.IRouterContext
): Promise<IStopController> {
  // const { id: idString } = ctx.query as IStopRequest
  const { id: idString } = ctx.request.body as IStopRequest

  const id = parseInt(idString)
  // TODO: once context is interfaced, remove as IStorage
  let db: IStorage
  // @ts-ignore
  db = ctx.storage

  // no id in request
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
    debug(`Stopping pomodoro id ${id}`)

    if (pomodoro.running) {
      pomodoro.stop()

      await db.updatePomodoro(pomodoro, id)

      return {
        status: 200,
        body: `Stopped ${id}`
      }
    } else {
      debug(`Pomodoro id ${id} already stopped`)

      return {
        status: 200,
        body: `Pomodoro ${id} not running. Was stopped at ${pomodoro.stoppedAt}`
      }
    }
  }

  // not found using id
  debug("Could not find pomodoro by id.")

  return {
    status: 404,
    body: `Could not find id ${id}`
  }
}
