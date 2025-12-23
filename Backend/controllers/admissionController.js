// controllers/admissionController.js
import mongoose from "mongoose";
import AdmissionApplication from "../models/StudentAdmi.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* =====================================================
   CLOUDINARY UPLOAD HELPER
===================================================== */
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

/* =====================================================
   CREATE ADMISSION APPLICATION (STUDENT)
===================================================== */
export const createAdmission = async (req, res) => {
  try {
    const {
      studentInfo,
      contactDetails,
      academicInfo,
      streamInfo,
      guardianInfo,
    } = req.body;

    const documents = {};

    if (req.files?.seeMarksheet) {
      documents.seeMarksheet = await uploadToCloudinary(
        req.files.seeMarksheet[0].buffer,
        "admission/marksheets"
      );
    }

    if (req.files?.characterCertificate) {
      documents.characterCertificate = await uploadToCloudinary(
        req.files.characterCertificate[0].buffer,
        "admission/character"
      );
    }

    if (req.files?.birthOrCitizenship) {
      documents.birthOrCitizenship = await uploadToCloudinary(
        req.files.birthOrCitizenship[0].buffer,
        "admission/citizenship"
      );
    }

    if (req.files?.transferCertificate) {
      documents.transferCertificate = await uploadToCloudinary(
        req.files.transferCertificate[0].buffer,
        "admission/transfer"
      );
    }

    if (req.files?.passportPhotos) {
      documents.passportPhotos = await Promise.all(
        req.files.passportPhotos.map((file) =>
          uploadToCloudinary(file.buffer, "admission/passport")
        )
      );
    }

    if (!req.files?.studentSignature) {
      return res.status(400).json({
        success: false,
        message: "Student signature is required",
      });
    }

    const signatureUrl = await uploadToCloudinary(
      req.files.studentSignature[0].buffer,
      "admission/signature"
    );

    const application = await AdmissionApplication.create({
      studentInfo,
      contactDetails,
      academicInfo,
      streamInfo,
      guardianInfo,
      documents,
      declaration: { studentSignature: signatureUrl },
    });

    res.status(201).json({
      success: true,
      message: "Admission application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("CREATE ADMISSION ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit admission application",
      error: error.message,
    });
  }
};

/* =====================================================
   GET ALL APPLICATIONS (ADMIN)
===================================================== */
export const getAllAdmissions = async (req, res) => {
  try {
    const applications = await AdmissionApplication.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("GET ALL ADMISSIONS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};

/* =====================================================
   GET SINGLE APPLICATION BY ID (ADMIN)
===================================================== */
export const getAdmissionById = async (req, res) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID format",
      });
    }

    const application = await AdmissionApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("GET ADMISSION BY ID ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
      error: error.message,
    });
  }
};

/* =====================================================
   UPDATE APPLICATION STATUS (ADMIN)
===================================================== */
export const updateAdmissionStatus = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const allowedStatuses = ["Pending", "Reviewed", "Approved", "Rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const application = await AdmissionApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};

/* =====================================================
   DELETE APPLICATION (ADMIN)
===================================================== */
export const deleteAdmission = async (req, res) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await AdmissionApplication.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ADMISSION ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete application",
      error: error.message,
    });
  }
};
