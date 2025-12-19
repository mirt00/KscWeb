import express from "express";
import upload from "../middlewares/logoMulter.js";
import { uploadLogo, getActiveLogo, deleteLogo } from "../controllers/logoController.js";

const router = express.Router();

// Upload a new logo
router.post("/upload", upload.single("logo"), uploadLogo);

// Get the active logo
router.get("/active", getActiveLogo);

// Delete a logo by ID
router.delete("/:id", deleteLogo);

export default router;
