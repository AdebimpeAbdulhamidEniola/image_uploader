import { AppError } from "../utils/errorHandler.js";
const errorHandling = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "fail",
            message: err.message,
        });
    }
    console.log(`Error is`, err.stack);
    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
};
export default errorHandling;
//# sourceMappingURL=errorHandler.js.map