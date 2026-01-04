import { Response } from "express";

export const handleResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: unknown
): void => {
  if (data) {
    res.status(statusCode).json({
      status: "success",
      message,
      data
    });
  } else {
    res.status(statusCode).json({
      status: "success",
      message
    });
  }
};