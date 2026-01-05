import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "../routes/imagesRoutes.js";
import errorHandling from "../middleware/errorHandler.js";
import { notFoundHandler } from "../general/notFoundHandler.js";
dotenv.config();
export const createApp = () => {
    const app = express();
    //General Middlewares
    app.use(express.json());
    app.use(cors());
    //Routes
    app.use("/api", apiRoutes);
    //404 Not Found Handler
    app.use(notFoundHandler);
    //Error Handling Middleware
    app.use(errorHandling);
    return app;
};
//# sourceMappingURL=app.js.map