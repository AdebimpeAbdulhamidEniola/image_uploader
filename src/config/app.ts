import { Application } from "express";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import apiRoutes from "../routes/imagesRoutes.js";
import errorHandling from "../middleware/errorHandler.js";
import { notFoundHandler } from "../general/notFoundHandler.js";

dotenv.config();

export const createApp = (): Application => {
  const app: Application = express();

  //General Middlewares
  app.use(express.json());
  app.use(cors());
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  //Routes
  app.use("/api", apiRoutes);

  //404 Not Found Handler
  app.use(notFoundHandler);

  //Error Handling Middleware
  app.use(errorHandling);

  return app;
};
