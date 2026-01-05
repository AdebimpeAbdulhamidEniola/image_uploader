import { Request, Response, NextFunction } from "express";
import { handleAllErrors } from "../utils/errorHandler";

const errorHandling = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // If response already sent, delegate to Express default handler
  if (res.headersSent) {
    return next(err);
  }

  // Handle all types of errors using the utility function
  handleAllErrors(err, res);
};

export default errorHandling;