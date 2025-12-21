import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "image_uploader",
    },
});
//# sourceMappingURL=cloudinaryService.js.map