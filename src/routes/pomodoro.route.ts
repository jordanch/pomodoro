import KoaRouter from "koa-router"
import { router } from "../runtime/init"
import { start, state, stop } from "../controllers"
import { responseCtx } from "../utils"
import { debug } from "."

router
  .post("/start", async function(ctx: KoaRouter.IRouterContext) {
    try {
      debug("POST /start")

      responseCtx(await start(ctx), ctx, debug)
    } catch (error) {
      debug(error)

      responseCtx(
        { status: 500, body: "Could not start Pomodoro!" },
        ctx,
        debug
      )
    }
  })
  .get("/state", async function(ctx: KoaRouter.IRouterContext) {
    try {
      debug("POST /state")

      responseCtx(await state(ctx), ctx, debug)
    } catch (error) {
      debug(error)

      responseCtx(
        { status: 500, body: "Could not get pomodoro state" },
        ctx,
        debug
      )
    }
  })
  .put("/stop", async function(ctx: KoaRouter.IRouterContext) {
    try {
      debug("POST /stop")

      responseCtx(await stop(ctx), ctx, debug)
    } catch (error) {
      debug(error)

      responseCtx({ status: 500 }, ctx, debug)
    }
  })

export const PomodoroRoutes = router
