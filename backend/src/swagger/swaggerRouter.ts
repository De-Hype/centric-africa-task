import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
import { PORT } from "../../serviceUrl";
const port = PORT || 8080;

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

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerRouter = express.Router();
swaggerRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default swaggerRouter;
