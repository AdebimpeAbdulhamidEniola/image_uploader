import { createImageService, getImageByPublicIdService, } from "../model/ImageModel.js";
import { handleResponse } from "../general/handleResponse.js";
import { catchPrismaError, handleUnexpectedError } from "../utils/errorHandler.js";
export const createImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return handleResponse(res, 400, "No file uploaded");
        }
        const { originalname, path, mimetype, filename } = req.file;
        const newImage = await createImageService(path, originalname, mimetype, filename);
        handleResponse(res, 201, "Image saved successfully", newImage);
    }
    catch (error) {
        if (catchPrismaError(error, res))
            return;
        handleUnexpectedError(error, res);
    }
};
export const getImageByPublicId = async (req, res, next) => {
    try {
        const { publicId } = req.params;
        const decoded = decodeURIComponent(publicId);
        const image = await getImageByPublicIdService(decoded);
        if (!image) {
            return handleResponse(res, 404, "Image not found");
        }
        return handleResponse(res, 200, "Image found", image);
    }
    catch (error) {
        if (catchPrismaError(error, res))
            return;
        handleUnexpectedError(error, res);
    }
};
//# sourceMappingURL=imagesController.js.map