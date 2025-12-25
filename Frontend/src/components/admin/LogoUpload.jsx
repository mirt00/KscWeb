// src/components/admin/LogoUpload.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Upload, FileImage, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

const LogoUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isUploading, setIsUploading] = useState(false);
  const [existingLogo, setExistingLogo] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/logo/active");
        if (res.data && res.data.imageUrl) {
          setExistingLogo(res.data);
          setPreview(res.data.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching logo:", err);
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchLogo();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Basic Industry Validation (Size check < 2MB)
      if (selectedFile.size > 2 * 1024 * 1024) {
        return setMessage({ text: "File too large. Max 2MB allowed.", type: "error" });
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setMessage({ text: "Image ready for upload", type: "success" });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage({ text: "Please select an image file", type: "error" });

    const formData = new FormData();
    formData.append("logo", file);

    try {
      setIsUploading(true);
      setMessage({ text: "", type: "" });

      const res = await axios.post(
        "http://localhost:5000/api/logo/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage({ text: "Brand identity updated successfully!", type: "success" });
      setExistingLogo(res.data);
      setFile(null);
      setPreview(res.data.imageUrl);
    } catch (err) {
      setMessage({ text: "Upload failed. Verify server connection.", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingLogo?._id) return;
    if (!window.confirm("Are you sure you want to remove the current logo?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/logo/${existingLogo._id}`);
      setMessage({ text: "Logo removed from system", type: "success" });
      setExistingLogo(null);
      setPreview(null);
      setFile(null);
    } catch (err) {
      setMessage({ text: "Could not remove the asset.", type: "error" });
    }
  };

  return (
    <div className="lg:ml-80 mt-24 p-8 min-h-screen bg-[#F8FAFC]">
      {/* Header with Breadcrumb-style info */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h2 className="text-4xl font-black text-[#1E293B] tracking-tight mb-2">
          Brand Management
        </h2>
        <p className="text-slate-500 font-medium italic">Configure your institution's primary visual identity</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 max-w-xl mx-auto overflow-hidden relative group">
        
        {/* Decorative Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-110 opacity-50" />

        <div className="flex flex-col items-center">
          {/* Logo Stage */}
          <div className="relative mb-10 group/preview">
            {isInitialLoading ? (
              <div className="w-56 h-56 rounded-3xl bg-slate-50 animate-pulse flex items-center justify-center border border-slate-100">
                <Loader2 className="animate-spin text-slate-300" size={32} />
              </div>
            ) : preview ? (
              <div className="relative">
                <div className="w-56 h-56 flex items-center justify-center p-6 bg-white rounded-3xl border-2 border-slate-50 shadow-inner overflow-hidden">
                  <img src={preview} alt="Identity" className="max-w-full max-h-full object-contain" />
                </div>
                {existingLogo && (
                  <button
                    onClick={handleDelete}
                    className="absolute -top-3 -right-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl p-3 shadow-xl border border-red-100 transition-all active:scale-90"
                    title="Remove Logo"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-56 h-56 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50 rounded-3xl text-slate-400">
                <FileImage size={48} className="mb-2 opacity-20" />
                <span className="text-[10px] uppercase font-bold tracking-widest">No Active Logo</span>
              </div>
            )}
          </div>

          <form onSubmit={handleUpload} className="w-full space-y-6">
            {/* Industry Dropzone Input */}
            <div className="relative group/input">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-slate-200 group-hover/input:border-blue-400 group-hover/input:bg-blue-50/30 rounded-2xl p-6 transition-all text-center">
                <Upload className="mx-auto mb-2 text-slate-400 group-hover/input:text-blue-500 transition-colors" size={24} />
                <p className="text-sm font-semibold text-slate-600">
                  {file ? file.name : "Drag & drop or click to browse"}
                </p>
                <p className="text-[10px] text-slate-400 uppercase mt-1">PNG, JPG or SVG (Max 2MB)</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading || !file}
              className={`w-full h-14 flex items-center justify-center gap-3 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] ${
                isUploading || !file
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300"
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Synchronizing...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>

          {/* Contextual Status Bar */}
          {message.text && (
            <div className={`mt-6 w-full flex items-center gap-3 p-4 rounded-xl border animate-in slide-in-from-bottom-2 duration-300 ${
              message.type === 'error' 
                ? "bg-red-50 border-red-100 text-red-600" 
                : "bg-emerald-50 border-emerald-100 text-emerald-600"
            }`}>
              {message.type === 'error' ? <AlertCircle size={18} /> : <ShieldCheck size={18} />}
              <p className="text-xs font-bold uppercase tracking-wide">{message.text}</p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-12 grid grid-cols-2 gap-4 opacity-40">
        <div className="p-4 rounded-2xl border border-slate-200 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Recommended Ratio</p>
          <p className="text-sm font-black text-slate-600">1:1 or Horizontal</p>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Live Updates</p>
          <p className="text-sm font-black text-slate-600">Global Sync</p>
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;