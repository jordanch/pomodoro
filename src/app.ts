import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { PomodoroRoutes, Root } from "./routes"
// import { MemoryStorage, PostgresStorage } from "./runtime"
import { PostgresStorage } from "./runtime"
import debugUtil from "debug"

const debug = debugUtil("pomodoro:app")

const PORT = 3000

// const storage = new MemoryStorage()
const storage = new PostgresStorage()
// TODO: figure out how to extend the Koa module type with storage on context
// remove any type for app
const app = new Koa()

app.use(bodyParser())

// add the current persistence strategy onto app's context
// https://github.com/koajs/koa/blob/master/docs/api/index.md#appcontext
// @ts-ignore
app.context.storage = storage

app.use(Root.routes()).use(PomodoroRoutes.routes())

debug(`Listening on port ${PORT}`)

app.listen(PORT)
