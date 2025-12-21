import express from "express";
import  { createImage } from "../controllers/imagesController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/upload", upload.single('image') , createImage);

export default router;
