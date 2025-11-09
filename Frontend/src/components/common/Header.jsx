// src/components/common/Header.jsx
import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      {/* Navbar handles logo, links, and responsive menu */}
      <Navbar />
    </header>
  );
};

export default Header;
