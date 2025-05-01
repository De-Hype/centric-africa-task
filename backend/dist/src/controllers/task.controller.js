"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskHandler = exports.updateTaskHandler = exports.unclaimTaskHandler = exports.claimTaskHandler = exports.getTaskByIdHandler = exports.getAllTasksHandler = exports.createTaskHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = __importDefault(require("../errors/catchAsync"));
const AppResponse_1 = __importDefault(require("../helpers/AppResponse"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const task_model_1 = __importDefault(require("../models/task.model"));
exports.createTaskHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, budget } = req.body;
    const user = req.user;
    const taskExists = yield task_model_1.default.findOne({ name });
    if (taskExists) {
        return next(new AppError_1.default("Task with this name already exists", 400));
    }
    const task = new task_model_1.default({
        name,
        description,
        budget,
        creator: user.id,
    });
    yield task.save();
    return (0, AppResponse_1.default)(res, "Task has been created successfully.", 201, task);
}));
exports.getAllTasksHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_model_1.default.find()
        .populate("creator", "username email")
        .populate("assignedTo", "username email");
    return (0, AppResponse_1.default)(res, "Tasks fetched successfully.", 200, tasks);
}));
exports.getTaskByIdHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const task = yield task_model_1.default.findById(taskId)
        .populate("creator", "username email")
        .populate("assignedTo", "username email");
    if (!task) {
        return next(new AppError_1.default("Task not found", 404));
    }
    return (0, AppResponse_1.default)(res, "Task fetched successfully.", 200, task);
}));
exports.claimTaskHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const user = req.user;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const task = yield task_model_1.default.findOneAndUpdate({
            _id: taskId,
            assignedTo: { $exists: false },
        }, { assignedTo: user.id }, { new: true, session })
            .populate("creator", "username email")
            .populate("assignedTo", "username email");
        if (!task) {
            const existingTask = yield task_model_1.default.findById(taskId);
            if (!existingTask) {
                return next(new AppError_1.default("Task does not exists", 404));
            }
            else if (existingTask.assignedTo) {
                return next(new AppError_1.default("Task has already been claimed by another user", 409));
            }
        }
        yield session.commitTransaction();
        session.endSession();
        return (0, AppResponse_1.default)(res, "Task claimed successfully.", 200, task);
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        return next(error);
    }
}));
exports.unclaimTaskHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const user = req.user;
    const task = yield task_model_1.default.findOneAndUpdate({
        _id: taskId,
        assignedTo: user.id,
    }, { $unset: { assignedTo: "" } }, { new: true }).populate("creator", "username email");
    return (0, AppResponse_1.default)(res, "Task unclaimed successfully.", 200, task);
}));
exports.updateTaskHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { name, description, budget } = req.body;
    const user = req.user;
    const task = yield task_model_1.default.findOne({ _id: taskId });
    if (!task) {
        return next(new AppError_1.default("Task not found", 404));
    }
    if (task.creator.toString() !== user.id) {
        return next(new AppError_1.default("You are not authorized to update this task", 403));
    }
    if (name)
        task.name = name;
    if (description)
        task.description = description;
    if (budget !== undefined)
        task.budget = budget;
    yield task.save();
    return (0, AppResponse_1.default)(res, "Task updated successfully.", 200, task);
}));
exports.deleteTaskHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const user = req.user;
    const task = yield task_model_1.default.findOne({ _id: taskId });
    if (!task) {
        return next(new AppError_1.default("Task not found", 404));
    }
    if (task.creator.toString() !== user.id) {
        return next(new AppError_1.default("You are not authorized to delete this task", 403));
    }
    yield task_model_1.default.findByIdAndDelete(taskId);
    return (0, AppResponse_1.default)(res, "Task deleted successfully.", 200, { id: taskId });
}));
