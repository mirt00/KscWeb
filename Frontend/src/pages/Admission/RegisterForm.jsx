import React, { useState } from "react";

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    studentInfo: { fullName: "", dateOfBirth: "", gender: "Male", nationality: "Nepali", religion: "" },
    contactDetails: { permanentAddress: "", temporaryAddress: "", mobileNumber: "", email: "" },
    academicInfo: { schoolName: "", seeBoard: "NEB", yearOfPassing: "", symbolNumber: "", gpaOrGrade: "" },
    streamInfo: { stream: "Management" },
    guardianInfo: { fatherName: "", motherName: "", guardianName: "", contactNumber: "", occupation: "" },
  });

  const [files, setFiles] = useState({
    seeMarksheet: null,
    birthOrCitizenship: null,
    studentSignature: null,
    passportPhotos: [],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, ...files };
    onSubmit(finalData);
  };

  // COLOR PALETTE:
  // Deep Maroon: #3F1536
  // Muted Wine: #5D2A51 (Border/Hover)
  // Dusty Rose: #FDF4F9 (Section Backgrounds)
  // Soft Mauve: #9B708F (Secondary Text)

  const inputStyle = "w-full px-4 py-3 bg-white border border-[#3F1536]/10 rounded-xl focus:ring-2 focus:ring-[#C8A45D] focus:border-transparent outline-none transition-all text-sm font-medium text-[#3F1536]";
  const labelStyle = "block text-[10px] font-black text-[#9B708F] uppercase tracking-[0.2em] mb-2 ml-1";
  const sectionHeader = "flex items-center gap-5 mb-10";
  const sectionBadge = "h-12 w-12 rounded-2xl bg-[#FDF4F9] text-[#3F1536] flex items-center justify-center font-black text-lg border border-[#3F1536]/10 shadow-sm";

  return (
    <div className="max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      
      {/* HEADER: Deep Maroon Hero */}
      <div className="relative overflow-hidden bg-[#3F1536] rounded-t-[3rem] p-12 text-center border-b-8 border-[#C8A45D]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-white rounded-full blur-[120px]"></div>
        </div>
        <h2 className="relative z-10 text-3xl md:text-5xl font-black text-white tracking-[0.05em] uppercase">
          Digital <span className="text-[#C8A45D]">Admission</span>
        </h2>
        <p className="relative z-10 text-white/60 mt-4 font-bold uppercase tracking-widest text-xs">
          Kathmandu Shiksha Campus Enrollment
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-b-[3rem] p-8 md:p-16 shadow-2xl space-y-20 border-x border-b border-gray-100">
        
        {/* SECTION 1: Personal Details */}
        <section>
          <div className={sectionHeader}>
            <div className={sectionBadge}>01</div>
            <div>
                <h3 className="text-xl font-black text-[#3F1536] uppercase tracking-wider">Student Profile</h3>
                <div className="h-1 w-12 bg-[#3F1536]/20 mt-1"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className={labelStyle}>Full Name (Official)</label>
              <input type="text" name="fullName" required onChange={(e) => handleChange(e, 'studentInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Date of Birth</label>
              <input type="date" name="dateOfBirth" required onChange={(e) => handleChange(e, 'studentInfo')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Gender Identity</label>
              <div className="flex p-1.5 bg-[#FDF4F9] rounded-2xl border border-[#3F1536]/5">
                {['Male', 'Female', 'Other'].map((g) => (
                    <button 
                        key={g}
                        type="button"
                        onClick={() => setFormData(p => ({...p, studentInfo: {...p.studentInfo, gender: g}}))}
                        className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${formData.studentInfo.gender === g ? 'bg-[#3F1536] text-white shadow-md' : 'text-[#9B708F] hover:text-[#3F1536]'}`}
                    >
                        {g}
                    </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Academic Background - Uses Light Dusty Rose Family */}
        <section className="bg-[#FDF4F9]/60 p-8 md:p-12 rounded-[3rem] border border-[#3F1536]/5 relative">
          <div className="absolute -top-6 left-12">
             <div className={sectionBadge}>02</div>
          </div>
          <div className="mt-4 mb-10">
              <h3 className="text-xl font-black text-[#3F1536] uppercase tracking-wider">Academic Record</h3>
              <p className="text-[#9B708F] text-[10px] font-bold uppercase mt-1">Previous Schooling & Course Selection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                  <label className={labelStyle}>Institution Name</label>
                  <input type="text" name="schoolName" required onChange={(e) => handleChange(e, 'academicInfo')} className={inputStyle} />
              </div>
              <div>
                  <label className={labelStyle}>Proposed Stream</label>
                  <select name="stream" onChange={(e) => handleChange(e, 'streamInfo')} className={`${inputStyle} font-black text-[#3F1536] appearance-none cursor-pointer`}>
                      <option value="Management">Management</option>
                      <option value="Education">Education</option>
                  </select>
              </div>
              <div>
                  <label className={labelStyle}>SEE Symbol Number</label>
                  <input type="text" name="symbolNumber" required onChange={(e) => handleChange(e, 'academicInfo')} className={inputStyle} />
              </div>
              <div>
                  <label className={labelStyle}>Grade Point Average</label>
                  <input type="text" name="gpaOrGrade" required onChange={(e) => handleChange(e, 'academicInfo')} className={inputStyle} />
              </div>
              <div>
                  <label className={labelStyle}>Year (B.S.)</label>
                  <input type="text" name="yearOfPassing" required onChange={(e) => handleChange(e, 'academicInfo')} className={inputStyle} />
              </div>
          </div>
        </section>

        {/* SECTION 3: Documents - Uses Muted Wine Borders */}
        <section>
          <div className={sectionHeader}>
            <div className={sectionBadge}>03</div>
            <div>
                <h3 className="text-xl font-black text-[#3F1536] uppercase tracking-wider">Required Documentation</h3>
                <div className="h-1 w-12 bg-[#3F1536]/20 mt-1"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
                { label: "Passport Photo", name: "passportPhotos", multiple: true },
                { label: "SEE Marksheet", name: "seeMarksheet" },
                { label: "Birth Certificate", name: "birthOrCitizenship" },
                { label: "Digital Signature", name: "studentSignature" }
            ].map((file) => (
                <div key={file.name} className="relative group p-6 border-2 border-dashed border-[#5D2A51]/20 rounded-[2rem] hover:border-[#3F1536] transition-all bg-white hover:shadow-xl hover:shadow-[#3F1536]/5">
                    <label className={labelStyle}>{file.label}</label>
                    <input 
                        type="file" 
                        name={file.name} 
                        multiple={file.multiple}
                        onChange={handleFileChange} 
                        className="text-[10px] w-full font-bold file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-[#FDF4F9] file:text-[#3F1536] file:border file:border-[#3F1536]/10 cursor-pointer hover:file:bg-[#3F1536] hover:file:text-white transition-all" 
                    />
                </div>
            ))}
          </div>
        </section>

        {/* SUBMIT: Gold Action Button */}
        <div className="pt-12">
            <button 
                type="submit" 
                className="group relative w-full bg-[#C8A45D] text-white py-6 rounded-full font-black text-xl uppercase tracking-[0.3em] shadow-2xl hover:shadow-[#C8A45D]/40 hover:-translate-y-1 transition-all overflow-hidden"
            >
                <span className="relative z-10">Confirm Enrollment</span>
                <div className="absolute inset-0 bg-[#3F1536] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
            <p className="text-center text-[#9B708F] text-[10px] font-black uppercase tracking-[0.2em] mt-8">
              KATHMANDU SHIKSHA CAMPUS • ESTD. 1992
            </p>
        </div>

      </form>
    </div>
  );
};

export default RegisterForm;