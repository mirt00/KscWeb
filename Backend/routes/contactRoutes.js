import express from "express";
import { getContact, createContact, updateContact } from "../controllers/contactController.js";

const router = express.Router();

router.get("/", getContact);       // fetch contact info
router.post("/", createContact);   // create contact if none exists
router.put("/", updateContact);    // update existing contact

export default router;
