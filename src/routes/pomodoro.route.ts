import KoaRouter from "koa-router"
import { start, state, stop } from "../controllers"
import {
  IPomoStartCtrl200,
  IPomoStateCtrl200,
  IPomoStateCtrl40x,
  IPomoStopCtrl200,
  IPomoStopCtrl40x
} from "../models"

const router = new KoaRouter()

// TODO: move response handling into controllers not routes.

router
  /**
   * Start a Pomodoro timer.
   */
  .get("/start", async (ctx) => {
    const response = await start(ctx)
    if ((<IPomoStartCtrl200>response).status === 200) {
      ctx.status = response.status
      ctx.body = response.data
    }
  })
  /**
   * Query Pomodoro state by id..
   */
  .get("/state", async (ctx) => {
    const response = await state(ctx)

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
  /**
   * Stop a pomodoro by id.
   */
  .get("/stop", async (ctx) => {
    const response = await stop(ctx)

    if (response.status === 200) {
      console.log("Serving 200 OK")
      // type assertion going on heeya.
      ctx.status = (<IPomoStopCtrl200>response).status
      ctx.body = (<IPomoStopCtrl200>response).data
    }

    if (response.status === 400) {
      console.log("Serving 400 BAD REQUEST")
      ctx.status = (<IPomoStopCtrl40x>response).status
      ctx.body = (<IPomoStopCtrl40x>response).data
    }

    if (response.status === 404) {
      console.log("Serving 404 NOT FOUND")
      ctx.status = (<IPomoStopCtrl40x>response).status
      ctx.body = (<IPomoStopCtrl40x>response).data
    }
  })

export const PomodoroRoutes = router
