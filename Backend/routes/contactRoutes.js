// routes/contactRoutes.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// GET Contact Info
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact info" });
  }
});

// POST/PUT Contact Info
router.post("/", async (req, res) => {
  try {
    const { address, phone, email } = req.body;
    let contact = await Contact.findOne();

    if (contact) {
      contact.address = address;
      contact.phone = phone;
      contact.email = email;
      await contact.save();
    } else {
      contact = new Contact({ address, phone, email });
      await contact.save();
    }

    res.json({ message: "Contact info saved successfully", contact });
  } catch (err) {
    res.status(500).json({ message: "Failed to save contact info" });
  }
});

export default router; // ✅ ES Module export
