import Koa from "koa";
import { PomodoroRoutes, Auth } from "./routes";
import { cache, MemoryDatabase } from "./runtime"

const storage = new MemoryDatabase(cache)
// TODO: figure out how to extend the Koa module type with storage on context
const app: any = new Koa();
// add the current persistence strategy onto app's context
// https://github.com/koajs/koa/blob/master/docs/api/index.md#appcontext
app.context.storage = storage
const PORT = 3000;

app.use(Auth.routes()).use(PomodoroRoutes.routes());
console.log(`Listening on port ${PORT}`)
app.listen(PORT)
