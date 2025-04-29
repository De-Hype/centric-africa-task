import express from "express";
import Limiter from "../middleware/rateLimit";
import validate from "../middleware/validateZod";
import { loginSchema, registerSchema } from "../validations/authValidations";

import "./../swagger/auth.swagger"; // Ensure the path is correct
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  fetchTaskHandler,
  pickTaskHandler,
} from "../controllers/task.controller";

const router = express.Router();
router.get("/", Limiter,  fetchTaskHandler);
router.post("/", Limiter, validate(registerSchema), createTaskHandler);
router.put("/:id", Limiter, validate(registerSchema), editTaskHandler);
router.delete("/:id", Limiter, validate(registerSchema), deleteTaskHandler);
router.patch("/assign/:id", Limiter, validate(loginSchema), pickTaskHandler);

export default router;
