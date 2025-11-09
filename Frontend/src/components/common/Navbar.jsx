// src/components/Navbar.jsx
import React, { useState, useRef, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LogoContext } from "../../context/LogoContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const { logo } = useContext(LogoContext);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/academics", label: "Academics" },
    { path: "/admission", label: "Admission" },
    { path: "/results-placement", label: "Results & Placement" },
    { path: "/notices", label: "Notices" },
    { path: "/contact", label: "Contact Us" },
  ];

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-lg border-b">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Campus Name */}
          <Link to="/" className="flex items-center space-x-3">
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            ) : (
              <span className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition">
                Kathmandu Shiksha Campus
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative font-medium text-[16px] transition-colors duration-200 ${
                    isActive
                      ? "text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-700"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        ref={menuRef}
        className={`md:hidden bg-white border-t shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-6 py-4 font-medium border-b border-gray-100 transition ${
                isActive
                  ? "text-blue-700 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
