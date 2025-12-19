import express from "express";
import multer from "multer";
import {
  createAdmission,
  getAllAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
  deleteAdmission,
} from "../controllers/admissionController.js";

const router = express.Router();

/* =====================================================
   MULTER CONFIG (Memory Storage for Cloudinary)
===================================================== */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* =====================================================
   ROUTES
===================================================== */

// ➤ Create Admission Application (Student)
router.post(
  "/",
  upload.fields([
    { name: "seeMarksheet", maxCount: 1 },
    { name: "characterCertificate", maxCount: 1 },
    { name: "birthOrCitizenship", maxCount: 1 },
    { name: "transferCertificate", maxCount: 1 },
    { name: "passportPhotos", maxCount: 4 },
    { name: "studentSignature", maxCount: 1 },
  ]),
  createAdmission
);

// ➤ Get All Applications (Admin)
router.get("/", getAllAdmissions);

// ➤ Get Single Application by ID (Admin)
router.get("/:id", getAdmissionById);

// ➤ Update Application Status (Admin)
router.put("/:id/status", updateAdmissionStatus);

// ➤ Delete Application (Admin)
router.delete("/:id", deleteAdmission);

export default router;
