import { Request, Response } from "express";
import { sendErrorResponse } from "../utils/errorHandler.js";

export const notFoundHandler = (req: Request, res: Response): void => {
  sendErrorResponse(res, 404, `Route ${req.originalUrl} not found`);
};
