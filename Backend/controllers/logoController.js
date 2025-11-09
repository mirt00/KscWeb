import Logo from "../models/Logo.js";
import cloudinary from "../config/cloudinary.js";

// Upload logo
export const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "logos",
      resource_type: "image",
    });

    // deactivate previous logos
    await Logo.updateMany({}, { $set: { isActive: false } });

    const logo = await Logo.create({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      isActive: true,
    });

    res.status(201).json(logo);
  } catch (error) {
    console.error("Error uploading logo:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get active logo
export const getActiveLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne({ isActive: true });
    if (!logo) return res.status(404).json({ message: "No active logo found" });
    res.status(200).json(logo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete logo
export const deleteLogo = async (req, res) => {
  try {
    const { id } = req.params;

    const logo = await Logo.findById(id);
    if (!logo) return res.status(404).json({ message: "Logo not found" });

    // delete from Cloudinary
    await cloudinary.uploader.destroy(logo.publicId);

    // delete from MongoDB
    await logo.deleteOne();

    res.status(200).json({ message: "Logo deleted successfully" });
  } catch (error) {
    console.error("Error deleting logo:", error);
    res.status(500).json({ message: "Server error" });
  }
};
