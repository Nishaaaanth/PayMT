import {z} from "zod";

export const signupObj = z.object({
    email: z.string().email(),
    firstname: z.string().min(3),
    lastname: z.string(),
    password: z.string().min(8).max(20),
});

export const signinObj = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20)
})

export const transfertoObj = z.object({
    email: z.string().email(),
    amount: z.number().gt(100)
});

export type Signup = z.infer<typeof signupObj>;
export type Signin = z.infer<typeof signinObj>;
export type TransferTo = z.infer<typeof transfertoObj>;
