import Placement from "../models/Placement.js";
import cloudinary from "../config/cloudinary.js";

// ===============================
// 📌 CREATE PLACEMENT
// ===============================
export const createPlacement = async (req, res) => {
  try {
    const { studentName, position, faculty, year, company, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Student photo is required" });
    }

    const upload = cloudinary.uploader.upload_stream(
      { folder: "placements" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        const placement = await Placement.create({
          studentName,
          position,
          faculty,
          year,
          company,
          description,
          photoUrl: result.secure_url,
        });

        return res.status(201).json({
          message: "Placement added successfully",
          data: placement,
        });
      }
    );

    upload.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 📌 GET ALL PLACEMENTS
// ===============================
export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.status(200).json({success:true, placements})
;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 📌 GET SINGLE PLACEMENT
// ===============================
export const getSinglePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    res.status(200).json(placement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 📌 UPDATE PLACEMENT
// ===============================
export const updatePlacement = async (req, res) => {
  try {
    const { studentName, position, faculty, year, company, description } = req.body;

    let placement = await Placement.findById(req.params.id);
    if (!placement) return res.status(404).json({ message: "Placement not found" });

    let updatedPhotoUrl = placement.photoUrl;

    // If a new image is uploaded
    if (req.file) {
      // Try deleting old image from cloudinary if public_id exists
      const publicId = placement.photoUrl.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`placements/${publicId}`);

      const upload = cloudinary.uploader.upload_stream(
        { folder: "placements" },
        async (error, result) => {
          if (error) return res.status(500).json({ message: error.message });

          updatedPhotoUrl = result.secure_url;

          placement = await Placement.findByIdAndUpdate(
            req.params.id,
            {
              studentName,
              position,
              faculty,
              year,
              company,
              description,
              photoUrl: updatedPhotoUrl,
            },
            { new: true }
          );

          return res.status(200).json({
            message: "Placement updated successfully",
            data: placement,
          });
        }
      );

      upload.end(req.file.buffer);
      return; // prevent duplicate response
    }

    // No new file → only update text fields
    placement = await Placement.findByIdAndUpdate(
      req.params.id,
      { studentName, position, faculty, year, company, description },
      { new: true }
    );

    res.status(200).json({
      message: "Placement updated successfully",
      data: placement,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 📌 DELETE PLACEMENT
// ===============================
export const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    // Remove image from cloudinary
    const publicId = placement.photoUrl.split("/").slice(-1)[0].split(".")[0];
    await cloudinary.uploader.destroy(`placements/${publicId}`);

    await placement.deleteOne();

    res.status(200).json({ message: "Placement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
