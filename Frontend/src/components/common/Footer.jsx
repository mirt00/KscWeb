// src/components/common/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 overflow-hidden relative">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Marquee Text */}
        <div className="w-full overflow-hidden whitespace-nowrap mb-4 md:mb-0">
          <p className="">
            &copy;2025 Kathmandu Shiksha Campus. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-white transition"><FaTwitter /></a>
          <a href="#" className="hover:text-white transition"><FaInstagram /></a>
        </div>
      </div>

      {/* Custom CSS animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          .animate-marquee {
            display: inline-block;
            animation: marquee 15s linear infinite;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
