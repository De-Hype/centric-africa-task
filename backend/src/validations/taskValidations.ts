import { z } from "zod";

export const createTaskSchema = z.object({
  name: z
    .string({ required_error: "Task name is required" })
    .min(8, "Task name must be atleast 8 characters long"),
  description: z
    .string({ required_error: "Task name is required" })
    .min(8, "Task name must be atleast 8 characters long"),
  budget: z
    .string({ required_error: "Task budget is required" })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Task budget must be a positive number.",
    })
});
