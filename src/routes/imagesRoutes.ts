import express from "express";
import { createImage, getImageByPublicId } from "../controllers/imagesController.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.post("/upload", upload.single('image'), createImage);

router.get("/download/:publicId", getImageByPublicId);

export default router;
