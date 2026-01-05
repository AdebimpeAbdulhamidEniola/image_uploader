// src/controllers/imagesController.ts
import { Request, Response, NextFunction } from "express";
import {
  createImageService,
  getImageByPublicIdService,
} from "../model/ImageModel";
import { handleResponse } from "../general/handleResponse"
import { NoFileUploadedError, ImageNotFoundError } from "../utils/customError";

export const createImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new NoFileUploadedError();
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
    next(error);
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
      throw new ImageNotFoundError();
    }

    return handleResponse(res, 200, "Image found", image);
  } catch (error) {
    next(error);
  }
};