import express from "express";
import  { createImage, getImageByFilename } from "../controllers/imagesController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/upload", upload.single('image') , createImage);
router.get("/api/download/:filename", getImageByFilename)

export default router;
