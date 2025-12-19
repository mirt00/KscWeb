import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    bannerImage: {
      type: String, 
    },

    chairmanMessage: {
      name: { type: String, required: true },
      designation: { type: String, default: "Chairman" },
      message: { type: String, required: true },
      photo: { type: String }, 
    },

    campusChiefMessage: {
      name: { type: String, required: true },
      designation: { type: String, default: "Campus Chief" },
      message: { type: String, required: true },
      photo: { type: String },
    },


    mission: {
      type: String,
    },
    vision: {
      type: String,
    },
    history: {
      type: String,
    },

    whyChooseUs: [
      {
        title: { type: String, required: true },
        icon: { type: String }, 
        description: { type: String, required: true },
      },
    ],


    extraSections: [
      {
        sectionTitle: { type: String },
        content: { type: String },
        image: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("About", AboutSchema);
