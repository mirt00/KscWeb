import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaUniversity,
  FaUserGraduate,
  FaFileAlt,
  FaBullhorn,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaBars,
  FaCog,
  FaImages,
  FaUserShield,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark/light mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Handle sidebar responsiveness
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmenuToggle = (name) =>
    setOpenSubmenu((prev) => (prev === name ? "" : name));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const menuItems = [
    {
      name: "Home",
      icon: <FaHome />,
      submenu: [
        { name: "Upload Logo", icon: <FaImages />, path: "/admin/settings/logo-upload" },
      ],
    },
    { name: "About Us", icon: <FaInfoCircle />, path: "/admin/about" },
    { name: "Academics", icon: <FaUniversity />, path: "/admin/academics" },
    {
      name: "Admission",
      icon: <FaUserGraduate />,
      submenu: [
        { name: "Admission", path: "/admin/admission" },
        { name: "Fee & Scholarship", path: "/admin/admission/fee-scholarship" },
        { name: "Registration Handle", path: "/admin/admission/registration" },
      ],
    },
    {
      name: "Result & Placement",
      icon: <FaFileAlt />,
      submenu: [
        { name: "Result", path: "/admin/result" },
        { name: "Placement", path: "/admin/placement" },
      ],
    },
    { name: "Notices", icon: <FaBullhorn />, path: "/admin/notices" },

    // ✅ Admin Contact Page
    { name: "Contact", icon: <FaEnvelope />, path: "/admin/contact" },

    {
      name: "Settings",
      icon: <FaCog />,
      submenu: [
        { name: "Reset Password", icon: <FaUserShield />, path: "/admin/settings/reset-password" },
      ],
    },
  ];

  return (
    <>
      {/* ===== Top Bar ===== */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 shadow-md z-50 transition-all duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-xl lg:text-2xl font-bold tracking-wide flex items-center gap-3">
            Admin Dashboard
            <button
              onClick={() => setIsSidebarOpen((s) => !s)}
              className="ml-2 text-xl text-white p-2 rounded-md transition-all"
              title="Toggle Menu"
            >
              <FaBars />
            </button>
          </h1>
        </div>

        {/* Dark/Light toggle */}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 flex flex-col pt-24 transition-transform duration-300 z-40 shadow-xl ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        } ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex flex-col flex-grow overflow-y-auto px-5 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {!item.submenu ? (
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => handleSubmenuToggle(item.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      item.submenu.some((sub) => sub.path === location.pathname)
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      {item.name}
                    </div>
                    {openSubmenu === item.name ? <FaChevronUp /> : <FaChevronDown />}
                  </button>

                  {openSubmenu === item.name && (
                    <div className="ml-6 mt-1 flex flex-col space-y-1">
                      {item.submenu.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavigation(sub.path)}
                          className={`w-full text-left flex items-center gap-2 p-2 rounded-md transition-all ${
                            location.pathname === sub.path
                              ? "bg-blue-400 text-white"
                              : "hover:bg-blue-500 hover:text-white"
                          }`}
                        >
                          {sub.icon && <span>{sub.icon}</span>}
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-700 dark:border-gray-600">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
          >
            <FaSignOutAlt size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
