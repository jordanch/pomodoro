import KoaRouter from "koa-router";
import { root } from "../controllers"

const router = new KoaRouter();

router.get("/", root);

export const Root = router;
