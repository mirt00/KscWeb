import express from "express";
import multer from "multer";
import {
  createPlacement,
  getPlacements,
  getSinglePlacement,
  updatePlacement,
  deletePlacement,
} from "../controllers/placementController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// CREATE
router.post("/", upload.single("photo"), createPlacement);

// GET ALL
router.get("/", getPlacements);

// GET ONE
router.get("/:id", getSinglePlacement);

// UPDATE
router.put("/:id", upload.single("photo"), updatePlacement);

// DELETE
router.delete("/:id", deletePlacement);

export default router;
