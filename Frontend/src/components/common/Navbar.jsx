import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitors scroll position to trigger the glass effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Admission", href: "/admission" },
    { name: "Notices", href: "/notices" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-[100] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-[#3F1536]/90 backdrop-blur-md py-3 shadow-2xl" 
          : "bg-[#3F1536] py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center">
          
          {/* --- LOGO SECTION --- */}
          <a href="/" className="flex items-center gap-4 group">
            <div className="relative">
              {/* Gold Square Icon */}
              <div className="h-11 w-11 bg-[#C8A45D] rounded-br-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                <span className="text-white font-serif text-2xl font-black italic">K</span>
              </div>
              {/* Soft Glow behind icon */}
              <div className="absolute inset-0 bg-[#C8A45D] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
            
            <div className="flex flex-col border-l border-white/20 pl-4">
              <span className="text-white font-black tracking-[0.15em] leading-none text-xl sm:text-2xl">
                KATHMANDU
              </span>
              <span className="text-[#C8A45D] text-[9px] font-bold tracking-[0.4em] mt-1 uppercase">
                Shiksha Campus
              </span>
            </div>
          </a>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-white/70 hover:text-[#C8A45D] text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group"
              >
                {link.name}
                {/* Hover Underline Animation */}
                <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#C8A45D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}

            {/* Premium CTA Button */}
            <a
              href="/admission"
              className="ml-6 px-8 py-3 bg-[#C8A45D] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#b39250] transition-all shadow-[0_10px_20px_rgba(200,164,93,0.2)] active:scale-95"
            >
              Apply Now
            </a>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button 
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      <div 
        className={`lg:hidden fixed inset-0 top-[72px] bg-[#3F1536] transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/90 text-2xl font-black tracking-tighter border-b border-white/10 pb-4 flex justify-between items-center group"
            >
              {link.name}
              <ChevronDown className="-rotate-90 text-[#C8A45D] opacity-0 group-hover:opacity-100 transition-all" size={20} />
            </a>
          ))}
          <a
            href="/admission"
            className="mt-4 w-full bg-[#C8A45D] text-white py-5 text-center font-black uppercase tracking-widest text-xs rounded-xl"
          >
            Start Admission
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;