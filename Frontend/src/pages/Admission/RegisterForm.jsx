import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    studentInfo: {
      fullName: "",
      dateOfBirth: "",
      gender: "Male",
      nationality: "Nepali",
      religion: "",
    },
    contactDetails: {
      permanentAddress: "",
      temporaryAddress: "",
      mobileNumber: "",
      email: "",
    },
    academicInfo: {
      schoolName: "",
      seeBoard: "NEB",
      yearOfPassing: "",
      symbolNumber: "",
      gpaOrGrade: "",
    },
    streamInfo: { stream: "Management" },
    guardianInfo: {
      fatherName: "",
      motherName: "",
      guardianName: "",
      contactNumber: "",
      occupation: "",
    },
  });

    const [loading, setLoading] = useState(false); // 🔹 Loading state for button


  const [files, setFiles] = useState({
    seeMarksheet: null,
    birthOrCitizenship: null,
    studentSignature: null,
    passportPhotos: [],
    characterCertificate: null,
    transferCertificate: null,
  });

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    if (name === "passportPhotos") {
      setFiles((prev) => ({ ...prev, [name]: Array.from(uploadedFiles) }));
    } else {
      setFiles((prev) => ({ ...prev, [name]: uploadedFiles[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔹 Start loading

    const data = new FormData();

    // Append text fields
    Object.keys(formData).forEach((section) => {
      Object.entries(formData[section]).forEach(([key, value]) => {
        data.append(`${section}[${key}]`, value);
      });
    });

    // Append files
    Object.entries(files).forEach(([key, value]) => {
      if (!value) return;
      if (Array.isArray(value)) value.forEach((file) => data.append(key, file));
      else data.append(key, value);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/admission/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success:", res.data);
      setLoading(false);
      toast.success("✅ Admission submitted successfully!");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error("❌ Failed to submit. Check console for details.");
      setLoading(false);    }
  };

  const inputStyle =
    "w-full px-4 py-3 bg-white border border-[#3F1536]/10 rounded-xl focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent outline-none transition-all text-sm font-medium text-[#3F1536]";
  const labelStyle = "block text-[10px] font-black text-[#9B708F] uppercase tracking-[0.2em] mb-2 ml-1";
  const sectionHeader = "flex items-center gap-5 mb-10";
  const sectionBadge = "h-12 w-12 rounded-2xl bg-[#FDF4F9] text-[#3F1536] flex items-center justify-center font-black text-lg border border-[#3F1536]/10 shadow-sm";

  return (
    <div className="max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="relative overflow-hidden bg-[#3F1536] rounded-t-[3rem] p-12 text-center border-b-8 border-[#C8A45D]">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-[0.05em] uppercase relative z-10">
          Digital <span className="text-[#C8A45D]">Admission</span>
        </h2>
        <p className="relative z-10 text-white/60 mt-4 font-bold uppercase tracking-widest text-xs">
          Kathmandu Shiksha Campus Enrollment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-b-[3rem] p-8 md:p-16 shadow-2xl space-y-20 border-x border-b border-gray-100">

        {/* SECTION 1: Student Info */}
        <section>
          <div className={sectionHeader}>
            <div className={sectionBadge}>01</div>
            <div>
              <h3 className="text-xl font-black text-[#3F1536] uppercase tracking-wider">Student Profile</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelStyle}>Full Name</label>
              <input type="text" name="fullName" required onChange={(e) => handleChange(e, 'studentInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Date of Birth</label>
              <input type="date" name="dateOfBirth" required onChange={(e) => handleChange(e, 'studentInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Gender</label>
              <select name="gender" onChange={(e) => handleChange(e, 'studentInfo')} value={formData.studentInfo.gender} className={inputStyle}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>Nationality</label>
              <input type="text" name="nationality" onChange={(e) => handleChange(e, 'studentInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Religion</label>
              <input type="text" name="religion" onChange={(e) => handleChange(e, 'studentInfo')} className={inputStyle} />
            </div>
          </div>
        </section>

        {/* SECTION 2: Contact Details */}
        <section className="bg-[#FDF4F9]/60 p-6 rounded-[2rem] border border-[#3F1536]/5">
          <h3 className="text-xl font-black text-[#3F1536] uppercase tracking-wider mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Permanent Address</label>
              <input type="text" name="permanentAddress" required onChange={(e) => handleChange(e, 'contactDetails')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Temporary Address</label>
              <input type="text" name="temporaryAddress" onChange={(e) => handleChange(e, 'contactDetails')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Mobile Number</label>
              <input type="text" name="mobileNumber" required onChange={(e) => handleChange(e, 'contactDetails')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Email</label>
              <input type="email" name="email" required onChange={(e) => handleChange(e, 'contactDetails')} className={inputStyle} />
            </div>
          </div>
        </section>

        {/* SECTION 3: Academic Info */}
        <section className="p-6 rounded-[2rem] border border-[#3F1536]/5">
          <h3 className="text-xl font-black text-[#3F1536] uppercase tracking-wider mb-4">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelStyle}>School Name</label>
              <input type="text" name="schoolName" required onChange={(e) => handleChange(e, 'academicInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>SEE Board</label>
              <select name="seeBoard" onChange={(e) => handleChange(e, 'academicInfo')} className={inputStyle}>
                <option>NEB</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>Year of Passing</label>
              <input type="text" name="yearOfPassing" required onChange={(e) => handleChange(e, 'academicInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Symbol Number</label>
              <input type="text" name="symbolNumber" required onChange={(e) => handleChange(e, 'academicInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>GPA / Grade</label>
              <input type="text" name="gpaOrGrade" required onChange={(e) => handleChange(e, 'academicInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Proposed Stream</label>
              <select name="stream" onChange={(e) => handleChange(e, 'streamInfo')} className={inputStyle}>
                <option>Management</option>
                <option>Education</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECTION 4: Guardian Info */}
        <section className="bg-[#FDF4F9]/60 p-6 rounded-[2rem] border border-[#3F1536]/5">
          <h3 className="text-xl font-black text-[#3F1536] uppercase tracking-wider mb-4">Guardian Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Father's Name</label>
              <input type="text" name="fatherName" required onChange={(e) => handleChange(e, 'guardianInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Mother's Name</label>
              <input type="text" name="motherName" required onChange={(e) => handleChange(e, 'guardianInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Guardian Name</label>
              <input type="text" name="guardianName" onChange={(e) => handleChange(e, 'guardianInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Contact Number</label>
              <input type="text" name="contactNumber" required onChange={(e) => handleChange(e, 'guardianInfo')} className={inputStyle} />
            </div>
            <div className="md:col-span-2">
              <label className={labelStyle}>Occupation</label>
              <input type="text" name="occupation" onChange={(e) => handleChange(e, 'guardianInfo')} className={inputStyle} />
            </div>
          </div>
        </section>

        {/* SECTION 5: Documents */}
        <section className="p-6 rounded-[2rem] border border-[#3F1536]/5">
          <h3 className="text-xl font-black text-[#3F1536] uppercase tracking-wider mb-4">Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "SEE Marksheet", name: "seeMarksheet" },
              { label: "Birth Certificate", name: "birthOrCitizenship" },
              { label: "Digital Signature", name: "studentSignature" },
              { label: "Passport Photos", name: "passportPhotos", multiple: true },
              { label: "Character Certificate", name: "characterCertificate" },
              { label: "Transfer Certificate", name: "transferCertificate" },
            ].map((file) => (
              <div key={file.name}>
                <label className={labelStyle}>{file.label}</label>
                <input
                  type="file"
                  name={file.name}
                  multiple={file.multiple}
                  onChange={handleFileChange}
                  className={inputStyle + " cursor-pointer"}
                />
              </div>
            ))}
          </div>
        </section>

       <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-full font-black text-white uppercase tracking-[0.3em] transition-all mt-6 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#C8A45D] hover:shadow-lg"
          }`}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
