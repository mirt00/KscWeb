import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    // Updated to a deep, professional charcoal-black
    <footer className="bg-[#0F0F0F] text-white pt-24 pb-16 relative overflow-hidden">
      
      {/* ===== PROFESSIONAL ANIMATED GRADIENTS ===== */}
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          x: [0, 30, 0] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-24 -left-24 w-full h-[500px] bg-[#C8A45D]/20 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Column 1: Brand - Increased Sizes */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-white mb-2 leading-none">
                KATHMANDU
              </h2>
              <h2 className="text-[#C8A45D] text-2xl font-black tracking-wide uppercase leading-none">
                SHIKSHA CAMPUS
              </h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed font-medium">
              A legacy of academic brilliance, shaping global professionals through 
              innovation and traditional values since 1992.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#C8A45D] hover:border-[#C8A45D] transition-all duration-500 group">
                  <Icon size={20} className="text-white group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Links - Bold & Clear */}
          <div className="space-y-10">
            <h4 className="text-white text-sm font-black uppercase tracking-[0.3em] border-l-4 border-[#C8A45D] pl-4">Useful Links</h4>
            <ul className="space-y-5">
              {['Home', 'About Us', 'Academics', 'Results', 'Placement'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-300 hover:text-[#C8A45D] text-[18px] font-bold transition-all duration-300 flex items-center gap-3 group">
                    <span className="w-2 h-[2px] bg-[#C8A45D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Portals - Removed Student Login */}
          <div className="space-y-10">
            <h4 className="text-white text-sm font-black uppercase tracking-[0.3em] border-l-4 border-[#C8A45D] pl-4">Portals</h4>
            <ul className="space-y-5">
              {['Online Admission', 'Notices', 'E-Library'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-300 hover:text-[#C8A45D] text-[18px] font-bold transition-all duration-300 flex items-center gap-3 group">
                    <span className="w-2 h-[2px] bg-[#C8A45D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact - High Contrast Shading */}
          <div className="bg-white/[0.05] border-2 border-white/10 p-10 rounded-[2.5rem] space-y-8 shadow-2xl">
            <h4 className="text-[#C8A45D] text-sm font-black uppercase tracking-[0.3em]">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex gap-5">
                <FaMapMarkerAlt className="text-[#C8A45D] shrink-0 mt-1" size={20} />
                <span className="text-white text-md font-bold leading-snug">Bafal, Kathmandu,<br />Bagmati, Nepal</span>
              </div>
              <div className="flex gap-5 items-center">
                <FaPhoneAlt className="text-[#C8A45D] shrink-0" size={20} />
                <span className="text-white text-md font-bold">+977-1-4XXXXXX</span>
              </div>
              <div className="flex gap-5 items-center">
                <FaEnvelope className="text-[#C8A45D] shrink-0" size={20} />
                <span className="text-white text-md font-bold">info@ksc.edu.np</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM BAR - BIG & READABLE ===== */}
        <div className="pt-12 border-t-2 border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-white text-[18px] font-black uppercase tracking-tight">
            © 2025 <span className="text-[#C8A45D]">KATHMANDU SHIKSHA CAMPUS</span>
          </p>
          
          <div className="flex gap-12">
            <Link to="#" className="text-white hover:text-[#C8A45D] text-[16px] font-black uppercase tracking-widest transition-colors border-b-2 border-transparent hover:border-[#C8A45D]">
              Privacy Policy
            </Link>
            <Link to="#" className="text-white hover:text-[#C8A45D] text-[16px] font-black uppercase tracking-widest transition-colors border-b-2 border-transparent hover:border-[#C8A45D]">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;