"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Task name is required" })
        .min(8, "Task name must be atleast 8 characters long"),
    description: zod_1.z
        .string({ required_error: "Task name is required" })
        .min(8, "Task name must be atleast 8 characters long"),
    budget: zod_1.z
        .string({ required_error: "Task budget is required" })
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val) && val > 0, {
        message: "Task budget must be a positive number.",
    })
});
