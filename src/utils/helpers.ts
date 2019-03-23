import KoaRouter from "koa-router"
import { IRootController, IStartController, IStateController } from "../models"

export function responseCtx(
  response:
    | { status: number; body?: string }
    | IRootController
    | IStartController
    | IStateController,
  ctx: KoaRouter.IRouterContext,
  debug: Function
) {
  const { status, body } = response

  debug(status)

  ctx.status = status

  ctx.body = body
}
