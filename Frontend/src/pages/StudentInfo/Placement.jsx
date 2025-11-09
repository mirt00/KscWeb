import React from "react";
import StudentCard from "../../components/common/StudentCard";

const Placement = () => {
  const students = [
    {
      name: "Sita Rana",
      position: "Intern - Accounting Firm",
      faculty: "Management",
      year: "2023",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Ramesh Thapa",
      position: "Teaching Assistant - Local School",
      faculty: "Education",
      year: "2023",
      photo: "https://randomuser.me/api/portraits/men/36.jpg",
    },
  ];

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student, idx) => (
        <StudentCard key={idx} student={student} />
      ))}
    </div>
  );
};

export default Placement;
