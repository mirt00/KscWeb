import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Save,
  Plus,
  Trash2,
  Upload,
  MessageSquare,
  Target,
  Eye,
  BookOpen,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";

const EditAbout = () => {
  const [aboutId, setAboutId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    chairman: true,
    campusChief: true,
    missionVision: true,
    whyChooseUs: true,
    extraSections: true
  });

  const [form, setForm] = useState({
    bannerImage: "",
    chairmanMessage: { name: "", designation: "Chairman", message: "", photo: "" },
    campusChiefMessage: { name: "", designation: "Campus Chief", message: "", photo: "" },
    mission: "",
    vision: "",
    history: "",
    whyChooseUs: [],
    extraSections: []
  });

  // Fetch About page data
  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/about");
      if (res.data.data) {
        const data = res.data.data;
        setAboutId(data._id);
        setForm({
          bannerImage: data.bannerImage || "",
          chairmanMessage: {
            name: data.chairmanMessage?.name || "",
            designation: data.chairmanMessage?.designation || "Chairman",
            message: data.chairmanMessage?.message || "",
            photo: data.chairmanMessage?.photo || ""
          },
          campusChiefMessage: {
            name: data.campusChiefMessage?.name || "",
            designation: data.campusChiefMessage?.designation || "Campus Chief",
            message: data.campusChiefMessage?.message || "",
            photo: data.campusChiefMessage?.photo || ""
          },
          mission: data.mission || "",
          vision: data.vision || "",
          history: data.history || "",
          whyChooseUs: data.whyChooseUs || [],
          extraSections: data.extraSections || []
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAbout(); }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleNestedChange = (section, field, value) => {
    setForm({ ...form, [section]: { ...form[section], [field]: value } });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // WHY CHOOSE US
  const addWhyChoose = () => setForm({ ...form, whyChooseUs: [...form.whyChooseUs, { title: "", icon: "", description: "" }] });
  const updateWhyChoose = (index, field, value) => {
    const updated = [...form.whyChooseUs]; updated[index][field] = value; setForm({ ...form, whyChooseUs: updated });
  };
  const removeWhyChoose = (index) => setForm({ ...form, whyChooseUs: form.whyChooseUs.filter((_, i) => i !== index) });

  // EXTRA SECTIONS
  const addSection = () => setForm({ ...form, extraSections: [...form.extraSections, { sectionTitle: "", content: "", image: "" }] });
  const updateSection = (index, field, value) => {
    const updated = [...form.extraSections]; updated[index][field] = value; setForm({ ...form, extraSections: updated });
  };
  const removeSection = (index) => setForm({ ...form, extraSections: form.extraSections.filter((_, i) => i !== index) });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const formData = new FormData();

      // Banner image
      if (form.bannerImage instanceof File) formData.append("bannerImage", form.bannerImage);

      // Chairman
      if (form.chairmanMessage.photo instanceof File) formData.append("chairmanPhoto", form.chairmanMessage.photo);
      formData.append("chairmanName", form.chairmanMessage.name);
      formData.append("chairmanDesignation", form.chairmanMessage.designation);
      formData.append("chairmanMessage", form.chairmanMessage.message);

      // Campus Chief
      if (form.campusChiefMessage.photo instanceof File) formData.append("campusChiefPhoto", form.campusChiefMessage.photo);
      formData.append("campusChiefName", form.campusChiefMessage.name);
      formData.append("campusChiefDesignation", form.campusChiefMessage.designation);
      formData.append("campusChiefMessage", form.campusChiefMessage.message);

      // Mission, Vision, History
      formData.append("mission", form.mission);
      formData.append("vision", form.vision);
      formData.append("history", form.history);

      // JSON fields
      formData.append("whyChooseUs", JSON.stringify(form.whyChooseUs));
      formData.append("extraSections", JSON.stringify(form.extraSections));

      await axios({
        method: aboutId ? "put" : "post",
        url: "http://localhost:5000/api/about",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save About Page");
    } finally { setSubmitting(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading about page data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Edit About Page</h1>
          <p className="text-gray-600 mt-2">Update and manage your about page content</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <div className="flex-shrink-0"><div className="h-5 w-5 text-green-400">✓</div></div>
            <div className="ml-3"><p className="text-sm font-medium text-green-800">About page updated successfully!</p></div>
            <button onClick={() => setSuccess(false)} className="ml-auto"><X className="h-4 w-4 text-green-600" /></button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Upload className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Banner Image</h2>
            </div>
            <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, bannerImage: e.target.files[0] })} />
            {form.bannerImage && (
              <div className="w-full h-32 mt-2 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={form.bannerImage instanceof File ? URL.createObjectURL(form.bannerImage) : form.bannerImage}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Chairman Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <button type="button" onClick={() => toggleSection("chairman")} className="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3"><MessageSquare className="h-5 w-5 text-purple-600" /><h2 className="text-xl font-bold text-gray-800">Chairman's Message</h2></div>
              {expandedSections.chairman ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            {expandedSections.chairman && (
              <div className="p-6 pt-0 space-y-4">
                <input type="text" placeholder="Name" value={form.chairmanMessage.name} onChange={(e) => handleNestedChange("chairmanMessage", "name", e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Designation" value={form.chairmanMessage.designation} onChange={(e) => handleNestedChange("chairmanMessage", "designation", e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <textarea placeholder="Message" value={form.chairmanMessage.message} onChange={(e) => handleNestedChange("chairmanMessage", "message", e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <input type="file" accept="image/*" onChange={(e) => handleNestedChange("chairmanMessage", "photo", e.target.files[0])} />
                {form.chairmanMessage.photo && (
                  <div className="w-20 h-20 mt-2 rounded-full overflow-hidden border border-gray-300">
                    <img src={form.chairmanMessage.photo instanceof File ? URL.createObjectURL(form.chairmanMessage.photo) : form.chairmanMessage.photo} alt="Chairman preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Campus Chief Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <button type="button" onClick={() => toggleSection("campusChief")} className="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3"><MessageSquare className="h-5 w-5 text-green-600" /><h2 className="text-xl font-bold text-gray-800">Campus Chief's Message</h2></div>
              {expandedSections.campusChief ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            {expandedSections.campusChief && (
              <div className="p-6 pt-0 space-y-4">
                <input type="text" placeholder="Name" value={form.campusChiefMessage.name} onChange={(e) => handleNestedChange("campusChiefMessage", "name", e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Designation" value={form.campusChiefMessage.designation} onChange={(e) => handleNestedChange("campusChiefMessage", "designation", e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <textarea placeholder="Message" value={form.campusChiefMessage.message} onChange={(e) => handleNestedChange("campusChiefMessage", "message", e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <input type="file" accept="image/*" onChange={(e) => handleNestedChange("campusChiefMessage", "photo", e.target.files[0])} />
                {form.campusChiefMessage.photo && (
                  <div className="w-20 h-20 mt-2 rounded-full overflow-hidden border border-gray-300">
                    <img src={form.campusChiefMessage.photo instanceof File ? URL.createObjectURL(form.campusChiefMessage.photo) : form.campusChiefMessage.photo} alt="Campus Chief preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mission, Vision & History */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <textarea placeholder="Mission" value={form.mission} onChange={handleChange} name="mission" className="w-full px-4 py-2 border rounded-lg mb-2" />
            <textarea placeholder="Vision" value={form.vision} onChange={handleChange} name="vision" className="w-full px-4 py-2 border rounded-lg mb-2" />
            <textarea placeholder="History" value={form.history} onChange={handleChange} name="history" className="w-full px-4 py-2 border rounded-lg" />
          </div>

          {/* Why Choose Us */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <button type="button" onClick={addWhyChoose} className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">Add Feature</button>
            {form.whyChooseUs.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg mb-2">
                <input type="text" placeholder="Title" value={item.title} onChange={(e) => updateWhyChoose(index, "title", e.target.value)} className="w-full mb-2 px-2 py-1 border rounded-lg" />
                <input type="text" placeholder="Icon URL" value={item.icon} onChange={(e) => updateWhyChoose(index, "icon", e.target.value)} className="w-full mb-2 px-2 py-1 border rounded-lg" />
                <textarea placeholder="Description" value={item.description} onChange={(e) => updateWhyChoose(index, "description", e.target.value)} className="w-full mb-2 px-2 py-1 border rounded-lg" />
                <button type="button" onClick={() => removeWhyChoose(index)} className="px-2 py-1 text-red-600">Remove</button>
              </div>
            ))}
          </div> */}

          {/* Extra Sections */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <button type="button" onClick={addSection} className="mb-4 px-4 py-2 bg-amber-600 text-white rounded-lg">Add Section</button>
            {form.extraSections.map((sec, index) => (
              <div key={index} className="border p-4 rounded-lg mb-2">
                <input type="text" placeholder="Section Title" value={sec.sectionTitle} onChange={(e) => updateSection(index, "sectionTitle", e.target.value)} className="w-full mb-2 px-2 py-1 border rounded-lg" />
                <textarea placeholder="Content" value={sec.content} onChange={(e) => updateSection(index, "content", e.target.value)} className="w-full mb-2 px-2 py-1 border rounded-lg" />
                <input type="file" onChange={(e) => updateSection(index, "image", e.target.files[0])} />
                {sec.image && (
                  <div className="w-24 h-24 mt-2 overflow-hidden rounded-lg border border-gray-300">
                    <img src={sec.image instanceof File ? URL.createObjectURL(sec.image) : sec.image} alt="Section" className="w-full h-full object-cover" />
                  </div>
                )}
                <button type="button" onClick={() => removeSection(index)} className="px-2 py-1 text-red-600 mt-1">Remove Section</button>
              </div>
            ))}
          </div> */}

          {/* Submit */}
          <div className="flex justify-end">
            <button type="submit" disabled={submitting} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              {submitting ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAbout;
