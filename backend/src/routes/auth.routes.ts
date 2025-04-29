import express from "express";
import Limiter from "../middleware/rateLimit";
import validate from "../middleware/validateZod";
import { loginSchema, registerSchema } from "../validations/authValidations";
import { fetchUserHandler, loginHandler, registerHandler } from "../controllers/auth.controller";

// Import the Swagger documentation
import "./../swagger/auth.swagger";// Ensure the path is correct
import VerifyAccessToken from "../middleware/verifyAccessToken";

const router = express.Router();

router.post("/register", Limiter, validate(registerSchema), registerHandler);
router.patch("/sign-in", Limiter, validate(loginSchema), loginHandler);
router.get("/my-account", VerifyAccessToken, fetchUserHandler)

export default router;
