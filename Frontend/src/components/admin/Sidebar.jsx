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

  // Toggle Dark Mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Open sidebar on large screens
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSubmenu = (name) =>
    setOpenSubmenu((prev) => (prev === name ? "" : name));

  const navigateTo = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // ===== Sidebar Menu Items =====
  const menuItems = [
    {
      name: "Home",
      icon: <FaHome />,
      submenu: [
        { name: "Upload Logo", path: "/admin/settings/logo-upload", icon: <FaImages /> },
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
    // ✅ Admin Notice menu (fixed path)
    { name: "Notice", icon: <FaBullhorn />, path: "/admin/notices" },
    { name: "Contact", icon: <FaEnvelope />, path: "/admin/contact" },
    {
      name: "Settings",
      icon: <FaCog />,
      submenu: [
        { name: "Reset Password", path: "/admin/settings/reset-password", icon: <FaUserShield /> },
      ],
    },
  ];

  return (
    <>
      {/* Top Nav */}
      <header
        className={`fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 shadow-md z-50 transition-all ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-xl lg:text-2xl font-bold tracking-wide">Admin Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="text-xl p-2 rounded-md"
            title="Toggle Menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Dark/Light Mode */}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="text-2xl p-2 rounded-full transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 pt-24 flex flex-col shadow-lg z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <nav className="px-5 flex flex-col gap-2 overflow-y-auto flex-grow">
          {menuItems.map((item, index) => (
            <div key={index}>
              {/* No Submenu */}
              {!item.submenu ? (
                <button
                  onClick={() => navigateTo(item.path)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </button>
              ) : (
                <>
                  {/* With Submenu */}
                  <button
                    onClick={() => toggleSubmenu(item.name)}
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

                  {/* Submenu List */}
                  {openSubmenu === item.name && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.submenu.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => navigateTo(sub.path)}
                          className={`w-full flex items-center gap-2 p-2 rounded-md transition-all ${
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
                </>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t dark:border-gray-700">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-3 py-3 rounded-lg"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
