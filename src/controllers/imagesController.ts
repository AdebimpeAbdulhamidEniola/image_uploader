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
  //decode the URI from client
  const decoded = decodeURIComponent(publicId)

  console.log("=== BACKEND CONTROLLER DEBUG (getImageByPublicId) ===");
  console.log("1. Encoded publicId from URL:", publicId);
  console.log("2. Decoded publicId:", decoded);

  try {
    console.log("3. Querying database for publicId:", decoded);
    const image = await getImageByPublicIdService(decoded);

    console.log("4. Database query result:", image);

    if (!image) {
      console.log("5. Image not found in database");
      return handleResponse(res, 404, "Image not found");
    }

    console.log("5. Image found, returning 200");
    return handleResponse(res, 200, "Image found", image);
  } catch (err) {
    console.log("6. Error during query:", err);
    next(err);
  }
};
