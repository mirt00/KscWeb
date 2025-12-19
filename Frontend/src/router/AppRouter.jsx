import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ===== Public Pages =====
import Home from "../pages/Home";
import About from "../pages/About";
import Academics from "../pages/Academics";
import Admission from "../pages/Admission/Admission";
import Contact from "../pages/Contact";
import Notices from "../pages/Notices";
import ResultPlacement from "../pages/StudentInfo/ResultPlacement";
import FeeScholarships from "../pages/Admission/FeeScholarships";

// ===== Admin Pages =====
import AdminLogin from "../pages/AdminLogin";
import Register from "../pages/Register";
import ForgotPasswordPage from "../components/auth/ForgotPassword";
import AdminDashboard from "../pages/AdminDashboard";
import LogoUpload from "../components/admin/LogoUpload";
import AdminContact from "../components/admin/AdminContact";
import AdminNotice from "../components/admin/AdminNotice";
import AdminResult from "../components/admin/AdminResult";
import AdminPlacement from "../components/admin/AdminPlacement";
import AdminAbout from "../components/admin/AdminAbout";   // ✅ NEW IMPORT

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
      {/* ===== Public Routes ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/academics" element={<Academics />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/results-placement" element={<ResultPlacement />} />
      <Route path="/fee-scholarships" element={<FeeScholarships />} />

      {/* ===== Admin Auth Routes ===== */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />

      {/* ===== Protected Admin Routes ===== */}
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

      {/* ================= ABOUT PAGE ADDED HERE ================= */}
      <Route
        path="/admin/about"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminAbout />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      {/* ========================================================== */}

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

      {/* Admin Result & Placement */}
      <Route
        path="/admin/result"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminResult />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/placement"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminPlacement />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* ===== Catch-All Route ===== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

export default AppRouter;
