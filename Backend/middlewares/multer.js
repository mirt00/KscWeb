import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "notices",
    resource_type: "auto", // <--- CRITICAL: Detects if it's an image/pdf automatically
    allowed_formats: ["jpg", "png", "jpeg", "pdf"], 
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max
  fileFilter: (req, file, cb) => {
    // Allow all types
    cb(null, true);
  },
});

export default upload;
