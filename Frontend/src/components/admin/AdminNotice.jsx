import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Plus, FileText, Trash2, Edit3, ExternalLink, 
  UploadCloud, AlertCircle, Calendar, X 
} from "lucide-react";

export default function AdminNoticeList() {
  const [notices, setNotices] = useState([]);
  const [editingNotice, setEditingNotice] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000/api/notice";

  const allowedTypes = [
    "image/jpeg", "image/png", "application/pdf",
    "application/zip", "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const fetchNotices = async () => {
    try {
      const res = await axios.get(API);
      setNotices(res.data.notices || []);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  };

  useEffect(() => { 
    fetchNotices(); 
  }, []);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!newTitle || !newFile) return alert("All fields are required");
    if (!allowedTypes.includes(newFile.type)) return alert("Unsupported file type!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("file", newFile);
      await axios.post(API, formData);
      setNewTitle("");
      setNewFile(null);
      fetchNotices();
    } catch (error) {
      alert("Failed to create notice");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchNotices();
    } catch (error) {
      alert("Failed to delete notice");
    }
  };

  const handleEditSave = async () => {
    if (!newTitle) return alert("Title is required");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      if (newFile) formData.append("file", newFile);
      await axios.put(`${API}/${editingNotice._id}`, formData);
      setEditingNotice(null);
      setNewFile(null);
      setNewTitle("");
      fetchNotices();
    } catch (error) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const getFileBadge = (url) => {
    const ext = url?.split('.').pop().toLowerCase();
    if (['jpg', 'png', 'jpeg'].includes(ext)) return "bg-blue-100 text-blue-700";
    if (ext === 'pdf') return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 ml-0 lg:ml-72 mt-16 transition-all duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Notice Board</h1>
            <p className="text-slate-500 font-medium">Create, edit, and manage institutional announcements.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Total Notices</p>
              <p className="text-xl font-black text-slate-900">{notices.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="xl:col-span-1">
            <form onSubmit={handleCreateNotice} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Plus size={20} className="text-blue-600" /> Post New Notice
              </h2>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Notice Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Notice title..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Attachment</label>
                  <div className="relative group border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 transition-colors text-center cursor-pointer">
                    <input
                      type="file"
                      onChange={(e) => setNewFile(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <UploadCloud className="mx-auto text-slate-400 group-hover:text-blue-500 mb-2" size={32} />
                    <p className="text-sm font-medium text-slate-600 truncate px-2">
                      {newFile ? newFile.name : "Click or drag file"}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Publish Notice"}
                </button>
              </div>
            </form>
          </div>

          {/* List Column */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <th className="p-5">Notice Details</th>
                      <th className="p-5">File</th>
                      <th className="p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {notices.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="p-20 text-center">
                          <div className="flex flex-col items-center opacity-40">
                            <AlertCircle size={48} />
                            <p className="mt-2 font-medium">No notices found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      notices.map((notice) => (
                        <tr key={notice._id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="p-5">
                            <p className="font-bold text-slate-800">{notice.title}</p>
                            <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
                              <Calendar size={12} />
                              {new Date(notice.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="p-5">
                            {notice.fileUrl ? (
                              <a
                                href={notice.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase ${getFileBadge(notice.fileUrl)}`}
                              >
                                <ExternalLink size={10} /> View
                              </a>
                            ) : <span className="text-slate-300 text-xs italic">No file</span>}
                          </td>
                          <td className="p-5 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => { setEditingNotice(notice); setNewTitle(notice.title); }}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit3 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(notice._id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={18} />
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

        {/* Modal */}
        {editingNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setEditingNotice(null)} />
            <div className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl transition-all">
              <button onClick={() => setEditingNotice(null)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X size={20} />
              </button>
              
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Edit3 size={20} className="text-blue-600" /> Edit Notice
              </h2>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Update Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Replace File (Optional)</label>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <input type="file" onChange={(e) => setNewFile(e.target.files[0])} className="text-xs w-full" />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setEditingNotice(null)}
                    className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSave}
                    disabled={loading}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}