import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import catchAsync from "../errors/catchAsync";
import AppResponse from "../helpers/AppResponse";
import AppError from "../errors/AppError";
import Task from "../models/task.model";

export const createTaskHandler = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const { name, description, budget } = req.body;
    const user = req.user as any;

    const taskExists = await Task.findOne({ name });
    if (taskExists) {
      return next(new AppError("Task with this name already exists", 400));
    }

    const task = new Task({
      name,
      description,
      budget,
      creator: user.id,
    });
    console.log(task, "This is the task");

    await task.save();

    return AppResponse(res, "Task has been created successfully.", 201, task);
  }
);


export const getAllTasksHandler = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const tasks = await Task.find()
      .populate("creator", "username email")
      .populate("assignedTo", "username email");
      console.log(tasks)

    return AppResponse(res, "Tasks fetched successfully.", 200, tasks);
  }
);


export const getTaskByIdHandler = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const { taskId } = req.params;

    const task = await Task.findById(taskId)
      .populate("creator", "username email")
      .populate("assignedTo", "username email");

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    return AppResponse(res, "Task fetched successfully.", 200, task);
  }
);


export const claimTaskHandler = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const user = req.user as any;
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log(user, "THis is the user")
    try {
      const task = await Task.findOneAndUpdate(
        {
          _id: taskId,
          assignedTo: { $exists: false },
        },
        { assignedTo: user.id },
        { new: true, session }
      )
        .populate("creator", "username email")
        .populate("assignedTo", "username email");

      if (!task) {
        const existingTask = await Task.findById(taskId);
        if (!existingTask) {
          return next(new AppError("Task does not exists", 404));
        } else if (existingTask.assignedTo) {
          return next(
            new AppError("Task has already been claimed by another user", 409)
          );
        }
      }

      await session.commitTransaction();
      session.endSession();

      return AppResponse(res, "Task claimed successfully.", 200, task);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return next(error);
    }
  }
);


export const unclaimTaskHandler = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const user = req.user as any;

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        assignedTo: user.id, 
      },
      { $unset: { assignedTo: "" } }, 
      { new: true }
    ).populate("creator", "username email");

    return AppResponse(res, "Task unclaimed successfully.", 200, task);
  }
);


export const updateTaskHandler = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const { name, description, budget } = req.body;
    const user = req.user as any;

    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    if (task.creator.toString() !== user.id) {
      return next(
        new AppError("You are not authorized to update this task", 403)
      );
    }

    if (name) task.name = name;
    if (description) task.description = description;
    if (budget !== undefined) task.budget = budget;

    await task.save();

    return AppResponse(res, "Task updated successfully.", 200, task);
  }
);


export const deleteTaskHandler = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const user = req.user as any;

    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    if (task.creator.toString() !== user.id) {
      return next(
        new AppError("You are not authorized to delete this task", 403)
      );
    }

    await Task.findByIdAndDelete(taskId);

    return AppResponse(res, "Task deleted successfully.", 200, { id: taskId });
  }
);
