import express from "express";
import uploadFile from "../controllers/uploadController.js";
import upload from "../middleware/upload.js";
const router = express.Router();
// router.get("/download/:filename");
router.post("/upload", upload.single('image'), uploadFile);
export default router;
//# sourceMappingURL=apiRoutes.js.map