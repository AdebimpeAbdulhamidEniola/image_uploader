import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

//configure storage
const storage = multer.memoryStorage(); //keeps file in RAM

//setup filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images are allowed"));
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
  fileFilter: fileFilter,
});

export default upload;
