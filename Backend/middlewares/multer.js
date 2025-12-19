import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "notices",
    resource_type: "raw", // raw allows any file type
    use_filename: true,
    unique_filename: true,
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
