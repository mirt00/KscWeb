// src/pages/Academics.jsx
import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Loader from "../components/common/Loader";
import useFetch from "../hooks/useFetch";

const Academics = () => {
  const { data, loading, error } = useFetch("/api/academics");

  // Static fallback data (for now)
  const staticFaculties = [
    {
      id: 1,
      name: "Faculty of Education",
      description:
        "The Faculty of Education provides comprehensive teacher training and subject mastery programs, focusing on effective pedagogy and real-world classroom skills.",
      subjects: ["English", "Nepali"],
      image:
        "https://img.freepik.com/free-photo/teacher-helping-her-student-study_23-2148525396.jpg",
    },
    {
      id: 2,
      name: "Faculty of Management",
      description:
        "The Faculty of Management develops analytical, leadership, and entrepreneurial skills, preparing students for dynamic careers in business and technology.",
      subjects: ["Computer Science", "Business Studies", "Accountancy"],
      image:
        "https://img.freepik.com/free-photo/modern-office-meeting-room_23-2148898278.jpg",
    },
  ];

  // Use fetched data if available; otherwise, static fallback
  const faculties = Array.isArray(data) && data.length > 0 ? data : staticFaculties;

  return (
    <>
      <Header />
      <main className="pt-24 pb-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
            Our Academics & Faculties
          </h2>

          {loading && <Loader />}
          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            {faculties.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 overflow-hidden"
              >
                {faculty.image && (
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="h-52 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {faculty.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {faculty.description}
                  </p>
                  {faculty.subjects?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-blue-600 mb-2">
                        Major Subjects:
                      </h4>
                      <ul className="flex flex-wrap gap-2">
                        {faculty.subjects.map((sub, i) => (
                          <li
                            key={i}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Academics;
