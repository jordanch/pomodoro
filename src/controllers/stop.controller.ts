import {
  IStopRequest,
  IStorage
} from "../models"
import KoaRouter from "koa-router"

/**
 * Stop pomodoro timer.
 */
export async function stop(
  ctx: KoaRouter.IRouterContext
) {
  const { id: idString } = ctx.query as IStopRequest
  const id = parseInt(idString)
  // TODO: once context is interfaced, remove as IStorage
  let db: IStorage
  // @ts-ignore
  db = ctx.storage

  // no id in request
  if (isNaN(id)) {
    console.log("No id present on request")

    ctx.status = 400
    ctx.body = "Pass in a querystring param 'id=<number>'"
    console.log("Serving 400 BAD REQUEST")

    return
  }

  const pomodoro = await db.queryPomodoro(id)

  // found using id
  if (pomodoro) {
    console.log(`Stopping pomodoro id ${id}`)
    pomodoro.stop()
    await db.updatePomodoro(pomodoro, id)
    console.log("Serving 200 OK")
    ctx.status = 200
    ctx.body = `Stopped ${id}`

    return
  }

  // not found using id
  console.log("Could not find pomodoro by id.")
  console.log("Serving 404 NOT FOUND")
  ctx.status = 404
  ctx.body = `Could not find id ${id}`

  return
}
