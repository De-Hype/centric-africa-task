"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rateLimit_1 = __importDefault(require("../middleware/rateLimit"));
const validateZod_1 = __importDefault(require("../middleware/validateZod"));
const authValidations_1 = require("../validations/authValidations");
const auth_controller_1 = require("../controllers/auth.controller");
// Import the Swagger documentation
require("./../swagger/auth.swagger"); // Ensure the path is correct
const verifyAccessToken_1 = __importDefault(require("../middleware/verifyAccessToken"));
const router = express_1.default.Router();
router.post("/register", rateLimit_1.default, (0, validateZod_1.default)(authValidations_1.registerSchema), auth_controller_1.registerHandler);
router.patch("/sign-in", rateLimit_1.default, (0, validateZod_1.default)(authValidations_1.loginSchema), auth_controller_1.loginHandler);
router.get("/my-account", verifyAccessToken_1.default, auth_controller_1.fetchUserHandler);
exports.default = router;
