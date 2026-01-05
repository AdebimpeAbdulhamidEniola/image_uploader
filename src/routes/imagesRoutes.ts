import express from "express";
import { createImage, getImageByPublicId } from "../controllers/imagesController";
import upload from "../middleware/upload";


const router = express.Router({ 
  caseSensitive: true, 
  strict: false 
});

router.post("/upload", upload.single('image'), createImage);

router.get("/download/:publicId", getImageByPublicId);

export default router;
