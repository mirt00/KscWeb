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

  // ===== Dark Mode =====
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ===== Responsive Sidebar =====
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

  // ===== Menu Items =====
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
      {/* ===== TOP BAR ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 shadow-md
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="text-xl p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FaBars />
          </button>
          <h1 className="text-xl font-bold hidden sm:block">Admin Dashboard</h1>
        </div>

        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
      </header>

      {/* ===== MOBILE OVERLAY ===== */}
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed top-0 left-0 h-screen pt-24 z-40 transition-all duration-300 shadow-lg
        ${isSidebarOpen ? "w-72" : "w-20"}
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <nav className="px-4 flex flex-col gap-2 overflow-y-auto h-full">
          {menuItems.map((item, index) => (
            <div key={index}>
              {/* ===== NO SUBMENU ===== */}
              {!item.submenu ? (
                <button
                  onClick={() => navigateTo(item.path)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all
                  ${location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-500 hover:text-white"}
                  ${!isSidebarOpen && "justify-center"}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {isSidebarOpen && <span>{item.name}</span>}
                </button>
              ) : (
                <>
                  {/* ===== SUBMENU BUTTON ===== */}
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all
                    ${item.submenu.some((sub) => sub.path === location.pathname)
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-500 hover:text-white"}`}
                  >
                    <div
                      className={`flex items-center gap-3 ${
                        !isSidebarOpen && "justify-center w-full"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </div>
                    {isSidebarOpen &&
                      (openSubmenu === item.name ? <FaChevronUp /> : <FaChevronDown />)}
                  </button>

                  {/* ===== SUBMENU ITEMS ===== */}
                  {openSubmenu === item.name && isSidebarOpen && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.submenu.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => navigateTo(sub.path)}
                          className={`w-full flex items-center gap-2 p-2 rounded-md transition-all
                          ${location.pathname === sub.path
                            ? "bg-blue-400 text-white"
                            : "hover:bg-blue-500 hover:text-white"}`}
                        >
                          {sub.icon && <span>{sub.icon}</span>}
                          <span>{sub.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {/* ===== LOGOUT ===== */}
          <div className="mt-auto p-4 border-t dark:border-gray-700">
            <button
              onClick={logout}
              className={`w-full bg-red-600 hover:bg-red-700 text-white flex items-center gap-3 py-3 rounded-lg
              ${!isSidebarOpen && "justify-center"}`}
            >
              <FaSignOutAlt />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
