import express from "express";
import  upload  from "../middlewares/multer.js";
import {
  createResult,
  getResults,
  getSingleResult,
  updateResult,
  deleteResult
} from "../controllers/resultController.js";

const router = express.Router();

router.post("/", upload.single("image"), createResult);
router.put("/:id", upload.single("image"), updateResult);

router.get("/", getResults);
router.get("/:id", getSingleResult);
router.delete("/:id", deleteResult);

export default router;
