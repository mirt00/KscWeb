import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Search, Filter, X, FileText, Download, 
  CheckCircle2, XCircle, Clock, Eye, Printer, ChevronRight, 
  User, GraduationCap, Phone, MapPin, Calendar
} from "lucide-react";

const AdmissionAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const API_BASE = "http://localhost:5000";

  // --- API Calls (Same as before) ---
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/admission`);
      setApplications(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicationById = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/api/admission/${id}`);
      setSelectedApp(res.data.data);
      setStatus(res.data.data.status);
    } catch (error) {
      alert("Error loading details");
    }
  };

  const updateStatus = async (id) => {
    try {
      await axios.put(`${API_BASE}/api/admission/${id}/status`, { status });
      setApplications(prev => prev.map(app => app._id === id ? { ...app, status } : app));
      alert("Status Updated"); // Optional: Replace with toast
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const filteredApps = applications.filter(app => 
    app.studentInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.contactDetails.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Components ---

  const StatusBadge = ({ status, size = "normal" }) => {
    const styles = {
      Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Rejected: "bg-rose-100 text-rose-700 border-rose-200",
      Pending: "bg-amber-100 text-amber-700 border-amber-200",
      Reviewed: "bg-blue-100 text-blue-700 border-blue-200",
    };
    const icons = {
      Approved: <CheckCircle2 size={size === "lg" ? 18 : 12} />,
      Rejected: <XCircle size={size === "lg" ? 18 : 12} />,
      Pending: <Clock size={size === "lg" ? 18 : 12} />,
      Reviewed: <Eye size={size === "lg" ? 18 : 12} />,
    };

    return (
      <span className={`flex items-center gap-2 w-fit rounded-full font-bold border ${styles[status] || styles.Pending} ${size === "lg" ? "px-4 py-1.5 text-sm" : "px-2.5 py-0.5 text-xs"}`}>
        {icons[status] || icons.Pending}
        {status || "Pending"}
      </span>
    );
  };

  const DocumentCard = ({ path, label }) => {
    if (!path) return null;
    const fullUrl = path.startsWith("http") ? path : `${API_BASE}/${path}`;
    return (
      <div className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 hover:shadow-lg transition-all duration-300">
        <div className="aspect-[3/2] overflow-hidden bg-slate-200">
           <img src={fullUrl} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="p-3 bg-white border-t border-slate-100 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-600 truncate max-w-[120px]">{label}</span>
          <a href={fullUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-full transition-colors">
            <Eye size={14} />
          </a>
        </div>
      </div>
    );
  };

  return (
    // MAIN LAYOUT FIX: Added ml-0 lg:ml-72 to push content right, respecting the sidebar
    <div className="min-h-screen bg-[#F8FAFC] p-6 transition-all duration-300 ml-0 lg:ml-72 mt-20">
      
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Applications</h1>
            <p className="text-slate-500 font-medium">Review incoming student requests and documents.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-64 md:w-80 bg-transparent text-sm font-medium focus:outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <button className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-[1.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-medium">Syncing data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400 font-bold">
                  <th className="px-8 py-5">Candidate</th>
                  <th className="px-6 py-5">Stream</th>
                  <th className="px-6 py-5">SEE GPA</th>
                  <th className="px-6 py-5">Applied Date</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredApps.map((app) => (
                  <tr key={app._id} className="hover:bg-blue-50/40 transition-colors group cursor-pointer" onClick={() => fetchApplicationById(app._id)}>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-200">
                          {app.studentInfo.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{app.studentInfo.fullName}</div>
                          <div className="text-xs text-slate-500 font-medium">{app.contactDetails.mobileNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        {app.streamInfo.stream}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-mono font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded w-fit">{app.academicInfo.gpaOrGrade}</div>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-slate-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-slate-300 hover:text-blue-600 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* NEW: Comfort View - Wide Modal Layout */}
      {selectedApp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedApp(null)}
          />
          
          {/* Main Modal Container */}
          <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* 1. Modal Header (Sticky) */}
            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-slate-800">Application Review</h2>
                <div className="h-4 w-px bg-slate-300 mx-2"></div>
                <span className="text-sm text-slate-500 font-mono">ID: #{selectedApp._id.slice(-6)}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                  <Printer size={20} />
                </button>
                <button onClick={() => setSelectedApp(null)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* 2. Modal Body - Split View */}
            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              
              {/* LEFT COLUMN: Profile Summary (Fixed Width) */}
              <div className="w-full md:w-80 bg-slate-50/80 border-r border-slate-100 p-6 overflow-y-auto shrink-0">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg mb-4 flex items-center justify-center text-3xl font-black text-blue-600">
                    {selectedApp.studentInfo.fullName.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{selectedApp.studentInfo.fullName}</h3>
                  <p className="text-sm text-slate-500 mt-1">{selectedApp.contactDetails.email}</p>
                  <div className="mt-4">
                     <StatusBadge status={status || selectedApp.status} size="lg" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Action</label>
                    <select 
                      value={status} 
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full mb-3 bg-slate-50 border border-slate-200 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 font-medium"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Processing</option>
                      <option value="Approved">Approve Student</option>
                      <option value="Rejected">Reject Student</option>
                    </select>
                    <button 
                      onClick={() => updateStatus(selectedApp._id)}
                      className="w-full py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-all shadow-md"
                    >
                      Update Status
                    </button>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                       <Phone size={16} className="text-slate-400" />
                       <span>{selectedApp.contactDetails.mobileNumber}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                       <MapPin size={16} className="text-slate-400" />
                       <span className="truncate">{selectedApp.contactDetails.permanentAddress}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                       <Calendar size={16} className="text-slate-400" />
                       <span>{new Date(selectedApp.studentInfo.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Detailed Info (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
                
                {/* Section: Academic */}
                <div className="mb-10">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
                    <GraduationCap size={18} className="text-blue-600" /> 
                    Academic Record
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Applying For</p>
                      <p className="text-lg font-bold text-blue-700">{selectedApp.streamInfo.stream}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <p className="text-xs text-slate-400 font-bold uppercase mb-1">GPA Scored</p>
                       <p className="text-lg font-bold text-slate-900">{selectedApp.academicInfo.gpaOrGrade}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Previous School</p>
                      <p className="font-medium text-slate-700">{selectedApp.academicInfo.schoolName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Board</p>
                      <p className="font-medium text-slate-700">{selectedApp.academicInfo.seeBoard}</p>
                    </div>
                  </div>
                </div>

                {/* Section: Guardian */}
                <div className="mb-10">
                   <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
                    <User size={18} className="text-blue-600" /> 
                    Guardian Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Father's Name</p>
                      <p className="font-medium text-slate-700">{selectedApp.guardianInfo.fatherName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Mother's Name</p>
                      <p className="font-medium text-slate-700">{selectedApp.guardianInfo.motherName}</p>
                    </div>
                     <div>
                      <p className="text-xs text-slate-400 font-bold uppercase mb-1">Emergency Contact</p>
                      <p className="font-bold text-slate-700">{selectedApp.guardianInfo.contactNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Section: Documents */}
                <div>
                   <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
                      <FileText size={18} className="text-blue-600" /> 
                      Documents
                    </h4>
                    <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                      <Download size={14} /> Download All
                    </button>
                   </div>
                   
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <DocumentCard path={selectedApp.documents.seeMarksheet} label="SEE Marksheet" />
                      <DocumentCard path={selectedApp.documents.birthOrCitizenship} label="Citizenship" />
                      <DocumentCard path={selectedApp.documents.characterCertificate} label="Character Cert." />
                      {selectedApp.documents.passportPhotos?.map((img, idx) => (
                        <DocumentCard key={idx} path={img} label={`Photo ${idx + 1}`} />
                      ))}
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionAdmin;