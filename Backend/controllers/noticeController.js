import Notice from "../models/Notice.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ================= GET ALL NOTICES =================
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, notices });
  } catch (err) {
    console.error("❌ GET Notices Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch notices" });
  }
};

// ================= CREATE NOTICE =================
export const createNotice = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    let fileUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      fileUrl = result.secure_url;
    }

    const notice = await Notice.create({ title, fileUrl });
    res.status(201).json({ success: true, message: "Notice created", notice });

  } catch (err) {
    console.error("❌ CREATE Notice Error:", err);
    res.status(500).json({ success: false, message: "Failed to create notice" });
  }
};

// ================= UPDATE NOTICE =================
export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const updateData = { title };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.fileUrl = result.secure_url;
    }

    const notice = await Notice.findByIdAndUpdate(id, updateData, { new: true });
    if (!notice) {
      return res.status(404).json({ success: false, message: "Notice not found" });
    }

    res.status(200).json({ success: true, message: "Notice updated", notice });

  } catch (err) {
    console.error("❌ UPDATE Notice Error:", err);
    res.status(500).json({ success: false, message: "Failed to update notice" });
  }
};

// ================= DELETE NOTICE =================
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) {
      return res.status(404).json({ success: false, message: "Notice not found" });
    }
    res.status(200).json({ success: true, message: "Notice deleted" });

  } catch (err) {
    console.error("❌ DELETE Notice Error:", err);
    res.status(500).json({ success: false, message: "Failed to delete notice" });
  }
};

// ================= HELPER: CLOUDINARY UPLOAD =================
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "notices", resource_type: "raw" }, // ✅ raw allows any file type
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
