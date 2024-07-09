import { app } from "../../types";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { auth } from "../middleware/auth";
import { transfertoObj } from "@nishanthubuntu/paymt-common";

app.get("/balance", auth, async c => {
    const userId = c.get("userId");

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const accBalance = await prisma.account.findUnique({
            where: {
                accountId: userId
            },
            select: {
                balance: true
            }
        });

        return c.json({ response: accBalance });
    } catch (err) {
        c.status(403);
        return c.json({ response: "Unable to get the balance" });
    }
});

app.post("/transfer", auth, async c => {
    const userFromId = c.get("userId");

    const body = await c.req.json();

    const { success } = transfertoObj.safeParse(body);
    if (!success) {
        c.status(403);
        return c.json({ response: "Not a valid transfer" });
    }

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const userTo = await prisma.user.findUnique({
            where: {
                email: body.email
            },
        })

        if (!userTo) {
            throw new Error("User doesn't exist");
        }

        const userFrom = await prisma.account.findUnique({
            where: {
                accountId: userFromId
            },
            select: {
                balance: true
            }
        });

        if (userFrom !== null && userFrom.balance >= body.amount) {
            await prisma.$transaction(async (tx) => {
                await tx.account.update({
                    where: {
                        accountId: userFromId,
                    },
                    data: {
                        balance: { decrement: body.amount }
                    }
                });

                await tx.account.update({
                    where: {
                        accountId: userTo.id,
                    },
                    data: {
                        balance: { increment: body.amount }
                    }
                });
            });
        } else {
            c.status(403)
            return c.json({ response: "Insufficient balance" });
        }

        return c.json({ response: "valid transaction" });
    } catch (err) {
        c.status(403);
        return c.json({ response: "Not a valid transfer" });
    }
});

app.get("/bulk", auth, async c => {
    const filter = c.req.query("filter") || '';

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        email: {
                            contains: filter
                        }
                    },
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

export default app;
