import express from "express";
import Limiter from "../middleware/rateLimit";
import validate from "../middleware/validateZod";

import "./../swagger/auth.swagger"; 
import {
  claimTaskHandler,
  createTaskHandler,
  deleteTaskHandler,
  getAllTasksHandler,
  getTaskByIdHandler,
  unclaimTaskHandler,
  updateTaskHandler,
} from "../controllers/task.controller";
import VerifyAccessToken from "../middleware/verifyAccessToken";
import { createTaskSchema, updateTaskSchema } from "../validations/taskValidations";

const router = express.Router();

router.post("/", Limiter, validate(createTaskSchema), VerifyAccessToken, createTaskHandler);
router.get("/", Limiter, VerifyAccessToken, getAllTasksHandler);
router.get("/:taskId", Limiter, VerifyAccessToken, getTaskByIdHandler);
router.patch("/:taskId/claim", Limiter, VerifyAccessToken, claimTaskHandler);
router.patch("/:taskId/unclaim", Limiter, VerifyAccessToken, unclaimTaskHandler);
router.put("/:taskId", Limiter,validate(updateTaskSchema), VerifyAccessToken, updateTaskHandler);
router.delete("/:taskId", Limiter, VerifyAccessToken, deleteTaskHandler);

export default router;
