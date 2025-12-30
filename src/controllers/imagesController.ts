import { Request, Response, NextFunction } from "express";
import {
  createImageService,
  getImageByPublicIdService,
} from "../model/ImageModel.js";
import { handleResponse } from "../general/handleResponse.js";

export const createImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("File is", req.file);
  const { originalname, path, mimetype, filename } = req.file;
  try {
    const newImage = await createImageService(
      path,
      originalname,
      mimetype,
      filename
    );
    handleResponse(res, 201, "Image saved successfully", newImage);
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
    console.log(`Unknown error`, err);
  }
};

export const getImageByPublicId = async (
  req: Request<{ publicId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { publicId } = req.params;


  try {
    const image = await getImageByPublicIdService(publicId);

    if (!image) {
      return handleResponse(res, 404, "Image not found");
    }

    return handleResponse(res, 200, "Image found", image);
  } catch (err) {
    next(err);
  }
};
