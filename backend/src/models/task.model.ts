import mongoose, { Schema } from "mongoose";
import ITask from "../interfaces/ITask";

const TaskSchema: Schema<ITask> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    budget: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
