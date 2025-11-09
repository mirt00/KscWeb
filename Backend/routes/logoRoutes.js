import express from "express";
import { uploadLogo, getActiveLogo, deleteLogo } from "../controllers/logoController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/upload", upload.single("logo"), uploadLogo);
router.get("/active", getActiveLogo);
router.delete("/:id", deleteLogo);

export default router;
