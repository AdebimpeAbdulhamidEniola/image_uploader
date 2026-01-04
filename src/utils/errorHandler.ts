import { Response } from "express";
import { Prisma } from "@prisma/client";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string
): void => {
  res.status(statusCode).json({
    status: "fail",
    message
  });
};

export const catchPrismaError = (
  error: unknown,
  res: Response
): boolean => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    
    if (error.code === "P2002") {
      const field = (error.meta?.target as string[])?.[0] || "field";
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

export const handleUnexpectedError = (
  error: Error,
  res: Response
): void => {
  console.error("Unexpected error:", error);
  
  res.status(500).json({
    status: "error",
    message: "An unexpected error occurred"
  });
};