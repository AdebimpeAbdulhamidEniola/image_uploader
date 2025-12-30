//Centralize error handler

import { Request, Response, NextFunction } from "express";

const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Error is`, err.stack);
  res.status(500).json({
    status: 500,
    message: "Oops! Something went wrong",
    error: err.message,
  });
};

export default errorHandling;
