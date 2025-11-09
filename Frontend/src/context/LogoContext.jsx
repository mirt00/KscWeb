// src/context/LogoContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LogoContext = createContext();

export const LogoProvider = ({ children }) => {
  const [logo, setLogo] = useState(null); // stores URL of admin-uploaded logo
  const DEFAULT_LOGO = "https://via.placeholder.com/150?text=Logo"; // fallback

  const fetchLogo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/logo/active");

      // ✅ Use imageUrl from backend response
      if (res.data && res.data.imageUrl) {
        setLogo(res.data.imageUrl);
        console.log("✅ Active logo loaded:", res.data.imageUrl);
      } else {
        console.warn("⚠️ No active logo found in response", res.data);
        setLogo(DEFAULT_LOGO);
      }
    } catch (error) {
      console.error("❌ Error fetching logo:", error);
      setLogo(DEFAULT_LOGO);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <LogoContext.Provider value={{ logo, setLogo, fetchLogo }}>
      {children}
    </LogoContext.Provider>
  );
};
