import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { app } from "../../types";
import { sign } from "hono/jwt";
import { auth } from "../middleware/auth";
import { signinObj, signupObj } from "@nishanthubuntu/paymt-common";

app.post('/signup', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signupObj.safeParse(body);

    if (!success) {
        c.status(403);
        c.json({ response: "Invalid Input" });
    }

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                firstname: body.firstname,
                lastname: body.lastname,
                password: body.password
            }
        });

        await prisma.account.create({
            data: {
                accountId: user.id,
                balance: 10000
            }
        });

        const token = await sign(user, c.env.JWT_SECRET);

        return c.json({ token });
    } catch (err) {
        c.status(403)
        c.json({ response: "Error creating the user" });
    }

});

app.post('/signin', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinObj.safeParse(body);

    if (!success) {
        c.status(403);
        c.json({ response: "Invalid Input" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });

        if (!user) {
            c.status(403)
            return c.json({ response: "User not found" });
        }

        const token = await sign(user, c.env.JWT_SECRET);

        return c.json({ token });
    } catch (err) {
        c.status(403)
        return c.json({ response: "Error signing in the user" });
    }

});

app.get("/bulk", auth, async c => {
    const filter = c.req.query("filter") || '';
    const currUser = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const users = await prisma.user.findMany({
            where: {
                AND: [
                    {
                        email: {
                            contains: filter
                        }
                    },
                    {
                        NOT: {
                            id: {
                                contains: currUser
                            }
                        }
                    }
                ]
            },
            orderBy: {
                firstname: "desc"
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
            }
        });

        c.status(200);
        return c.json({
            user: users.map(user => ({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname
            }))
        });
    } catch (err) {
        c.status(403)
        return c.json({ response: "Not able to fetch users" });
    }

});

app.delete('/remove', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        await prisma.account.deleteMany({});
        await prisma.user.deleteMany({});
        c.json({ response: "deleted all the data" });
    } catch (err) {
        c.status(401);
        c.json({ response: "Not authorized" });
    }
});

export default app;
