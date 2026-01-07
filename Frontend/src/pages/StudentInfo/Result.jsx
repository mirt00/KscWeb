

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Search, Filter, Download, Calendar, BookOpen, GraduationCap, FileText } from "lucide-react";
import Header from "../../components/common/Header";
import { motion } from "framer-motion";


const API = "http://localhost:5000/api/result";

const Result = () => {
  const [grade, setGrade] = useState("All");
  const [stream, setStream] = useState("All");
  const [year, setYear] = useState("All");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResults = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API);
      if (!res.data.success) throw new Error(res.data.message || "Failed to fetch results");

      const data = (res.data?.data || []).map((item) => ({
        id: item._id,
        title: item.title || "Untitled",
        grade: item.faculty === "Education" ? "XI" : "XII",
        stream: item.faculty || "N/A",
        year: item.year || "N/A",
        url: item.resultImage?.url || "https://via.placeholder.com/400x300",
      }));
      setResults(data);
    } catch (err) {
      
      setError("Unable to retrieve examination results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResults(); }, []);

  const filteredResults = results.filter((res) => {
    return (
      (grade === "All" || res.grade === grade) &&
      (stream === "All" || res.stream === stream) &&
      (year === "All" || res.year === year)
    );
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />
      
      {/* ===== HERO HEADER ===== */}
      <div className="bg-[#3F1536] pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
          <FileText size={400} className="text-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8A45D]/20 rounded-full border border-[#C8A45D]/30 mb-6"
          >
            <BookOpen size={16} className="text-[#C8A45D]" />
            <span className="text-[#C8A45D] text-xs font-black uppercase tracking-[0.2em]">Academic Portal</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4"
          >
            EXAMINATION <span className="text-[#C8A45D]">RESULTS</span>
          </motion.h1>
          <p className="text-white/70 max-w-2xl text-lg">
            Access and download the latest academic performance sheets and board examination results across all streams.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 pb-20">
        
        {/* ===== SEARCH & FILTER BAR ===== */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 p-4 md:p-8 border border-gray-100 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 ml-2">
                <GraduationCap size={14} /> Grade
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[#3F1536] font-bold focus:ring-2 focus:ring-[#C8A45D] transition-all"
              >
                <option value="All">All Grades</option>
                <option value="XI">Grade XI</option>
                <option value="XII">Grade XII</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 ml-2">
                <Filter size={14} /> Stream
              </label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[#3F1536] font-bold focus:ring-2 focus:ring-[#C8A45D] transition-all"
              >
                <option value="All">All Streams</option>
                <option value="Education">Education</option>
                <option value="Management">Management</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 ml-2">
                <Calendar size={14} /> Academic Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-[#3F1536] font-bold focus:ring-2 focus:ring-[#C8A45D] transition-all"
              >
                <option value="All">All Years</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchResults}
                className="w-full bg-[#3F1536] hover:bg-[#2D0F27] text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3F1536]/20"
              >
                <Search size={18} /> Refresh Records
              </button>
            </div>
          </div>
        </div>

        {/* ===== RESULTS DISPLAY ===== */}
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#3F1536] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#3F1536] font-black animate-pulse">Fetching records...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl">
            <p className="text-red-700 font-bold">{error}</p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-300">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-500">No results found for these filters.</h3>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence>
              {filteredResults.map((res, idx) => (
                <motion.div
                  key={res.id || idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: (idx % 3) * 0.1 }}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl hover:shadow-[#3F1536]/10 transition-all duration-500"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={res.url}
                      alt={res.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-[#3F1536]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                       <a 
                        href={res.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-4 bg-white rounded-full text-[#3F1536] hover:bg-[#C8A45D] hover:text-white transition-colors"
                       >
                         <Download size={24} />
                       </a>
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 bg-[#C8A45D] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {res.year}
                    </div>
                  </div>

                  <div className="p-8 text-center">
                    <h3 className="text-xl font-black text-[#3F1536] mb-4 group-hover:text-[#C8A45D] transition-colors">
                      {res.title}
                    </h3>
                    <div className="flex items-center justify-center gap-4 border-t border-gray-50 pt-4">
                      <div className="text-center px-4">
                        <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Grade</span>
                        <span className="text-[#3F1536] font-black">{res.grade}</span>
                      </div>
                      <div className="h-8 w-px bg-gray-100" />
                      <div className="text-center px-4">
                        <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Stream</span>
                        <span className="text-[#3F1536] font-black">{res.stream}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Result;