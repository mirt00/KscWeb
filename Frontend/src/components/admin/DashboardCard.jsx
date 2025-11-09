// src/components/admin/DashboardCard.jsx
import React from "react";
import { IconContext } from "react-icons";

const DashboardCard = ({ title, value, icon, color = "bg-white", iconBg = "bg-gray-100", iconColor = "#3B82F6" }) => {
  return (
    <div
      className={`flex items-center p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ${color}`}
    >
      {/* Icon */}
      <div className={`p-4 rounded-full flex items-center justify-center mr-4 ${iconBg}`}>
        <IconContext.Provider value={{ size: "2rem", color: iconColor }}>
          {icon}
        </IconContext.Provider>
      </div>

      {/* Info */}
      <div>
        <h3 className="text-gray-600 font-semibold text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
