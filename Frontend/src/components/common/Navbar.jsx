import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LogoContext } from "../../context/LogoContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logo } = useContext(LogoContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Results & Placement", href: "/results-placement" },
    { name: "Admission", href: "/admission" },
    { name: "Notices", href: "/notices" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-[#3F1536]/98 backdrop-blur-xl py-3 shadow-2xl"
          : "bg-[#3F1536] py-6"
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          
          {/* ===== LOGO & BRAND SECTION ===== */}
          <Link to="/" className="flex items-center gap-6 group shrink-0">
            {/* UPDATED LOGO CONTAINER:
                1. Removed p-3 so the logo can touch the edges.
                2. Added overflow-hidden to crop the image into a perfect circle.
                3. Added a very subtle border to define the shape.
            */}
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-2xl border-2 border-white/10 transition-transform duration-500 group-hover:scale-105">
              {logo ? (
                <img
                  src={logo}
                  alt="Campus Logo"
                  /* object-cover ensures the logo fills the entire circle area perfectly */
                  className="w-full h-full object-cover scale-[1.2]" 
                />
              ) : (
                <div className="text-[#3F1536] font-black text-3xl">K</div>
              )}
            </div>

            <div className="flex flex-col justify-center border-l-2 border-white/20 pl-6">
              <span className="text-white font-black tracking-tight text-3xl md:text-4xl uppercase leading-none">
                KATHMANDU
              </span>
              <span className="text-[#C8A45D] font-black tracking-normal text-[1.4rem] md:text-[1.8rem] uppercase mt-1 leading-none">
                SHIKSHA CAMPUS
              </span>
            </div>
          </Link>

          {/* ===== NAVIGATION & CTA SECTION ===== */}
          <div className="hidden xl:flex items-center gap-8">
            <div className="flex items-center gap-4 mr-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) => `
                    px-3 py-2 text-[15px] font-extrabold uppercase tracking-wider relative transition-all duration-300
                    ${isActive ? "text-[#C8A45D]" : "text-white/80 hover:text-white"}
                  `}
                >
                  {({ isActive }) => (
                    <span className="relative">
                      {link.name}
                      <span 
                        className={`absolute -bottom-2 left-0 h-[3px] bg-[#C8A45D] transition-all duration-300 
                        ${isActive ? "w-full" : "w-0 opacity-0"}`}
                      ></span>
                    </span>
                  )}
                </NavLink>
              ))}
            </div>

            <Link
              to="/admission"
              className="px-8 py-3.5 bg-[#C8A45D] text-white text-[12px] font-black uppercase tracking-widest rounded-md hover:bg-white hover:text-[#3F1536] transition-all duration-300 shadow-lg active:scale-95"
            >
              Apply Now
            </Link>
          </div>

          {/* ===== MOBILE MENU BUTTON ===== */}
          <button
            className="xl:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={36} /> : <Menu size={36} />}
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div
        className={`xl:hidden fixed inset-0 bg-[#3F1536] z-[200] transition-transform duration-500 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-10 pt-24 gap-6">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-white"><X size={40}/></button>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black text-white uppercase border-b border-white/10 pb-4"
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;