// src/components/student/StudentCard.jsx
import React from "react";

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center text-center">
      <img
        src={student.photo}
        alt={student.name}
        className="w-32 h-32 object-cover rounded-full mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
      <p className="text-gray-600">{student.position}</p>
      <p className="text-gray-500 text-sm">
        Faculty: {student.faculty} | Year: {student.year}
      </p>
    </div>
  );
};

export default StudentCard;
