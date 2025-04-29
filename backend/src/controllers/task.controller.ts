import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import catchAsync from "../errors/catchAsync";
import AppResponse from "../helpers/AppResponse";

import AppError from "../errors/AppError";
import User from "../models/user.model";
import {
  GenerateAccessToken,
  GenerateRefreshToken,
} from "../helpers/GenerateToken";
export const createTaskHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const editTaskHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteTaskHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const fetchTaskHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const pickTaskHandler = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
