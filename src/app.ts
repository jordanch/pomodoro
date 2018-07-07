import Koa from "koa";
// import { PomodoroRoutes, Auth } from "./routes";
import { PomodoroRoutes } from "./routes";

export const app = new Koa();

app.use(PomodoroRoutes.routes());
// app.use(Auth.routes()).use(PomodoroRoutes.routes());

app.listen(3000);
