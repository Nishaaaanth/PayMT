"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfertoObj = exports.signinObj = exports.signupObj = void 0;
const zod_1 = require("zod");
exports.signupObj = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstname: zod_1.z.string().min(3),
    lastname: zod_1.z.string(),
    password: zod_1.z.string().min(8).max(20),
});
exports.signinObj = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(20)
});
exports.transfertoObj = zod_1.z.object({
    email: zod_1.z.string().email(),
    amount: zod_1.z.number().gt(100)
});
