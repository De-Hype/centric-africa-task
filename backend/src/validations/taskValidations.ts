import { z } from "zod";

export const createTaskSchema = z.object({
  name: z
    .string({ required_error: "Task name is required" })
    .min(8, "Task name must be at least 8 characters long"),
  description: z
    .string({ required_error: "Task description is required" })
    .min(8, "Task description must be at least 8 characters long"),
  budget: z
    .string({ required_error: "Task budget is required" })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Task budget must be a positive number.",
    })
});

export const updateTaskSchema = z.object({
  name: z
    .string()
    .min(8, "Task name must be at least 8 characters long")
    .optional(),
  description: z
    .string()
    .min(8, "Task description must be at least 8 characters long")
    .optional(),
  budget: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Task budget must be a positive number.",
    })
    .optional()
});



