// src/components/Navbar.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LogoContext } from "../../context/LogoContext"; // ✅ import LogoContext

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Optional: dark mode toggle
  const menuRef = useRef();

  // ✅ Access logo from context
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

  // ✅ Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Optional: toggle dark mode on mount/update
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav
      className={`backdrop-blur-md fixed w-full top-0 left-0 z-50 border-b shadow-md transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white/90 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ✅ Admin Logo / Campus Name */}
          <Link to="/" className="flex items-center">
            {logo ? (
              <img
                src={logo}
                alt="Admin Logo"
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-lg sm:text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors duration-200">
                Kathmandu Shiksha Campus
              </span>
            )}
          </Link>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-10 items-center">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative pb-1 text-[15px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-700"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* ✅ Optional Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <span className="text-yellow-400">☀️</span>
              ) : (
                <span className="text-gray-800">🌙</span>
              )}
            </button>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      <div
        ref={menuRef}
        className={`md:hidden bg-white border-t shadow-md dark:bg-gray-900 dark:border-gray-700 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block px-4 py-3 text-blue-700 font-semibold bg-blue-50 border-b border-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:border-gray-700"
                : "block px-4 py-3 text-gray-700 hover:bg-gray-100 border-b border-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 transition"
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
