import KoaRouter from "koa-router"
import { start, state } from "../controllers"
import {
  IPomoStartCtrl200,
  IPomoStateCtrl200,
  IPomoStateCtrl40x
} from "../models"

const router = new KoaRouter()

/**
 * Start a Pomodoro timer.
 * @returns {Pomodoro} Pomodoro instance created.
 */
router
  .get("/start", async (ctx) => {
    const response = await start()
    if ((<IPomoStartCtrl200>response).status === 200) {
      ctx.status = response.status
      ctx.body = response.data
    }
  })
  .get("/state", (ctx) => {
    const response = state(ctx)

    if (response.status === 200) {
      console.log("Serving 200 OK")
      // type assertion going on heeya.
      ctx.status = (<IPomoStateCtrl200>response).status
      ctx.body = (<IPomoStateCtrl200>response).data
    }

    if (response.status === 400) {
      console.log("Serving 400 BAD REQUEST")
      ctx.status = (<IPomoStateCtrl40x>response).status
      ctx.body = (<IPomoStateCtrl40x>response).data
    }

    if (response.status === 404) {
      console.log("Serving 404 NOT FOUND")
      ctx.status = (<IPomoStateCtrl40x>response).status
      ctx.body = (<IPomoStateCtrl40x>response).data
    }
  })

export const PomodoroRoutes = router
