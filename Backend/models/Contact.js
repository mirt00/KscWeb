import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone_no: {
      type: String,
      required: true,
      trim: true,
      default: "+977", // Default country code for Nepal
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);

export default ContactInfo;
