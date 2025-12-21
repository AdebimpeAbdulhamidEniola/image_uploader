import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/imagesRoutes.js";
import errorHandling from "./middleware/errorHandler.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
//General Middlewares
app.use(express.json());
app.use(cors());
//Routes
app.use("/api", apiRoutes);
//Error handling middleware
app.use(errorHandling);
//Server running
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map