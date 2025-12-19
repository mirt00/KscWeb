import AdmissionApplication from "../models/AdmissionApplication.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


export const createAdmission = async (req, res) => {
  try {
    const {
      studentInfo,
      contactDetails,
      academicInfo,
      streamInfo,
      guardianInfo,
    } = req.body;

    // Upload files if present
    const documents = {};
    if (req.files?.seeMarksheet)
      documents.seeMarksheet = await uploadToCloudinary(
        req.files.seeMarksheet[0].buffer,
        "admission/marksheets"
      );

    if (req.files?.characterCertificate)
      documents.characterCertificate = await uploadToCloudinary(
        req.files.characterCertificate[0].buffer,
        "admission/character"
      );

    if (req.files?.birthOrCitizenship)
      documents.birthOrCitizenship = await uploadToCloudinary(
        req.files.birthOrCitizenship[0].buffer,
        "admission/citizenship"
      );

    if (req.files?.transferCertificate)
      documents.transferCertificate = await uploadToCloudinary(
        req.files.transferCertificate[0].buffer,
        "admission/transfer"
      );

    if (req.files?.passportPhotos) {
      documents.passportPhotos = await Promise.all(
        req.files.passportPhotos.map((file) =>
          uploadToCloudinary(file.buffer, "admission/passport")
        )
      );
    }

    // Student Signature (required)
    let signatureUrl = null;
    if (req.files?.studentSignature) {
      signatureUrl = await uploadToCloudinary(
        req.files.studentSignature[0].buffer,
        "admission/signature"
      );
    }

    if (!signatureUrl) {
      return res.status(400).json({
        success: false,
        message: "Student signature is required",
      });
    }

    const application = await AdmissionApplication.create({
      studentInfo,
      contactDetails,
      academicInfo,
      streamInfo,
      guardianInfo,
      documents,
      declaration: {
        studentSignature: signatureUrl,
      },
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
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

/* =====================================================
   GET SINGLE APPLICATION
===================================================== */
export const getAdmissionById = async (req, res) => {
  try {
    const application = await AdmissionApplication.findById(req.params.id);
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
    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

/* =====================================================
   UPDATE APPLICATION STATUS (ADMIN)
===================================================== */
export const updateAdmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Reviewed", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const application = await AdmissionApplication.findByIdAndUpdate(
      req.params.id,
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
      message: "Application status updated",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

/* =====================================================
   DELETE APPLICATION (ADMIN)
===================================================== */
export const deleteAdmission = async (req, res) => {
  try {
    const application = await AdmissionApplication.findByIdAndDelete(req.params.id);
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
    res.status(500).json({
      success: false,
      message: "Failed to delete application",
    });
  }
};
