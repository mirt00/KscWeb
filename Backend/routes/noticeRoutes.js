import express from "express";
import upload from "../middlewares/multer.js";
import {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

router.get("/", getNotices);             // All notices
router.get("/:id", getNoticeById);       // Single notice
router.post("/", upload.single("file"), createNotice);
router.put("/:id", upload.single("file"), updateNotice);
router.delete("/:id", deleteNotice);

export default router;
