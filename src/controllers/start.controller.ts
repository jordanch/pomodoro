import { Pomodoro } from "../runtime";
import { IStorage } from "../models";
import KoaRouter from "koa-router"

/**
 * Start a pomodoro timer.
 */
export async function start(ctx: KoaRouter.IRouterContext) {
    // TODO: wrap in try catch and handle success and error.
    try {
        // @ts-ignore
        const db = ctx.storage as IStorage;
        const id = await db.getNextId()
        const pomodoro = new Pomodoro(id)
        await db.addPomodoro(pomodoro, id)

        ctx.status = 200
        ctx.body = id

    } catch (e) {
        console.error(e);

        ctx.status = 500
        ctx.body = 'Could not add Pomodoro!'
    }
  }