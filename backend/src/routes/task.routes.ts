import express from "express";
import Limiter from "../middleware/rateLimit";
import validate from "../middleware/validateZod";

import "./../swagger/task.swagger"; 
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

router.post("/",  validate(createTaskSchema), VerifyAccessToken, createTaskHandler);
router.get("/",  VerifyAccessToken, getAllTasksHandler);
router.get("/:taskId",  VerifyAccessToken, getTaskByIdHandler);
router.patch("/:taskId/claim", Limiter, VerifyAccessToken, claimTaskHandler);
router.patch("/:taskId/unclaim", Limiter, VerifyAccessToken, unclaimTaskHandler);
router.put("/:taskId", Limiter,validate(updateTaskSchema), VerifyAccessToken, updateTaskHandler);
router.delete("/:taskId", Limiter, VerifyAccessToken, deleteTaskHandler);

export default router;
