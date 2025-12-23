import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Target, Eye, History, CheckCircle2, Quote } from "lucide-react";

const AboutSection = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/about")
      .then((res) => {
        if (res.data.success) {
          setAbout(res.data.data);
        }
      })
      .catch((err) => console.error("About fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-[#3F1536] animate-spin" />
        <p className="text-[#3F1536] font-bold tracking-widest uppercase text-xs">Loading Excellence...</p>
      </div>
    );
  }

  if (!about) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-32 py-20">
      
      {/* ================= HERO BANNER ================= */}
      {about.bannerImage && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <img
            src={about.bannerImage}
            alt="About Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3F1536]/80 to-transparent flex items-end p-12">
            <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter">OUR <span className="text-[#C8A45D] italic">STORY.</span></h1>
          </div>
        </motion.div>
      )}

      {/* ================= CHAIRMAN MESSAGE (Split Editorial) ================= */}
      <section className="grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 order-2 md:order-1 space-y-6">
          <div className="inline-block px-4 py-1 bg-[#C8A45D]/10 rounded-full">
            <span className="text-[#C8A45D] text-[10px] font-black uppercase tracking-[0.3em]">Leadership Voice</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#3F1536] leading-none">
            {about.chairmanMessage?.name}
          </h2>
          <p className="text-lg font-bold text-[#C8A45D] uppercase tracking-widest border-l-4 border-[#C8A45D] pl-4">
            {about.chairmanMessage?.designation}
          </p>
          <div className="relative">
            <Quote className="absolute -top-4 -left-8 text-[#C8A45D]/10 w-20 h-20" />
            <p className="text-gray-600 leading-relaxed text-lg italic relative z-10">
              "{about.chairmanMessage?.message}"
            </p>
          </div>
        </div>

        <div className="md:col-span-5 order-1 md:order-2 flex justify-center relative">
          <div className="absolute inset-0 bg-[#C8A45D] rounded-[3rem] rotate-6 scale-95 opacity-20" />
          <img
            src={about.chairmanMessage?.photo}
            alt="Chairman"
            className="w-full max-w-[350px] aspect-square rounded-[3rem] object-cover shadow-2xl relative z-10 border-8 border-white"
          />
        </div>
      </section>

      {/* ================= MISSION / VISION / HISTORY (Triptych) ================= */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Mission", text: about.mission, icon: Target, color: "#3F1536" },
          { title: "Vision", text: about.vision, icon: Eye, color: "#C8A45D" },
          { title: "History", text: about.history, icon: History, color: "#3F1536" }
        ].map((item, i) => (
          <motion.div 
            whileHover={{ y: -10 }}
            key={i} 
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-4"
          >
            <div className="p-4 rounded-2xl bg-gray-50 text-[#C8A45D]">
              <item.icon size={32} />
            </div>
            <h3 className="text-2xl font-black text-[#3F1536] uppercase tracking-tighter">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= CAMPUS CHIEF (Alternative Layout) ================= */}
      <section className="bg-[#3F1536] rounded-[4rem] overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2">
          <div className="h-[400px] md:h-auto">
             <img
                src={about.campusChiefMessage?.photo}
                alt="Campus Chief"
                className="w-full h-full object-cover"
              />
          </div>
          <div className="p-12 md:p-20 space-y-6 flex flex-col justify-center">
            <h2 className="text-4xl font-black text-white">
              {about.campusChiefMessage?.name}
            </h2>
            <p className="text-[#C8A45D] font-bold uppercase tracking-widest text-sm">
              {about.campusChiefMessage?.designation}
            </p>
            <p className="text-white/70 leading-relaxed text-lg">
              {about.campusChiefMessage?.message}
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US (Grid) ================= */}
      {about.whyChooseUs?.length > 0 && (
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-[#3F1536] tracking-tighter">WHY <span className="text-[#C8A45D]">CHOOSE US?</span></h2>
            <div className="h-1.5 w-24 bg-[#C8A45D] mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="group p-8 bg-white border border-gray-100 rounded-[2rem] shadow-lg shadow-gray-200/50 flex gap-6"
              >
                <div className="shrink-0">
                   {item.icon ? (
                      <img src={item.icon} alt="" className="w-12 h-12 object-contain" />
                   ) : (
                      <CheckCircle2 className="text-[#C8A45D] w-12 h-12" />
                   )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#3F1536] group-hover:text-[#C8A45D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ================= EXTRA SECTIONS ================= */}
      {about.extraSections?.map((sec, index) => (
        <motion.section
          key={index}
          className={`grid md:grid-cols-2 gap-20 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
        >
          <div className={`${index % 2 !== 0 ? 'md:order-2' : ''} space-y-6`}>
            <h2 className="text-4xl font-black text-[#3F1536] tracking-tight border-b-4 border-[#C8A45D] inline-block pb-2">
              {sec.sectionTitle}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">{sec.content}</p>
          </div>

          <div className={`${index % 2 !== 0 ? 'md:order-1' : ''}`}>
            {sec.image && (
              <img
                src={sec.image}
                alt=""
                className="rounded-[3rem] shadow-2xl object-cover w-full h-[400px]"
              />
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default AboutSection;