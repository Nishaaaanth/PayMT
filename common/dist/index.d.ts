import { z } from "zod";
export declare const signupObj: z.ZodObject<{
    email: z.ZodString;
    firstname: z.ZodString;
    lastname: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}, {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}>;
export declare const signinObj: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const transfertoObj: z.ZodObject<{
    email: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    email: string;
    amount: number;
}, {
    email: string;
    amount: number;
}>;
export type Signup = z.infer<typeof signupObj>;
export type Signin = z.infer<typeof signinObj>;
export type TransferTo = z.infer<typeof transfertoObj>;
