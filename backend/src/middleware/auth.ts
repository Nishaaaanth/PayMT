import { createMiddleware } from "hono/factory";
import { JWTPayload } from "hono/utils/jwt/types";
import { verify } from "hono/jwt";

export const auth = createMiddleware(async function(c, next) {
    const token: string = c.req.header("authorization") || "";

    const user: JWTPayload = await verify(token, c.env.JWT_SECRET);

    if (!user.id) {
        c.status(401);
        return c.json({ response: "Not authorized" });
    }

    c.set("userId", user.id);

    await next();
});
