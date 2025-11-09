// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [adminInfo, setAdminInfo] = useState(
    JSON.parse(localStorage.getItem("adminInfo")) || null
  );
  const [loading, setLoading] = useState(true);

  // Check authentication on load
  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminInfo");
    if (storedAdmin) {
      setAdminInfo(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!adminInfo;

  return (
    <AuthContext.Provider
      value={{ adminInfo, setAdminInfo, loading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
