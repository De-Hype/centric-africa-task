"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const serviceUrl_1 = require("../../serviceUrl");
const port = serviceUrl_1.PORT || 8080;
// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Task API Documentation",
            version: "1.0.0",
            description: "API documentation for Task application",
        },
        servers: [
            {
                url: `http://localhost:${port}/v1/api`, // Adjust the port if necessary
            },
            {
                url: "https://centric-africa-task.onrender.com/v1/api", // Production server URL
            },
        ],
    },
    apis: ["./src/swagger/*.ts"] // Adjust the path to match your route files
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
const swaggerRouter = express_1.default.Router();
swaggerRouter.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
exports.default = swaggerRouter;
