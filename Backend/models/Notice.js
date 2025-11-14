import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"], 
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [200, "Title can't exceed 200 characters"]
    },
    fileUrl: { 
      type: String, 
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: props => `${props.value} is not a valid URL`
      }
    },
  },
  { timestamps: true }
);

// Index for faster sorting by creation date
noticeSchema.index({ createdAt: -1 });

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
