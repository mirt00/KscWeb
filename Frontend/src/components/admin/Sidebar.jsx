import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHome, FaInfoCircle, FaUniversity, FaUserGraduate, FaFileAlt, FaBullhorn,
  FaEnvelope, FaChevronDown, FaBars, FaCog, FaImages, FaUserShield, FaSun,
  FaMoon, FaPowerOff
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openSubmenu, setOpenSubmenu] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1280);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSubmenu = (name) => setOpenSubmenu((prev) => (prev === name ? "" : name));

  const navigateTo = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      submenu: [{ name: "upLoadLogo", path: "/admin/settings/logo-upload", icon: <FaImages /> }],
    },
    { name: "About Us", icon: <FaInfoCircle />, path: "/admin/about" },
    { name: "Academics", icon: <FaUniversity />, path: "/admin/academics" },
    {
      name: "Admission",
      icon: <FaUserGraduate />,
      submenu: [
        { name: "Scholarships", path: "/admin/admission/fee-scholarship" },
        { name: "Registry Management", path: "/admin/admission/registration" },
      ],
    },
    {
      name: "Result&Placements",
      icon: <FaFileAlt />,
      submenu: [
        { name: "Exam Results", path: "/admin/result" },
        { name: "Placements", path: "/admin/placement" },
      ],
    },
    { name: "Notices", icon: <FaBullhorn />, path: "/admin/notices" },
    { name: "Contact", icon: <FaEnvelope />, path: "/admin/contact" },
    {
      name: "Settings",
      icon: <FaCog />,
      submenu: [{ name: "Security", path: "/admin/settings/reset-password", icon: <FaUserShield /> }],
    },
  ];

  // Industry Helper: Detect if a submenu child is active
  const isChildActive = (submenu) => submenu?.some((sub) => sub.path === location.pathname);

  return (
    <>
      {/* ===== REFINED TOP BAR ===== */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-lg border-b transition-colors duration-500
        ${darkMode ? "bg-gray-900/80 border-gray-800 text-white" : "bg-white/80 border-gray-200 text-gray-900"}`}>
        
        <div className="flex items-center gap-6">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-500/10 rounded-xl transition-all active:scale-90">
            <FaBars className="text-xl" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tighter uppercase italic">KAthmandu Shik<span className="text-blue-500">sha Campus</span></h1>
          </div>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-2xl bg-gray-500/10 hover:bg-gray-500/20 transition-all text-xl">
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
        </button>
      </header>

      {/* ===== OVERLAY ===== */}
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-30" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside className={`fixed top-0 left-0 h-screen pt-24 z-40 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isSidebarOpen ? "w-80" : "w-24"}
        ${darkMode ? "bg-gray-900 border-r border-gray-800 text-white" : "bg-gray-50 border-r border-gray-200 text-gray-900"}`}>
        
        <nav className="px-4 flex flex-col h-full pb-8">
          <div className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar">
            {menuItems.map((item, index) => {
              const active = location.pathname === item.path || isChildActive(item.submenu);
              
              return (
                <div key={index} className="group">
                  {!item.submenu ? (
                    <button onClick={() => navigateTo(item.path)} className={`relative w-full flex items-center gap-4 p-3.5 rounded-2xl font-semibold text-sm transition-all
                      ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "hover:bg-gray-500/10"}
                      ${!isSidebarOpen && "justify-center"}`}>
                      <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${active ? "text-white" : "text-blue-500"}`}>{item.icon}</span>
                      {isSidebarOpen && <span className="tracking-wide">{item.name}</span>}
                      {active && isSidebarOpen && <div className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full" />}
                    </button>
                  ) : (
                    <div className="flex flex-col">
                      <button onClick={() => toggleSubmenu(item.name)} className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-semibold text-sm transition-all
                        ${active ? "bg-gray-500/10 text-blue-500" : "hover:bg-gray-500/10"}
                        ${!isSidebarOpen && "justify-center"}`}>
                        <div className="flex items-center gap-4">
                          <span className={`text-xl transition-all ${active ? "text-blue-500 scale-110" : "text-gray-400 group-hover:text-blue-500"}`}>{item.icon}</span>
                          {isSidebarOpen && <span className="tracking-wide">{item.name}</span>}
                        </div>
                        {isSidebarOpen && <FaChevronDown className={`text-xs transition-transform duration-300 ${openSubmenu === item.name ? "rotate-180" : ""}`} />}
                      </button>

                      {openSubmenu === item.name && isSidebarOpen && (
                        <div className="ml-10 mt-1 space-y-1 border-l-2 border-gray-500/10 pl-4 animate-in fade-in slide-in-from-top-2">
                          {item.submenu.map((sub, idx) => (
                            <button key={idx} onClick={() => navigateTo(sub.path)} className={`w-full text-left p-2.5 rounded-xl text-[13px] font-medium transition-all
                              ${location.pathname === sub.path ? "text-blue-500 bg-blue-500/5 font-bold" : "text-gray-500 hover:text-blue-500"}`}>
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ===== LOGOUT: ICONIC DESIGN ===== */}
          <div className="pt-6 border-t dark:border-gray-800">
            <button onClick={logout} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-sm bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all group
              ${!isSidebarOpen && "justify-center"}`}>
              <FaPowerOff className="text-xl group-hover:rotate-90 transition-transform duration-500" />
              {isSidebarOpen && <span className="tracking-widest uppercase text-xs">Log Out</span>}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;