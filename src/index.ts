import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { Application } from "express";
import apiRoutes from "./routes/apiRoutes.ts"
import errorHandling from "./middleware/errorHandler.ts";

dotenv.config();

const app: Application = express();

const port = process.env.PORT;

//General Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", apiRoutes);

//Error handling middleware
app.use(errorHandling)
//Server running
app.listen(port, () => {
  console.log(`Server is running at http://localhsot:${port}`);
});
