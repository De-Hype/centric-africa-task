import mongoose from "mongoose";

export default interface ITask {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  budget: number;
  creator: mongoose.Schema.Types.ObjectId;
  assignedTo: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date
}
