import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { Application } from "express";
import apiRoutes from "./routes/imagesRoutes.js"
import errorHandling from "./middleware/errorHandler.js";

dotenv.config();

const app: Application = express();

const port = process.env.PORT;

//General Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", apiRoutes);



//Server running
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
