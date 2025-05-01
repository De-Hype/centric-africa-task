"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Task name is required" })
        .min(8, "Task name must be at least 8 characters long"),
    description: zod_1.z
        .string({ required_error: "Task description is required" })
        .min(8, "Task description must be at least 8 characters long"),
    budget: zod_1.z
        .string({ required_error: "Task budget is required" })
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val) && val > 0, {
        message: "Task budget must be a positive number.",
    })
});
exports.updateTaskSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(8, "Task name must be at least 8 characters long")
        .optional(),
    description: zod_1.z
        .string()
        .min(8, "Task description must be at least 8 characters long")
        .optional(),
    budget: zod_1.z
        .string()
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val) && val > 0, {
        message: "Task budget must be a positive number.",
    })
        .optional()
});
