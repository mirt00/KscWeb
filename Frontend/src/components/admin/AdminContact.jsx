// src/components/admin/AdminContact.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  MapPin, Phone, Mail, Save, Trash2, Edit2, 
  Plus, Loader2, AlertCircle, CheckCircle2 
} from "lucide-react";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [current, setCurrent] = useState({ address: "", phone_no: "", email: "", _id: null });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // Changed to null for better conditional rendering

  // --- API Logic (Unchanged context) ---
  const fetchContacts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/contact");
      if (data.success) setContacts(data.contacts);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to fetch contacts" });
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleChange = (e) => setCurrent({ ...current, [e.target.name]: e.target.value });

  const handleSaveOrUpdate = async () => {
    if (!current.address || !current.phone_no || !current.email) {
        setMessage({ type: "error", text: "All fields are required" });
        return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const method = current._id ? "put" : "post";
      const url = current._id
        ? `http://localhost:5000/api/contact/${current._id}`
        : "http://localhost:5000/api/contact";

      const { data } = await axios({ method, url, data: current });
      setMessage({ type: "success", text: data.message });
      setCurrent({ address: "", phone_no: "", email: "", _id: null });
      fetchContacts();
      
      // Auto clear success message
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.response?.data?.message || "Error saving contact" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact) => {
      setCurrent(contact);
      setMessage(null);
      // Scroll to top on mobile to see form
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this contact entry?")) return;
    try {
      const { data } = await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setMessage({ type: "success", text: data.message });
      fetchContacts();
      if(current._id === id) setCurrent({ address: "", phone_no: "", email: "", _id: null });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error deleting contact" });
    }
  };

  // --- Render Components ---

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 ml-0 lg:ml-72 mt-16 transition-all duration-300">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Contact Management</h1>
        <p className="text-slate-500 text-sm mt-1">Manage public contact details displayed on the website.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Editor Form */}
        <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                        {current._id ? <Edit2 size={18} className="text-blue-600"/> : <Plus size={18} className="text-blue-600"/>}
                        {current._id ? "Edit Details" : "Add New Contact"}
                    </h2>
                    {current._id && (
                        <button 
                            onClick={() => setCurrent({ address: "", phone_no: "", email: "", _id: null })}
                            className="text-xs font-medium text-slate-400 hover:text-slate-600 underline"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {/* Address Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</label>
                        <div className="relative group">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                name="address"
                                value={current.address}
                                onChange={handleChange}
                                placeholder="e.g. Kathmandu, Nepal"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</label>
                        <div className="relative group">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                name="phone_no"
                                value={current.phone_no}
                                onChange={handleChange}
                                placeholder="e.g. +977-9800000000"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={current.email}
                                onChange={handleChange}
                                placeholder="e.g. info@college.edu.np"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Feedback Message */}
                {message && (
                    <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
                        {message.type === 'error' ? <AlertCircle size={16} className="mt-0.5 shrink-0"/> : <CheckCircle2 size={16} className="mt-0.5 shrink-0"/>}
                        <span>{message.text}</span>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleSaveOrUpdate}
                    disabled={loading}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-lg text-sm font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
                >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {current._id ? "Update Contact" : "Save Details"}
                </button>
            </div>
        </div>

        {/* Right Column: List Table */}
        <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-700">Existing Contacts</h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-white border-b border-slate-100 text-slate-400 uppercase tracking-wider text-xs">
                                <th className="px-6 py-4 font-semibold">Location</th>
                                <th className="px-6 py-4 font-semibold">Contact Info</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {contacts.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-3 bg-slate-50 rounded-full"><MapPin className="text-slate-300" size={24}/></div>
                                            <p>No contact details added yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                contacts.map((c) => (
                                    <tr key={c._id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex items-start gap-3">
                                                <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                                                <span className="font-medium text-slate-700">{c.address}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top space-y-1">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Phone size={14} className="text-slate-400" />
                                                <span>{c.phone_no}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Mail size={14} className="text-slate-400" />
                                                <span className="text-blue-600 hover:underline">{c.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(c)}
                                                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(c._id)}
                                                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminContact;