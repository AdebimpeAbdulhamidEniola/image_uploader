import express from "express";

const router = express.Router();

router.get("/download/:filename");
router.post("/upload");

export default router;
