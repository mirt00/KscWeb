import React, { useEffect, useState } from "react";
import axios from "axios";

const AdmissionAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [status, setStatus] = useState("");

  const API_BASE = "http://localhost:5000"; // Adjust to your backend URL

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/admission`);
      setApplications(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
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
      alert("Status updated successfully!");
      fetchApplications();
      setSelectedApp(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  // Professional helper to render images from your document object
  const FilePreview = ({ path, label }) => {
    if (!path) return null;
    const fullUrl = path.startsWith("http") ? path : `${API_BASE}/${path}`;
    return (
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
        <div className="relative group w-full h-32 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <img src={fullUrl} alt={label} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
          <a href={fullUrl} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs">View Full</a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admission Management</h1>
            <p className="text-slate-500 mt-1">Review and process student applications</p>
          </div>
          <button onClick={fetchApplications} className="bg-white border shadow-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Refresh List</button>
        </header>

        {/* APPLICATIONS TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-widest border-b">
                <th className="px-6 py-4 font-semibold">Student & Stream</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Academic (SEE)</th>
                <th className="px-6 py-4 font-semibold">Date Applied</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{app.studentInfo.fullName}</div>
                    <div className="text-xs text-indigo-600 font-medium">{app.streamInfo.stream}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div>{app.contactDetails.mobileNumber}</div>
                    <div className="text-xs text-slate-400">{app.contactDetails.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-mono text-xs uppercase">{app.academicInfo.gpaOrGrade} GPA</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                      app.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => fetchApplicationById(app._id)} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition shadow-sm">Review Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL DETAIL MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedApp.studentInfo.fullName}</h2>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-tighter">ID: {selectedApp._id}</span>
              </div>
              <button onClick={() => setSelectedApp(null)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors text-2xl">&times;</button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Section 1: Personal & Guardian */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 border-b pb-2">Student Profile</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><label className="block text-[11px] text-slate-400 uppercase">DOB</label><p className="font-medium">{new Date(selectedApp.studentInfo.dateOfBirth).toDateString()}</p></div>
                      <div><label className="block text-[11px] text-slate-400 uppercase">Gender</label><p className="font-medium">{selectedApp.studentInfo.gender}</p></div>
                      <div><label className="block text-[11px] text-slate-400 uppercase">Nationality</label><p className="font-medium">{selectedApp.studentInfo.nationality}</p></div>
                      <div><label className="block text-[11px] text-slate-400 uppercase">Religion</label><p className="font-medium">{selectedApp.studentInfo.religion || 'N/A'}</p></div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-[11px] text-slate-400 uppercase">Permanent Address</label>
                      <p className="text-sm font-medium">{selectedApp.contactDetails.permanentAddress}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 border-b pb-2">Guardian Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Father's Name</span>
                        <span className="font-medium">{selectedApp.guardianInfo.fatherName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Mother's Name</span>
                        <span className="font-medium">{selectedApp.guardianInfo.motherName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Occupation</span>
                        <span className="font-medium">{selectedApp.guardianInfo.occupation || 'N/A'}</span>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg mt-2">
                        <label className="block text-[10px] text-indigo-400 uppercase font-bold">Guardian Contact</label>
                        <p className="text-indigo-900 font-bold">{selectedApp.guardianInfo.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Academic Info */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 border-b pb-2">Academic Record (SEE)</h3>
                    <div className="bg-slate-50 p-4 rounded-xl space-y-3 text-sm">
                      <p className="flex justify-between"><span className="text-slate-500">Previous School</span><span className="font-bold">{selectedApp.academicInfo.schoolName}</span></p>
                      <p className="flex justify-between"><span className="text-slate-500">Board</span><span className="font-medium">{selectedApp.academicInfo.seeBoard}</span></p>
                      <p className="flex justify-between"><span className="text-slate-500">Symbol No</span><span className="font-mono">{selectedApp.academicInfo.symbolNumber}</span></p>
                      <p className="flex justify-between"><span className="text-slate-500">Passed Year</span><span className="font-medium">{selectedApp.academicInfo.yearOfPassing}</span></p>
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="text-slate-500 font-bold">Final GPA</span>
                        <span className="text-2xl font-black text-indigo-600">{selectedApp.academicInfo.gpaOrGrade}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 border-b pb-2">Applied Stream</h3>
                    <div className="bg-indigo-600 text-white p-4 rounded-xl">
                      <p className="text-xs opacity-80 uppercase font-bold">Selected Course</p>
                      <p className="text-xl font-bold">{selectedApp.streamInfo.stream}</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Document Images */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2 border-b pb-2">Documents & Uploads</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FilePreview path={selectedApp.documents.seeMarksheet} label="SEE Marksheet" />
                    <FilePreview path={selectedApp.documents.birthOrCitizenship} label="Citizenship / Birth" />
                    <FilePreview path={selectedApp.declaration.studentSignature} label="Student Signature" />
                    {/* Passport Photos Array */}
                    {selectedApp.documents.passportPhotos?.map((img, idx) => (
                      <FilePreview key={idx} path={img} label={`Passport Photo ${idx + 1}`} />
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer (Action Bar) */}
            <div className="p-6 bg-slate-50 border-t flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-700">Set Status:</span>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-white border-slate-200 border rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button onClick={() => updateStatus(selectedApp._id)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition">Update Status</button>
              </div>
              <div className="flex gap-4">
                <button onClick={() => window.print()} className="text-slate-500 text-sm hover:underline">Print PDF</button>
                <button onClick={() => setSelectedApp(null)} className="text-slate-400 text-sm">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionAdmin;