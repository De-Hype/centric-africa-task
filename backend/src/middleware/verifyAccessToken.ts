//This middleware will verify the accessToken on every request made to the server

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import { AccessToken_Secret_Key, Refresh_Token_Secret_Key } from "../../serviceUrl";
import User from "../models/user.model";

interface CustomRequest extends Request {
  user?: any;
}

const VerifyAccessToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  if (!req.headers.authorization) {
    return next(new AppError("No authorization header provided", 401));
  }
  token = req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError("No access token provided", 401));

  jwt.verify(token,Refresh_Token_Secret_Key, async (err: any, decoded: any) => {
    if (err)
      return next(
        new AppError("Incorrect or expired token, please log in.", 401)
      );
    const user = await User.findById(decoded.payload.id).select("-password");
    if (!user)
      return next(
        new AppError("User does not exist or account has been deleted.", 404)
      );
    req.user = user;
    next();
  });
};
export default VerifyAccessToken;
