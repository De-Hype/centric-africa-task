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
exports.fetchUserHandler = exports.loginHandler = exports.registerHandler = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const catchAsync_1 = __importDefault(require("../errors/catchAsync"));
const AppResponse_1 = __importDefault(require("../helpers/AppResponse"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = __importDefault(require("../models/user.model"));
const GenerateToken_1 = require("../helpers/GenerateToken");
exports.registerHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const userExists = yield user_model_1.default.findOne({ email });
    if (userExists) {
        return next(new AppError_1.default("User already exists", 400));
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = new user_model_1.default({
        email,
        username,
        password: hashedPassword,
    });
    yield user.save();
    const account = {
        id: user._id,
        email: email,
    };
    return (0, AppResponse_1.default)(res, "Your account has been created successfully.", 201, account);
}));
exports.loginHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userExists = yield user_model_1.default.findOne({ email });
    if (!userExists) {
        return next(new AppError_1.default("User does not exist", 404));
    }
    const isMatch = yield bcryptjs_1.default.compare(password, userExists.password);
    if (!isMatch)
        return next(new AppError_1.default("Invalid credentials", 401));
    const account = {
        id: userExists._id,
        email: email,
    };
    const accessToken = (0, GenerateToken_1.GenerateAccessToken)(account);
    const refreshToken = (0, GenerateToken_1.GenerateRefreshToken)(account);
    return (0, AppResponse_1.default)(res, "User log in successful.", 200, {
        accessToken: accessToken,
        refreshToken: refreshToken,
        account,
    });
}));
exports.fetchUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    return (0, AppResponse_1.default)(res, "User found successfully.", 200, user);
}));
