import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Target,
  Eye,
  History,
  CheckCircle2,
  Quote,
} from "lucide-react";
import axios from "axios";

const AboutSection = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static data for Why Choose KSC
  const staticWhyChooseUs = [
    {
      title: "Experienced Faculty",
      description:
        "Highly qualified faculty with academic and industry experience, committed to student success.",
    },
    {
      title: "Outcome-Based Education",
      description:
        "Focus on practical learning and skill development to ensure students are ready for global challenges.",
    },
    {
      title: "Modern Infrastructure",
      description:
        "Well-equipped classrooms, libraries, laboratories, and computer facilities for comprehensive learning.",
    },
    {
      title: "Industry Exposure",
      description:
        "Regular industry visits, internships, and workshops to bridge the gap between academics and real-world demands.",
    },
    {
      title: "Student-Centered Environment",
      description:
        "Holistic development through mentoring, counseling, co-curricular, and extracurricular activities.",
    },
    {
      title: "Proven Academic Legacy",
      description:
        "Consistent academic results, university affiliation, and strong alumni network contributing to society.",
    },
  ];

  // Fetch About data
  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/about");
      if (res.data.data) {
        setAbout(res.data.data);
      } else {
        setError("No about data found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch about data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-[#C8A45D]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-bold">
        {error}
      </div>
    );
  }

  if (!about) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-32 py-20">
      {/* ================= HERO ================= */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#3F1536]/90 to-transparent flex items-end p-12">
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter">
            ABOUT <span className="text-[#C8A45D] italic">KSC</span>
          </h1>
        </div>
      </motion.div>

      {/* ================= CHAIRMAN MESSAGE ================= */}
      <section className="grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <span className="text-[#C8A45D] text-xs font-black uppercase tracking-[0.3em]">
            Chairman's Message
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#3F1536]">
            {about.chairmanMessage?.name}
          </h2>
          <p className="text-[#C8A45D] font-bold uppercase tracking-widest">
            {about.chairmanMessage?.designation}
          </p>
          <div className="relative">
            <Quote className="absolute -top-6 -left-6 text-[#C8A45D]/20 w-20 h-20" />
            <p className="text-gray-600 text-lg italic relative z-10">
              "{about.chairmanMessage?.message}"
            </p>
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <img
            src={about.chairmanMessage?.photo}
            alt="Chairman"
            className="rounded-[3rem] shadow-2xl max-w-[350px] border-8 border-white"
          />
        </div>
      </section>

      {/* ================= MISSION / VISION / HISTORY ================= */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Mission", text: about.mission, icon: Target },
          { title: "Vision", text: about.vision, icon: Eye },
          { title: "History", text: about.history, icon: History },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 text-center space-y-4"
          >
            <div className="p-4 bg-gray-50 rounded-2xl inline-block">
              <item.icon size={32} className="text-[#C8A45D]" />
            </div>
            <h3 className="text-2xl font-black text-[#3F1536] uppercase">
              {item.title}
            </h3>
            <p className="text-gray-500">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= CAMPUS CHIEF ================= */}
      <section className="bg-[#3F1536] rounded-[4rem] overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2">
          <img
            src={about.campusChiefMessage?.photo}
            alt="Campus Chief"
            className="w-full h-full object-cover"
          />
          <div className="p-16 space-y-6">
            <h2 className="text-4xl font-black text-white">
              {about.campusChiefMessage?.name}
            </h2>
            <p className="text-[#C8A45D] font-bold uppercase tracking-widest">
              {about.campusChiefMessage?.designation}
            </p>
            <p className="text-white/80 text-lg">
              {about.campusChiefMessage?.message}
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="space-y-16">
        <h2 className="text-center text-5xl font-black text-[#3F1536]">
          WHY <span className="text-[#C8A45D]">CHOOSE KSC?</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticWhyChooseUs.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-8 bg-white rounded-[2rem] shadow-lg flex gap-4"
            >
              <CheckCircle2 className="text-[#C8A45D] w-10 h-10 shrink-0" />
              <div>
                <h3 className="font-black text-[#3F1536] text-xl">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= EXTRA SECTIONS ================= */}
      {about.extraSections?.map((sec, i) => (
        <section
          key={i}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-[#3F1536] border-b-4 border-[#C8A45D] inline-block pb-2">
              {sec.sectionTitle}
            </h2>
            <p className="text-gray-600 text-lg">{sec.content}</p>
          </div>
          <img
            src={sec.image}
            alt=""
            className="rounded-[3rem] shadow-2xl h-[400px] object-cover"
          />
        </section>
      ))}
    </div>
  );
};

export default AboutSection;
