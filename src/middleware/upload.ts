
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

//configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "image_uploader",
    use_filename: true,
    unique_filename: true,
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
  } as any,
});

//setup filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  // Check if field name is "image"
  if (file.fieldname !== "image") {
    return cb(new Error("Only 'image' field is allowed"));
  }

  // Check if file is an image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
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