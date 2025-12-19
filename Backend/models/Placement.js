import mongoose from "mongoose";

const PlacementSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    faculty: {
      type: String,
      enum: ["Management", "Education"],
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    photoUrl: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      default: "Not Specified",
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// For filtering & fast queries
PlacementSchema.index({ faculty: 1, year: 1 });

const Placement = mongoose.model("Placement", PlacementSchema);
export default Placement;
