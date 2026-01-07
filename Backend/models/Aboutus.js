import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    bannerImage: String,

    chairmanMessage: {
      name: String,
      designation: { type: String, default: "Chairman" },
      message: String,
      photo: String,
    },

    campusChiefMessage: {
      name: String,
      designation: { type: String, default: "Campus Chief" },
      message: String,
      photo: String,
    },

    mission: String,
    vision: String,
    history: String,

    whyChooseUs: [
      {
        title: String,
        icon: String,
        description: String,
      },
    ],

    extraSections: [
      {
        sectionTitle: String,
        content: String,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("About", AboutSchema);
