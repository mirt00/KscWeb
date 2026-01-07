import About from "../models/Aboutus.js";

/* =========================================================
   CREATE ABOUT PAGE (ONLY ONCE)
========================================================= */
export const createAbout = async (req, res) => {
  try {
    const exists = await About.findOne();
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "About page already exists. Please update it instead.",
      });
    }

    const files = req.files || {};

    const about = await About.create({
      bannerImage: files.bannerImage?.[0]?.path,

      chairmanMessage: {
        name: req.body.chairmanName,
        designation: req.body.chairmanDesignation,
        message: req.body.chairmanMessage,
        photo: files.chairmanPhoto?.[0]?.path,
      },

      campusChiefMessage: {
        name: req.body.campusChiefName,
        designation: req.body.campusChiefDesignation,
        message: req.body.campusChiefMessage,
        photo: files.campusChiefPhoto?.[0]?.path,
      },

      mission: req.body.mission,
      vision: req.body.vision,
      history: req.body.history,
    });

    res.status(201).json({
      success: true,
      message: "About page created successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create About page",
      error: error.message,
    });
  }
};

/* =========================================================
   UPDATE ABOUT PAGE (SINGLETON)
========================================================= */
export const updateAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About page not found",
      });
    }

    const files = req.files || {};

    const updated = await About.findByIdAndUpdate(
      about._id,
      {
        ...(files.bannerImage && {
          bannerImage: files.bannerImage[0].path,
        }),

        chairmanMessage: {
          ...about.chairmanMessage,
          name: req.body.chairmanName ?? about.chairmanMessage?.name,
          designation: req.body.chairmanDesignation ?? about.chairmanMessage?.designation,
          message: req.body.chairmanMessage ?? about.chairmanMessage?.message,
          photo: files.chairmanPhoto?.[0]?.path || about.chairmanMessage?.photo,
        },

        campusChiefMessage: {
          ...about.campusChiefMessage,
          name: req.body.campusChiefName ?? about.campusChiefMessage?.name,
          designation: req.body.campusChiefDesignation ?? about.campusChiefMessage?.designation,
          message: req.body.campusChiefMessage ?? about.campusChiefMessage?.message,
          photo: files.campusChiefPhoto?.[0]?.path || about.campusChiefMessage?.photo,
        },

        mission: req.body.mission ?? about.mission,
        vision: req.body.vision ?? about.vision,
        history: req.body.history ?? about.history,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "About page updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update About page",
      error: error.message,
    });
  }
};

/* =========================================================
   GET ABOUT PAGE
========================================================= */
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About page not found",
      });
    }

    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch About page",
      error: error.message,
    });
  }
};
