import { createImageService, getImageByFilenameService } from "../model/ImageModel.js";
import { handleResponse } from "../general/handleResponse.js";
export const createImage = async (req, res, next) => {
    const { originalname, path, mimetype } = req.file;
    try {
        const newImage = await createImageService(path, originalname, mimetype);
        handleResponse(res, 201, "Image saved successfully", newImage);
    }
    catch (err) {
        if (err instanceof Error) {
            next(err);
        }
        console.log(`Unknown error`, err);
    }
};
export const getImageByFilename = async (req, res, next) => {
    const { filename } = req.params;
    try {
        const image = await getImageByFilenameService(filename);
        return image.filename;
    }
    catch (err) {
        if (err instanceof Error) {
            next(err);
        }
        else {
            console.log("Error unidentified", err);
        }
    }
};
//# sourceMappingURL=imagesController.js.map