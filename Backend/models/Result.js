import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    program: {
      type: String,
      required: true, // BCA, BBS, MBS, etc.
      trim: true,
       default: "all"
    },

    semester: {
      type: String, // 1st, 2nd, 5th, 6th…
      required: true,
      default: "all"
    },

    year: {
      type: String,
      required: true,
       default: "all"
    },

    resultImage: {
      url: { type: String, required: true }, // cloudinary image url
      public_id: { type: String, required: true }, // cloudinary public id
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
