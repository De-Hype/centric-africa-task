"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
//All validation for auth to be done here
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
    username: zod_1.z
        .string({ required_error: "Username is required" })
        .min(3, "Username must be atleast 6 characters long"),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be atleast 8 characters long"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be atleast 8 characters long"),
});
