import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1a0f0a]">
      {/* ===== BACKGROUND LAYER ===== */}
      <div className="absolute inset-0 z-0">
        {/* Replace with your actual campus hero image */}
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop" 
          alt="Campus Background" 
          className="w-full h-full object-cover opacity-40"
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3F1536] via-[#3F1536]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10 pt-20">
        <div className="max-w-4xl">
          {/* Small Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8A45D] animate-pulse" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Admissions Open 2025</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8"
          >
            SHAPING <span className="text-[#C8A45D]">LEADERS</span> <br />
            OF TOMORROW.
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 font-medium"
          >
            Kathmandu Shiksha Campus provides a world-class learning environment, 
            combining academic excellence with practical innovation to empower your professional journey.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-6"
          >
            <Link 
              to="/admission"
              className="group flex items-center gap-3 bg-[#C8A45D] text-white px-10 py-5 rounded-sm font-black uppercase tracking-widest text-sm hover:bg-white hover:text-[#3F1536] transition-all duration-500 shadow-2xl shadow-[#C8A45D]/20"
            >
              Start Your Journey
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
            </Link>
            
            <Link 
              to="/about"
              className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-sm font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-500"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Statistics Section (Quick Highlights) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-24 border-t border-white/10 pt-12"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-[#C8A45D]">
                <GraduationCap size={24} />
                <span className="text-3xl font-black text-white">32+</span>
              </div>
              <p className="text-gray-400 uppercase text-[10px] font-black tracking-widest">Years of Excellence</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-[#C8A45D]">
                <Users size={24} />
                <span className="text-3xl font-black text-white">5000+</span>
              </div>
              <p className="text-gray-400 uppercase text-[10px] font-black tracking-widest">Alumni Worldwide</p>
            </div>

            <div className="hidden md:block space-y-2">
              <div className="flex items-center gap-3 text-[#C8A45D]">
                <Trophy size={24} />
                <span className="text-3xl font-black text-white">98%</span>
              </div>
              <p className="text-gray-400 uppercase text-[10px] font-black tracking-widest">Placement Success</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side Decorative Text (Vertical) */}
      <div className="absolute right-10 bottom-24 hidden lg:block overflow-hidden">
        <span className="text-[120px] font-black text-white/[0.03] select-none uppercase transform rotate-90 origin-right inline-block leading-none">
          ESTD 1992
        </span>
      </div>
    </section>
  );
};

export default HeroSection;