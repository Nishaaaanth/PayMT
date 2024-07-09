import userRouter from "./user";
import accountRouter from "./account";
import { Hono } from "hono";

const app = new Hono();

app.route('/user', userRouter)
app.route('/account', accountRouter)

export default app;
