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

export const registerHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError("User already exists", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      username,
      password: hashedPassword,
    });

    await user.save();

    const account = {
      id: user._id,
      email: email,
    };
    return AppResponse(
      res,
      "Your account has been created successfully.",
      201,
      account
    );
  }
);

export const loginHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return next(new AppError("User does not exist", 404));
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) return next(new AppError("Invalid credentials", 401));
    const account = {
      id: userExists._id,
      email: email,
    };
    const accessToken: string | undefined = GenerateAccessToken(account);
    const refreshToken: string | undefined = GenerateRefreshToken(account);
    return AppResponse(res, "User log in successful.", 200, {
      accessToken: accessToken,
      refreshToken: refreshToken,
      account,
    });
  }
);

export const fetchUserHandler = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const user = req.user as any;
    return AppResponse(res, "User found successfully.", 200, user);
  }
);
