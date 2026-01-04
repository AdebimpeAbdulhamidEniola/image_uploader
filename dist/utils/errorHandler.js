import { Prisma } from "@prisma/client";
export class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}
export const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: "fail",
        message
    });
};
export const catchPrismaError = (error, res) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            const field = error.meta?.target?.[0] || "field";
            sendErrorResponse(res, 409, `A record with this ${field} already exists`);
            return true;
        }
        if (error.code === "P2025") {
            sendErrorResponse(res, 404, "Record not found");
            return true;
        }
        sendErrorResponse(res, 400, `Database error: ${error.message}`);
        return true;
    }
    return false;
};
export const handleUnexpectedError = (error, res) => {
    console.error("Unexpected error:", error);
    res.status(500).json({
        status: "error",
        message: "An unexpected error occurred"
    });
};
//# sourceMappingURL=errorHandler.js.map