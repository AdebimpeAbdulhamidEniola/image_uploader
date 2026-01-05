import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
//configure storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "image_uploader",
        use_filename: true,
        unique_filename: true,
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    },
});
//setup filter
const fileFilter = (req, file, cb) => {
    // Check if field name is "image"
    if (file.fieldname !== "image") {
        return cb(new Error("Only 'image' field is allowed"));
    }
    // Check if file is an image
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Only images are allowed"));
    }
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