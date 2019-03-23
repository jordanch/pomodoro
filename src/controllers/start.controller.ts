import KoaRouter from "koa-router"
import { Pomodoro } from "../runtime"
import { IStorage, IStartController } from "../models"

/**
 * Start a pomodoro timer.
 */
export async function start(
  ctx: KoaRouter.IRouterContext
): Promise<IStartController> {
  // @ts-ignore
  const db = ctx.storage as IStorage
  const id = await db.getNextId()
  const pomodoro = new Pomodoro({ id, startedAt: new Date() })
  await db.addPomodoro(pomodoro)

  return {
    status: 200,
    body: id
  }
}
