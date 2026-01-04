import { Request, Response, NextFunction } from "express";
import {
  createImageService,
  getImageByPublicIdService,
} from "../model/ImageModel.js";
import { handleResponse } from "../general/handleResponse.js";
import { catchPrismaError, handleUnexpectedError, sendErrorResponse } from "../utils/errorHandler.js";
import { Prisma } from "@prisma/client";

export const createImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return sendErrorResponse(res, 400, "No file uploaded");
    }

    const { originalname, path, mimetype, filename } = req.file;
    const newImage = await createImageService(
      path,
      originalname,
      mimetype,
      filename
    );
    handleResponse(res, 201, "Image saved successfully", newImage);
  } catch (error) {
    if (catchPrismaError(error as Prisma.PrismaClientKnownRequestError, res)) return;
    handleUnexpectedError(error as Error, res);
  }
};

export const getImageByPublicId = async (
  req: Request<{ publicId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { publicId } = req.params;
    const decoded = decodeURIComponent(publicId);
    const image = await getImageByPublicIdService(decoded);

    if (!image) {
      return sendErrorResponse(res, 404, "Image not found");
    }

    return handleResponse(res, 200, "Image found", image);
  } catch (error) {
    if (catchPrismaError(error as Prisma.PrismaClientKnownRequestError, res)) return;
    handleUnexpectedError(error as Error, res);
  }
};