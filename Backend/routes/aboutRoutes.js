import express from "express";
import upload from "../middlewares/multer.js"
import {
  createAbout,
  updateAbout,
  getAbout,
} from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAbout);

router.post(
  "/",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "chairmanPhoto", maxCount: 1 },
    { name: "campusChiefPhoto", maxCount: 1 },
  ]),
  createAbout
);

router.put(
  "/",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "chairmanPhoto", maxCount: 1 },
    { name: "campusChiefPhoto", maxCount: 1 },
  ]),
  updateAbout
);
export default router;