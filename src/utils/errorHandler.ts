// src/utils/errorHandler.ts
import { Response } from "express";
import { Prisma } from "@prisma/client";
import multer from "multer";
import { AppError } from "./customError.js";

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string
): void => {
  res.status(statusCode).json({
    status: "fail",
    message,
  });
};



export const handleMulterError = (error: unknown, res: Response): boolean => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      sendErrorResponse(res, 400, "File size is too large. Maximum size is 5MB");
      return true;
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      sendErrorResponse(res, 400, "Invalid field name. Only 'image' field is allowed");
      return true;
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      sendErrorResponse(res, 400, "Too many files uploaded");
      return true;
    }

    sendErrorResponse(res, 400, `Upload error: ${error.message}`);
    return true;
  }

  if (error instanceof Error && error.message === "Only images are allowed") {
    sendErrorResponse(res, 400, error.message);
    return true;
  }

  if (error instanceof Error && error.message === "Only 'image' field is allowed") {
    sendErrorResponse(res, 400, error.message);
    return true;
  }

  return false;
};

export const catchPrismaError = (error: unknown, res: Response): boolean => {
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

export const handleUnexpectedError = (error: unknown, res: Response): void => {
  console.error("Unexpected error:", error);

  res.status(500).json({
    status: "error",
    message: "An unexpected error occurred",
  });
};

// Handle custom AppError instances
export const handleAppError = (error: unknown, res: Response): boolean => {
  if (error instanceof AppError) {
    sendErrorResponse(res, error.statusCode, error.message);
    return true;
  }
  
  return false;
};

export const handleAllErrors = (error: unknown, res: Response): void => {
  // Try custom AppError first
  if (handleAppError(error, res)) return;

  

  // Try Multer errors
  if (handleMulterError(error, res)) return;

  // Try Prisma errors
  if (catchPrismaError(error, res)) return;

  // Fallback to unexpected error
  handleUnexpectedError(error, res);
};