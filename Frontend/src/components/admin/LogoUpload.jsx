// src/components/admin/LogoUpload.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Upload } from "lucide-react";

const LogoUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [existingLogo, setExistingLogo] = useState(null);

  // Fetch the existing logo
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
      }
    };
    fetchLogo();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("⚠️ Please select a file first!");

    const formData = new FormData();
    formData.append("logo", file);

    try {
      setIsUploading(true);
      setMessage("");

      const res = await axios.post(
        "http://localhost:5000/api/logo/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("✅ Logo uploaded successfully!");
      setExistingLogo(res.data);
      setFile(null);
      setPreview(res.data.imageUrl);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to upload logo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingLogo?._id) return;

    try {
      await axios.delete(`http://localhost:5000/api/logo/${existingLogo._id}`);
      setMessage("🗑️ Logo deleted successfully!");
      setExistingLogo(null);
      setPreview(null);
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to delete logo.");
    }
  };

  return (
    <div className="ml-72 mt-24 p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-8 text-center">
        Manage Website Logo
      </h2>

      <div className="bg-white rounded-3xl shadow-lg p-6 max-w-md mx-auto hover:shadow-xl transition">
        <div className="flex flex-col items-center space-y-5">
          <div className="relative">
            {preview ? (
              <img
                src={preview}
                alt="Logo Preview"
                className="w-40 h-40 object-contain rounded-xl border border-gray-300 shadow-sm bg-gray-100"
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400 bg-gray-50">
                No Logo
              </div>
            )}

            {existingLogo && (
              <button
                onClick={handleDelete}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition"
                title="Delete Logo"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <form onSubmit={handleUpload} className="w-full space-y-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-700"
            />

            <button
              type="submit"
              disabled={isUploading}
              className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
                isUploading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <Upload size={18} />
              {isUploading ? "Uploading..." : "Upload Logo"}
            </button>
          </form>

          {message && <p className="mt-3 text-center text-sm text-gray-700">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;
