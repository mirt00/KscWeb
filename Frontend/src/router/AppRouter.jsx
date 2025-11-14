import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ===== Public Pages =====
import Home from "../pages/Home";
import About from "../pages/About";
import Academics from "../pages/Academics";
import Admission from "../pages/Admission/Admission";
import Contact from "../pages/Contact";
import Notices from "../pages/Notices"; // public notice page
import ResultPlacement from "../pages/StudentInfo/ResultPlacement";
import FeeScholarships from "../pages/Admission/FeeScholarships";

// ===== Admin Pages =====
import AdminLogin from "../pages/AdminLogin";
import Register from "../pages/Register";
import ForgotPasswordPage from "../components/auth/ForgotPassword";
import AdminDashboard from "../pages/AdminDashboard";
import LogoUpload from "../components/admin/LogoUpload";
import AdminContact from "../components/admin/AdminContact";
import AdminNotice from "../components/admin/AdminNotice"; // ✅ Admin Notice Management

// ===== Admin Layout =====
import Sidebar from "../components/admin/Sidebar";

// ===== Context =====
import { AuthContext } from "../context/AuthContext";

// ==================== PRIVATE ROUTE ====================
const PrivateRoute = ({ children }) => {
  const { adminInfo, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-600 animate-pulse">
        Checking authentication...
      </div>
    );

  return adminInfo ? children : <Navigate to="/admin/login" replace />;
};

// ==================== ADMIN LAYOUT ====================
const AdminLayout = ({ children }) => (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar />
    <main className="flex-1 p-4">{children}</main>
  </div>
);

// ==================== ROUTES ====================
const AppRouter = () => (
  <Router>
    <Routes>
      {/* ===== 🌍 Public Routes ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/academics" element={<Academics />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/notices" element={<Notices />} /> {/* Public notices */}
      <Route path="/results-placement" element={<ResultPlacement />} />
      <Route path="/fee-scholarships" element={<FeeScholarships />} />

      {/* ===== 🔑 Admin Authentication Routes ===== */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />

      {/* ===== 🛡️ Protected Admin Routes ===== */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/settings/logo-upload"
        element={
          <PrivateRoute>
            <AdminLayout>
              <LogoUpload />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/contact"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminContact />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* ✅ Admin Notice Management */}
      <Route
        path="/admin/notices"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminNotice />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* ===== 🚧 Catch-All Route ===== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRouter;
