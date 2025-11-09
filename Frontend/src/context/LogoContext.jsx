// src/context/LogoContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create and export the context
export const LogoContext = createContext();

// Create and export provider
export const LogoProvider = ({ children }) => {
  const [logo, setLogo] = useState(null); // stores URL of admin-uploaded logo

  // Fetch active logo from backend
  const fetchLogo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/logo/active"); 
      // Ensure your backend response has "url" field
      if (res.data && res.data.url) {
        setLogo(res.data.url);
      } else {
        console.warn("No active logo found in response", res.data);
      }
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  };

  // Fetch logo on mount
  useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <LogoContext.Provider value={{ logo, setLogo, fetchLogo }}>
      {children}
    </LogoContext.Provider>
  );
};
