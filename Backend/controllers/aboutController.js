import About from "../models/Aboutus.js";

// ---------------------------------------------------------
// Create About Page (only once)
// ---------------------------------------------------------
export const createAbout = async (req, res) => {
  try {
    const existing = await About.findOne();
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "About page already exists. Please update it instead.",
      });
    }

    const about = await About.create(req.body);

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

// ---------------------------------------------------------
// Get About Page
// ---------------------------------------------------------
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

// ---------------------------------------------------------
// Update About Page (full update)
// ---------------------------------------------------------
export const updateAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About page does not exist",
      });
    }

    const updated = await About.findByIdAndUpdate(about._id, req.body, {
      new: true,
      runValidators: true,
    });

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

// ---------------------------------------------------------
// Add a Why-Choose-Us Item
// ---------------------------------------------------------
export const addWhyChooseUs = async (req, res) => {
  try {
    const { title, icon, description } = req.body;

    const about = await About.findOne();
    if (!about) return res.status(404).json({ success: false, message: "About page not found" });

    about.whyChooseUs.push({ title, icon, description });
    await about.save();

    res.status(200).json({ success: true, message: "Why Choose Us item added", data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add Why Choose Us item", error: error.message });
  }
};

// ---------------------------------------------------------
// Remove a Why-Choose-Us Item
// ---------------------------------------------------------
export const removeWhyChooseUs = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findOne();
    if (!about) return res.status(404).json({ success: false, message: "About page not found" });

    about.whyChooseUs = about.whyChooseUs.filter((item) => item._id.toString() !== id);
    await about.save();

    res.status(200).json({ success: true, message: "Why Choose Us item removed", data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to remove Why Choose Us item", error: error.message });
  }
};

// ---------------------------------------------------------
// Add an Extra Section
// ---------------------------------------------------------
export const addExtraSection = async (req, res) => {
  try {
    const { sectionTitle, content, image } = req.body;
    const about = await About.findOne();
    if (!about) return res.status(404).json({ success: false, message: "About page not found" });

    about.extraSections.push({ sectionTitle, content, image });
    await about.save();

    res.status(200).json({ success: true, message: "Extra section added", data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add extra section", error: error.message });
  }
};

// ---------------------------------------------------------
// Remove an Extra Section
// ---------------------------------------------------------
export const removeExtraSection = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findOne();
    if (!about) return res.status(404).json({ success: false, message: "About page not found" });

    about.extraSections = about.extraSections.filter((section) => section._id.toString() !== id);
    await about.save();

    res.status(200).json({ success: true, message: "Extra section removed", data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to remove extra section", error: error.message });
  }
};
