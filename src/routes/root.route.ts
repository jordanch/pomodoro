import KoaRouter from "koa-router"
import { router } from "../runtime/init"
import { root } from "../controllers"
import { responseCtx } from "../utils"
import { debug } from "."

router.get("/", function(ctx: KoaRouter.IRouterContext) {
  try {
    responseCtx(root(), ctx, debug)
  } catch (error) {
    ctx.status = 500

    responseCtx({ status: 500 }, ctx, debug)
  }
})

export const Root = router
