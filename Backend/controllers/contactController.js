import Contact from "../models/Contact.js";

// GET /api/contact
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact)
      return res.status(404).json({ success: false, message: "No contact info found" });
    res.status(200).json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch contact info", error: error.message });
  }
};

// POST /api/contact
export const createContact = async (req, res) => {
  try {
    let { address, phone_no, email } = req.body;

    // Trim inputs
    address = address?.trim();
    phone_no = phone_no?.trim();
    email = email?.trim();

    const existing = await Contact.findOne();
    if (existing)
      return res.status(400).json({ success: false, message: "Contact already exists, use PUT to update" });

    if (!phone_no.startsWith("+977")) phone_no = "+977" + phone_no;

    const contact = new Contact({ address, phone_no, email });
    await contact.save();

    res.status(201).json({ success: true, message: "Contact created successfully", contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create contact", error: error.message });
  }
};

// PUT /api/contact
export const updateContact = async (req, res) => {
  try {
    let { address, phone_no, email } = req.body;

    address = address?.trim();
    phone_no = phone_no?.trim();
    email = email?.trim();

    if (!phone_no.startsWith("+977")) phone_no = "+977" + phone_no;

    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact({ address, phone_no, email });
    } else {
      contact.address = address;
      contact.phone_no = phone_no;
      contact.email = email;
    }

    await contact.save();
    res.status(200).json({ success: true, message: "Contact info updated successfully", contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update contact info", error: error.message });
  }
};
