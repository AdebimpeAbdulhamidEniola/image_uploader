import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import apiRoutes from "./routes/imagesRoutes.js";
import errorHandling from "./middleware/errorHandler.js";
import { notFoundHandler } from "./general/notFoundHandler.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
//General Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
//Routes
app.use("/api", apiRoutes);
//404 Not Found Handler
app.use(notFoundHandler);
//Error Handling Middleware
app.use(errorHandling);
//Server running
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map