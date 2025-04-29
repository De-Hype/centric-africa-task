import mongoose from "mongoose";

export default interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  username:string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date
}
