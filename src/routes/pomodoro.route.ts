import KoaRouter from "koa-router"
import { start, state, stop } from "../controllers"

const router = new KoaRouter()

router
  .get("/start", start)
  .get("/state", state)
  .get("/stop", stop)

export const PomodoroRoutes = router
