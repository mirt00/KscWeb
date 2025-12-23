import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import StudentCard from "../../components/common/StudentCard";
import { Loader2, Sparkles, Globe2, Award, GraduationCap } from "lucide-react";

const Placement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlacements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/placement");
      if (res.data?.success) {
        setStudents(res.data.placements);
      }
    } catch (err) {
      console.error(err.message);
      setError("Unable to load placement data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#3F1536] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-24">
      
      {/* ===== MATCHED HERO SECTION (Same as Result Page Structure) ===== */}
      <div className="bg-[#3F1536] pt-12 pb-24 relative overflow-hidden rounded-b-[4rem] shadow-2xl">
        {/* Large Decorative Icon Background */}
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none">
          <GraduationCap size={500} className="text-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8A45D]/20 rounded-full border border-[#C8A45D]/30 mb-8"
          >
            <Sparkles size={16} className="text-[#C8A45D]" />
            <span className="text-[#C8A45D] text-[10px] font-black uppercase tracking-[0.3em]">Success Records</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]"
              >
                OUR GLOBAL <br />
                <span className="text-[#C8A45D] italic">ALUMNI.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-white/70 text-lg md:text-xl font-medium max-w-xl leading-relaxed"
              >
                Celebrating the professional journey of our students who are making an impact in leading organizations worldwide.
              </motion.p>
            </div>

            {/* Quick Stats in Hero */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex gap-12"
            >
              <div>
                <div className="text-4xl font-black text-[#C8A45D]">{students.length}+</div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Placements</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-4xl font-black text-[#C8A45D]">95%</div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Success Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== STUDENT GRID SECTION ===== */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-gray-200/50 border border-gray-100">
          {error ? (
            <div className="p-12 text-center text-red-500 font-bold">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              <AnimatePresence>
                {students.map((student, idx) => (
                  <motion.div
                    key={student._id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx % 4) * 0.1 }}
                  >
                    <StudentCard student={student} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* ===== THE "PRIDE" STATEMENT SECTION ===== */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="relative py-32 bg-[#3F1536] rounded-[4rem] overflow-hidden shadow-2xl">
          
          {/* LARGE BACKGROUND "PRIDE" */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
            <span className="text-[15rem] md:text-[25rem] font-black text-white tracking-[2rem]">
              PRIDE
            </span>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-20 md:gap-40 px-10">
            <div className="text-center group">
              <Globe2 className="text-[#C8A45D] mx-auto mb-6 opacity-50" size={40} />
              <h4 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
                {students.length}<span className="text-[#C8A45D]">+</span>
              </h4>
              <p className="text-[#C8A45D] font-bold uppercase text-[10px] tracking-[0.5em]">
                Global Footprint
              </p>
            </div>

            <div className="text-center group">
              <Award className="text-[#C8A45D] mx-auto mb-6 opacity-50" size={40} />
              <h4 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
                95<span className="text-[#C8A45D]">%</span>
              </h4>
              <p className="text-[#C8A45D] font-bold uppercase text-[10px] tracking-[0.5em]">
                Excellence Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placement;