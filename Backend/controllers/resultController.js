import Result from "../models/Result.js";
import cloudinary from "../config/cloudinary.js";

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} fileBuffer
 * @returns {Promise<Object>} Cloudinary upload result
 */
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "results" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

// ===============================
// 📌 CREATE RESULT
// ===============================
export const createResult = async (req, res) => {
  try {
    const { title, description, program, semester, year } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Result image is required" });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const result = await Result.create({
      title,
      description,
      program,
      semester,
      year,
      resultImage: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      uploadedBy: req.adminId || null, // make sure adminId is set via auth middleware
    });

    res.status(201).json({ success: true, message: "Result uploaded successfully", data: result });
  } catch (error) {
    console.error("Create Result Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ===============================
// 📌 GET ALL RESULTS
// ===============================
export const getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "name email"); // optional, populate uploader info

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Get Results Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ===============================
// 📌 GET SINGLE RESULT
// ===============================
export const getSingleResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate("uploadedBy", "name email");
    if (!result) return res.status(404).json({ success: false, message: "Result not found" });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Get Single Result Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ===============================
// 📌 UPDATE RESULT
// ===============================
export const updateResult = async (req, res) => {
  try {
    const { title, description, program, semester, year } = req.body;

    const result = await Result.findById(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: "Result not found" });

    // If a new image is uploaded, delete old one & upload new one
    if (req.file) {
      await cloudinary.uploader.destroy(result.resultImage.public_id);
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      result.resultImage = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    // Update other fields
    result.title = title || result.title;
    result.description = description || result.description;
    result.program = program || result.program;
    result.semester = semester || result.semester;
    result.year = year || result.year;

    const updatedResult = await result.save();

    res.status(200).json({ success: true, message: "Result updated successfully", data: updatedResult });
  } catch (error) {
    console.error("Update Result Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ===============================
// 📌 DELETE RESULT
// ===============================
export const deleteResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) return res.status(404).json({ success: false, message: "Result not found" });

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(result.resultImage.public_id);

    // Delete document from MongoDB
    await result.deleteOne();

    res.status(200).json({ success: true, message: "Result deleted successfully" });
  } catch (error) {
    console.error("Delete Result Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
