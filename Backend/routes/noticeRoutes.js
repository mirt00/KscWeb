import express from "express";
import multer from "multer";
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

// Multer memory storage (direct upload to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get("/", getNotices);                        // Get all notices
router.post("/", upload.single("file"), createNotice);  // Create notice
router.put("/:id", upload.single("file"), updateNotice); // Update notice
router.delete("/:id", deleteNotice);               // Delete notice

export default router;
