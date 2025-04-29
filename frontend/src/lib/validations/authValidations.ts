//All validation for auth to be done here
import { z } from "zod";
export const registerSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be atleast 6 characters long"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be atleast 8 characters long"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be atleast 8 characters long"),
});
