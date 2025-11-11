import Contact from "../models/Contact.js";

// GET /api/contact - get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/contact - create a new contact
export const createContact = async (req, res) => {
  try {
    let { address, phone_no, email } = req.body;

    if (!phone_no.startsWith("+977")) phone_no = "+977" + phone_no;

    const contact = new Contact({ address, phone_no, email });
    await contact.save();

    res.status(201).json({ success: true, message: "Contact created successfully", contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/contact/:id - update a contact
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    let { address, phone_no, email } = req.body;

    if (!phone_no.startsWith("+977")) phone_no = "+977" + phone_no;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { address, phone_no, email },
      { new: true }
    );

    if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });

    res.status(200).json({ success: true, message: "Contact updated successfully", contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/contact/:id - delete a contact
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });

    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
