import {
  IStateRequest,
  IStorage,
} from "../models"
import KoaRouter from "koa-router"

/**
 * Get the state of a pomodoro by id.
 */
export async function state(ctx: KoaRouter.IRouterContext) {
  const { id: idString } = ctx.query as IStateRequest
  const id = parseInt(idString, 10)
  // TODO: once context is interfaced, remove as IStorage
  let db: IStorage
  // @ts-ignore
  db = ctx.storage

  // no id in request or id is number stringNum
  if (isNaN(id)) {
    console.log("No id present on request")

    ctx.status = 400
    ctx.body = "Pass in a querystring param 'id=<number>'"

    console.log("Start controller 400")

    return
  }

  const pomodoro = await db.queryPomodoro(id)

  // found using id
  if (pomodoro) {
    const minutesElapsed = Math.floor(pomodoro.getElapsedMs() / 100000)
    console.log(`Responding with state of pomodoro id ${id}`)

    ctx.status = 200
    ctx.body = {
      ms: pomodoro.getElapsedMs(),
      min: minutesElapsed,
      hasFinished: minutesElapsed >= 25,
      ...pomodoro
    }

    console.log("Start controller 200 OK")

    return
  }

  // not found using id
  console.log("Failed in finding pomodoro by id.")
  ctx.status = 404
  ctx.body = `Could not find id ${id}`

  return
}
