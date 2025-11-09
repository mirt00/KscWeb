import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    // ✅ URL of the uploaded logo stored on Cloudinary
    imageUrl: {
      type: String,
      required: [true, "Logo image URL is required"],
      trim: true,
    },

    // ✅ Public ID returned by Cloudinary (used for deleting/updating image)
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
      unique: true,
    },

    // ✅ Optional: who uploaded or last updated the logo
    uploadedBy: {
      type: String,
      default: "Admin",
      trim: true,
    },

    // ✅ Set active logo (for cases where you may keep logo history)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
    versionKey: false, // removes the __v field from documents
  }
);

// ✅ Create index to speed up queries (e.g., only fetch active logo)
logoSchema.index({ isActive: 1, createdAt: -1 });

// ✅ Ensure only one active logo exists at a time (optional business logic)
logoSchema.pre("save", async function (next) {
  if (this.isActive) {
    await this.constructor.updateMany({ _id: { $ne: this._id } }, { isActive: false });
  }
  next();
});

const Logo = mongoose.model("Logo", logoSchema);
export default Logo;
