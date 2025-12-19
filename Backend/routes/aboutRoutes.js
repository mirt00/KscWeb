import express from "express";
import {
  createAbout,
  getAbout,
  updateAbout,
  addWhyChooseUs,
  removeWhyChooseUs,
  addExtraSection,
  removeExtraSection,
} from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAbout);

router.post("/", createAbout);
router.put("/:id", updateAbout);
router.post("/why-choose-us", addWhyChooseUs);
router.delete("/why-choose-us/:id", removeWhyChooseUs);
router.post("/extra-section", addExtraSection);
router.delete("/extra-section/:id", removeExtraSection);

export default router;
