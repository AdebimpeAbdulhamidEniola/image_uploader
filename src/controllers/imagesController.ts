import { Request,Response,NextFunction} from "express";
import { createImageService } from "../model/ImageModel.js";
import { handleResponse } from "../general/handleResponse.js";



export const createImage  = async(req:Request, res:Response, next:NextFunction) => {
  const {originalname, path, mimetype} =req.file
  try {
    const newImage = await createImageService(path,originalname, mimetype)
    handleResponse(res, 201, "Image saved successfully", newImage)
  
  }
  catch(err ) {
    if (err instanceof Error) {
      next(err);
    }
    console.log(`Unknown error`, err)
  }
}