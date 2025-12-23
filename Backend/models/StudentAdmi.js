import mongoose from "mongoose";

const AdmissionApplicationSchema = new mongoose.Schema(
  {
    // ======================
    // 1. Student Information
    // ======================
    studentInfo: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      nationality: {
        type: String,
        required: true,
      },
      religion: {
        type: String,
      },
  
    },

    // ======================
    // 2. Contact Details
    // ======================
    contactDetails: {
      permanentAddress: {
        type: String,
        required: true,
      },
      temporaryAddress: {
        type: String,
      },
      mobileNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
    },

    // ======================
    // 3. Academic Information (SEE)
    // ======================
    academicInfo: {
      schoolName: {
        type: String,
        required: true,
      },
      seeBoard: {
        type: String,
        enum: ["NEB", "Other"],
        required: true,
      },
      yearOfPassing: {
        type: String,
        required: true,
      },
      symbolNumber: {
        type: String,
        required: true,
      },
      gpaOrGrade: {
        type: String,
        required: true,
      },
    },

    // ======================
    // 4. Stream Applying For
    // ======================
    streamInfo: {
      stream: {
        type: String,
        enum: ["Management", "Education"],
        required: true,
      },
      
    },

    // ======================
    // 5. Guardian / Parent Info
    // ======================
    guardianInfo: {
      fatherName: {
        type: String,
        required: true,
      },
      motherName: {
        type: String,
        required: true,
      },
      guardianName: {
        type: String,
      },
      contactNumber: {
        type: String,
        required: true,
      },
      occupation: {
        type: String,
      },
    },

    // ======================
    // 6. Documents (Images / Files)
    // ======================
    documents: {
      seeMarksheet: {
        type: String, // Cloudinary / S3 URL
        required: true,
      },
      characterCertificate: {
        type: String,
        required: false,
      },
      birthOrCitizenship: {
        type: String,
        required: true,
      },
      transferCertificate: {
        type: String,
        required: false,
      },
      passportPhotos: [
        {
          type: String,
          required: true,
        },
      ],
    },

    // ======================
    // 7. Declaration
    // ======================
    declaration: {
      studentSignature: {
        type: String, // Signature image URL
        required: true,
      },
      declarationAccepted: {
        type: Boolean,
        default: true,
      },
      declaredDate: {
        type: Date,
        default: Date.now,
      },
    },

    // ======================
    // Application Status
    // ======================
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AdmissionApplication", AdmissionApplicationSchema);
