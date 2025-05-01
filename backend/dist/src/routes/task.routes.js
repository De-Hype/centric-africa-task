"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rateLimit_1 = __importDefault(require("../middleware/rateLimit"));
const validateZod_1 = __importDefault(require("../middleware/validateZod"));
const authValidations_1 = require("../validations/authValidations");
require("./../swagger/auth.swagger"); // Ensure the path is correct
const task_controller_1 = require("../controllers/task.controller");
const router = express_1.default.Router();
router.get("/", rateLimit_1.default, task_controller_1.fetchTaskHandler);
router.post("/", rateLimit_1.default, (0, validateZod_1.default)(authValidations_1.registerSchema), task_controller_1.createTaskHandler);
router.put("/:id", rateLimit_1.default, (0, validateZod_1.default)(authValidations_1.registerSchema), task_controller_1.editTaskHandler);
router.delete("/:id", rateLimit_1.default, (0, validateZod_1.default)(authValidations_1.registerSchema), task_controller_1.deleteTaskHandler);
router.patch("/assign/:id", rateLimit_1.default, (0, validateZod_1.default)(authValidations_1.loginSchema), task_controller_1.pickTaskHandler);
exports.default = router;
