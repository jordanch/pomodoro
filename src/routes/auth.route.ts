import KoaRouter from "koa-router";

const router = new KoaRouter();

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

router.get("/", (ctx) => {
  ctx.body = info;
});

export const Auth = router;
