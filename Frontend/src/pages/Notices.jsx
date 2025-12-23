import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { FileText, Calendar, ExternalLink, Bell } from "lucide-react";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/notice");
        setNotices(res.data.notices || []);
      } catch (err) {
        console.error("Error fetching notices:", err);
        setError("Unable to connect to the notice board. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const handleOpenNotice = (fileUrl) => {
    if (!fileUrl) return;
    const extension = fileUrl.split('.').pop().toLowerCase();
    const officeExtensions = ["doc", "docx", "ppt", "pptx", "xls", "xlsx"];
    let finalUrl = fileUrl;
    if (officeExtensions.includes(extension)) {
      finalUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`;
    }
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FDF4F9]/30 pt-32 pb-20">
        <section className="container mx-auto px-4 sm:px-6 lg:px-16">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4">
               <div className="h-px w-8 bg-[#C8A45D]"></div>
               <Bell className="text-[#C8A45D]" size={20} />
               <div className="h-px w-8 bg-[#C8A45D]"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#3F1536] uppercase tracking-tighter mb-4">
              Campus <span className="text-[#C8A45D]">Notices</span>
            </h1>
            <p className="text-[#9B708F] font-bold uppercase tracking-[0.2em] text-xs">
              Official Announcements & Updates
            </p>
          </div>

          {/* Notices Container */}
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3F1536]"></div>
                <p className="mt-4 text-[#3F1536]/60 font-black uppercase text-xs tracking-widest">Accessing Board...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl text-center">
                <p className="text-red-700 font-bold">{error}</p>
              </div>
            ) : notices.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-[#3F1536]/5 shadow-sm">
                <FileText className="mx-auto text-[#3F1536]/10 mb-4" size={64} />
                <p className="text-[#3F1536]/40 font-black uppercase tracking-widest">No Active Notices</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {notices.map((notice) => {
                  const postDate = new Date(notice.createdAt);
                  return (
                    <div
                      key={notice._id}
                      className="group bg-white rounded-[2rem] border border-slate-100 p-8 hover:border-[#C8A45D]/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#3F1536]/5 flex flex-col relative overflow-hidden"
                    >
                      {/* Decorative Corner Shade */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FDF4F9] rounded-bl-[4rem] -mr-12 -mt-12 group-hover:bg-[#C8A45D]/10 transition-colors"></div>

                      <div className="mb-6 flex items-start justify-between relative z-10">
                        {/* Date Badge */}
                        <div className="bg-[#3F1536] text-white rounded-2xl p-3 flex flex-col items-center min-w-[60px] shadow-lg shadow-[#3F1536]/20">
                          <span className="text-lg font-black leading-none">{postDate.getDate()}</span>
                          <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">
                            {postDate.toLocaleString('default', { month: 'short' })}
                          </span>
                        </div>
                        <Calendar className="text-[#C8A45D]/40" size={20} />
                      </div>

                      <div className="grow relative z-10">
                        <h3 className="text-xl font-black text-[#3F1536] mb-4 leading-tight group-hover:text-[#C8A45D] transition-colors line-clamp-2">
                          {notice.title}
                        </h3>
                        <p className="text-[#9B708F] text-xs font-bold uppercase tracking-widest mb-8">
                          Year: {postDate.getFullYear()}
                        </p>
                      </div>

                      {notice.fileUrl && (
                        <button
                          onClick={() => handleOpenNotice(notice.fileUrl)}
                          className="w-full flex items-center justify-center gap-3 bg-[#FDF4F9] text-[#3F1536] px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#3F1536] hover:text-[#C8A45D] transition-all duration-300 group/btn shadow-inner"
                        >
                          <FileText size={16} />
                          View Document
                          <ExternalLink size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Notices;