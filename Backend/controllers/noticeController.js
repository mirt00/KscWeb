import Notice from "../models/Notice.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// GET ALL NOTICES
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, notices });
  } catch (err) {
    console.error("GET Notices Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch notices" });
  }
};

// GET SINGLE NOTICE
export const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ success: false, message: "Notice not found" });
    res.status(200).json({ success: true, notice });
  } catch (err) {
    console.error("GET Single Notice Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch notice" });
  }
};

// CREATE NOTICE
export const createNotice = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    let fileUrl = null;
    let fileName = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
      fileUrl = result.secure_url;
      fileName = req.file.originalname;
    }

    const notice = await Notice.create({ title, fileUrl, fileName });
    res.status(201).json({ success: true, message: "Notice created", notice });
  } catch (err) {
    console.error("CREATE Notice Error:", err);
    res.status(500).json({ success: false, message: "Failed to create notice" });
  }
};

// UPDATE NOTICE
export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    const updateData = { title };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
      updateData.fileUrl = result.secure_url;
      updateData.fileName = req.file.originalname;
    }

    const notice = await Notice.findByIdAndUpdate(id, updateData, { new: true });
    if (!notice) return res.status(404).json({ success: false, message: "Notice not found" });

    res.status(200).json({ success: true, message: "Notice updated", notice });
  } catch (err) {
    console.error("UPDATE Notice Error:", err);
    res.status(500).json({ success: false, message: "Failed to update notice" });
  }
};

// DELETE NOTICE
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) return res.status(404).json({ success: false, message: "Notice not found" });
    res.status(200).json({ success: true, message: "Notice deleted" });
  } catch (err) {
    console.error("DELETE Notice Error:", err);
    res.status(500).json({ success: false, message: "Failed to delete notice" });
  }
};

// CLOUDINARY UPLOAD
const uploadToCloudinary = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "notices", resource_type: "raw", use_filename: true, unique_filename: true },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
