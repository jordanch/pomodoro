import KoaRouter from "koa-router"

const info = `

//////////////////////////////////////////////////////
/// info

/// Glossary

pt pomodoro timer

/// routes

GET / get the index page with info about api

GET /start start a pt session

GET /end stop a pt session

`;

export function root(ctx: KoaRouter.IRouterContext) {
    ctx.body = info
}