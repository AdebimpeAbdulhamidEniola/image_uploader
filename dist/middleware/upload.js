import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
//configure storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'image_uploader',
        use_filename: true,
        unique_filename: true,
    }
});
//setup filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/"))
        cb(null, true);
    else
        cb(new Error("Only images are allowed"));
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    },
    fileFilter: fileFilter,
});
export default upload;
//# sourceMappingURL=upload.js.map