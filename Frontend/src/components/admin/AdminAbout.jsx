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
    chairmanMessage: {
      name: "",
      designation: "Chairman",
      message: "",
      photo: "",
    },
    campusChiefMessage: {
      name: "",
      designation: "Campus Chief",
      message: "",
      photo: "",
    },
    mission: "",
    vision: "",
    history: "",
    whyChooseUs: [],
    extraSections: [],
  });

  // Fetch existing About data
  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/about");
      
      if (res.data) {
        setAboutId(res.data.data._id);
        setForm({
          bannerImage: res.data.bannerImage || "",
          chairmanMessage: {
            name: res.data.chairmanMessage?.name || "",
            designation: res.data.chairmanMessage?.designation || "Chairman",
            message: res.data.chairmanMessage?.message || "",
            photo: res.data.chairmanMessage?.photo || "",
          },
          campusChiefMessage: {
            name: res.data.campusChiefMessage?.name || "",
            designation: res.data.campusChiefMessage?.designation || "Campus Chief",
            message: res.data.campusChiefMessage?.message || "",
            photo: res.data.campusChiefMessage?.photo || "",
          },
          mission: res.data.mission || "",
          vision: res.data.vision || "",
          history: res.data.history || "",
          whyChooseUs: res.data.whyChooseUs || [],
          extraSections: res.data.extraSections || [],
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle nested field updates
  const handleNestedChange = (section, field, value) => {
    setForm({
      ...form,
      [section]: {
        ...form[section],
        [field]: value,
      },
    });
  };

  // Handle simple fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // WHY CHOOSE US — add/update/remove
  const addWhyChoose = () => {
    setForm({
      ...form,
      whyChooseUs: [...form.whyChooseUs, { title: "", icon: "", description: "" }],
    });
  };

  const updateWhyChoose = (index, field, value) => {
    const updated = [...form.whyChooseUs];
    updated[index][field] = value;
    setForm({ ...form, whyChooseUs: updated });
  };

  const removeWhyChoose = (index) => {
    const updated = form.whyChooseUs.filter((_, i) => i !== index);
    setForm({ ...form, whyChooseUs: updated });
  };

  // EXTRA SECTIONS — add/update/remove
  const addSection = () => {
    setForm({
      ...form,
      extraSections: [...form.extraSections, { sectionTitle: "", content: "", image: "" }],
    });
  };

  const updateSection = (index, field, value) => {
    const updated = [...form.extraSections];
    updated[index][field] = value;
    setForm({ ...form, extraSections: updated });
  };

  const removeSection = (index) => {
    const updated = form.extraSections.filter((_, i) => i !== index);
    setForm({ ...form, extraSections: updated });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.put(`http://localhost:5000/api/about/${aboutId}`, form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to update About Page");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading about page data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Edit About Page</h1>
          <p className="text-gray-600 mt-2">Update and manage your about page content</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <div className="flex-shrink-0">
              <div className="h-5 w-5 text-green-400">✓</div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                About page updated successfully!
              </p>
            </div>
            <button 
              onClick={() => setSuccess(false)}
              className="ml-auto"
            >
              <X className="h-4 w-4 text-green-600" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner Image Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Upload className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Banner Image</h2>
                  <p className="text-sm text-gray-500">Main banner for the about page</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Image URL
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={form.bannerImage}
                  onChange={(e) => setForm({ ...form, bannerImage: e.target.value })}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/banner-image.jpg"
                />
                {form.bannerImage && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                    <img 
                      src={form.bannerImage} 
                      alt="Banner preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "https://via.placeholder.com/400x200?text=Invalid+URL"}
                    />
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Enter a valid image URL. Recommended size: 1920x600px
              </p>
            </div>
          </div>

          {/* Chairman Message Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <button
              type="button"
              onClick={() => toggleSection('chairman')}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-gray-800">Chairman's Message</h2>
                  <p className="text-sm text-gray-500">Edit chairman's information and message</p>
                </div>
              </div>
              {expandedSections.chairman ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.chairman && (
              <div className="p-6 pt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Chairman's Name"
                      value={form.chairmanMessage?.name || ""}
                      onChange={(e) => handleNestedChange("chairmanMessage", "name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      placeholder="Designation"
                      value={form.chairmanMessage?.designation || "Chairman"}
                      onChange={(e) => handleNestedChange("chairmanMessage", "designation", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Write chairman's message here..."
                    value={form.chairmanMessage?.message || ""}
                    onChange={(e) => handleNestedChange("chairmanMessage", "message", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[150px]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo URL
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="https://example.com/chairman-photo.jpg"
                      value={form.chairmanMessage?.photo || ""}
                      onChange={(e) => handleNestedChange("chairmanMessage", "photo", e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {form.chairmanMessage?.photo && (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                        <img 
                          src={form.chairmanMessage.photo} 
                          alt="Chairman preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.src = "https://via.placeholder.com/200?text=Invalid+URL"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Campus Chief Message Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <button
              type="button"
              onClick={() => toggleSection('campusChief')}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-gray-800">Campus Chief's Message</h2>
                  <p className="text-sm text-gray-500">Edit campus chief's information and message</p>
                </div>
              </div>
              {expandedSections.campusChief ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.campusChief && (
              <div className="p-6 pt-0 space-y-4">
                {/* Similar structure to chairman section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Campus Chief's Name"
                      value={form.campusChiefMessage?.name || ""}
                      onChange={(e) => handleNestedChange("campusChiefMessage", "name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      placeholder="Designation"
                      value={form.campusChiefMessage?.designation || "Campus Chief"}
                      onChange={(e) => handleNestedChange("campusChiefMessage", "designation", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Write campus chief's message here..."
                    value={form.campusChiefMessage?.message || ""}
                    onChange={(e) => handleNestedChange("campusChiefMessage", "message", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[150px]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo URL
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="https://example.com/campus-chief-photo.jpg"
                      value={form.campusChiefMessage?.photo || ""}
                      onChange={(e) => handleNestedChange("campusChiefMessage", "photo", e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {form.campusChiefMessage?.photo && (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                        <img 
                          src={form.campusChiefMessage.photo} 
                          alt="Campus Chief preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.src = "https://via.placeholder.com/200?text=Invalid+URL"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mission, Vision & History */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <button
              type="button"
              onClick={() => toggleSection('missionVision')}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-bold text-gray-800">Mission, Vision & History</h2>
                  <p className="text-sm text-gray-500">Core institutional information</p>
                </div>
              </div>
              {expandedSections.missionVision ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.missionVision && (
              <div className="p-6 pt-0 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </div>
                    <label className="block text-sm font-medium text-gray-700">
                      Vision
                    </label>
                  </div>
                  <textarea
                    name="vision"
                    value={form.vision || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px]"
                    placeholder="Enter institutional vision..."
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Target className="h-4 w-4 text-green-600" />
                    </div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mission
                    </label>
                  </div>
                  <textarea
                    name="mission"
                    value={form.mission || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px]"
                    placeholder="Enter institutional mission..."
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                    </div>
                    <label className="block text-sm font-medium text-gray-700">
                      History
                    </label>
                  </div>
                  <textarea
                    name="history"
                    value={form.history || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[150px]"
                    placeholder="Enter institutional history..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <div className="h-5 w-5 text-indigo-600">✓</div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Why Choose Us</h2>
                    <p className="text-sm text-gray-500">Highlight key features and benefits</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addWhyChoose}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Feature</span>
                </button>
              </div>

              {form.whyChooseUs.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-gray-400 mb-2">No features added yet</div>
                  <p className="text-sm text-gray-500">Click "Add Feature" to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {form.whyChooseUs.map((item, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <span className="text-gray-600 font-medium">{index + 1}</span>
                          </div>
                          <h3 className="font-medium text-gray-800">
                            Feature {index + 1}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeWhyChoose(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Expert Faculty"
                            value={item.title || ""}
                            onChange={(e) => updateWhyChoose(index, "title", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Icon URL
                          </label>
                          <input
                            type="text"
                            placeholder="https://example.com/icon.svg"
                            value={item.icon || ""}
                            onChange={(e) => updateWhyChoose(index, "icon", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            placeholder="Describe this feature..."
                            value={item.description || ""}
                            onChange={(e) => updateWhyChoose(index, "description", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Extra Sections */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <div className="h-5 w-5 text-amber-600">+</div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Extra Sections</h2>
                    <p className="text-sm text-gray-500">Additional content sections</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addSection}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Section</span>
                </button>
              </div>

              {form.extraSections.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-gray-400 mb-2">No extra sections added</div>
                  <p className="text-sm text-gray-500">Add custom sections to your about page</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {form.extraSections.map((sec, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <span className="text-gray-600 font-medium">{index + 1}</span>
                          </div>
                          <h3 className="font-medium text-gray-800">
                            Section {index + 1}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Our Facilities"
                            value={sec.sectionTitle || ""}
                            onChange={(e) => updateSection(index, "sectionTitle", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                          </label>
                          <textarea
                            placeholder="Section content..."
                            value={sec.content || ""}
                            onChange={(e) => updateSection(index, "content", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px]"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                          </label>
                          <div className="flex space-x-4">
                            <input
                              type="text"
                              placeholder="https://example.com/section-image.jpg"
                              value={sec.image || ""}
                              onChange={(e) => updateSection(index, "image", e.target.value)}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            {sec.image && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-300">
                                <img 
                                  src={sec.image} 
                                  alt="Section preview" 
                                  className="w-full h-full object-cover"
                                  onError={(e) => e.target.src = "https://via.placeholder.com/100?text=Invalid+URL"}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-6 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ready to save changes?</p>
                <p className="text-xs text-gray-400">All updates will be reflected on the about page</p>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-100"
              >
                <Save className="h-5 w-5" />
                <span>{submitting ? "Saving..." : "Save All Changes"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAbout;