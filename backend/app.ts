import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";




// Import your existing configurations and middleware
import ConnectDB from "./src/config/db.config";
import authRoutes from "./src/routes/auth.routes";
import  taskRoutes from "./src/routes/task.routes"
import logger, { logRequest } from "./src/middleware/logger";
import { COOKIE_SECRET, PORT } from "./serviceUrl";
import AppError from "./src/errors/AppError";
import GlobalErrorHandler from "./src/errors/errorHandler";
import swaggerRouter from "./src/swagger/swaggerRouter";

dotenv.config();

const port = PORT || 8080;
const app = express();

// Middleware
process.on("uncaughtException", (err: Error) => {
  logger.error("Unhandled Exception, shutting down...");
  logger.error(`${err.name}: ${err.message}`);
  process.exit(1);
});

app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin:["http://localhost:5173", "https://centric-africa-task.vercel.app/"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);
app.options("*", cors()); 

app.use(cookieParser(COOKIE_SECRET));
app.use(helmet());
app.use(logRequest);

// Use Swagger documentation
app.use(swaggerRouter);

// All Routes come in Here
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/tasks", taskRoutes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hi");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const errorMessage = `Cannot find ${req.originalUrl} with ${req.method} on this server`;
  logger.warn(errorMessage);
  next(new AppError(errorMessage, 501));
});
app.use(GlobalErrorHandler);

// Database connection and server startup
const server = ConnectDB().then(() => {
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
    logger.info(`API Docs available at http://localhost:${port}/api-docs`);
  });
});

process.on("unhandledRejection", (err: Error) => {
  logger.error("Unhandled Rejection, shutting down server...");
  logger.error(`${err.name}: ${err.message}`);
  server.catch(() => {
    process.exit(1);
  });
});
