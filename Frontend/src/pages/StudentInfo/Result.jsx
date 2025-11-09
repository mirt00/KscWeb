// src/pages/Result.jsx
import React, { useState } from "react";
import Header from "../../components/common/Header";

const Result = () => {
  const [grade, setGrade] = useState("All");
  const [stream, setStream] = useState("All");
  const [year, setYear] = useState("All");

  // Dummy data (replace with backend later)
  const results = [
    {
      title: "Grade XI Education Result 2024",
      grade: "XI",
      stream: "Education",
      year: "2024",
      fileType: "image",
      url: "https://via.placeholder.com/600x400?text=XI+Education+2024",
    },
    {
      title: "Grade XII Management Result 2024",
      grade: "XII",
      stream: "Management",
      year: "2024",
      fileType: "image",
      url: "https://via.placeholder.com/600x400?text=XII+Management+2024",
    },
    {
      title: "Grade XI Management Result 2023",
      grade: "XI",
      stream: "Management",
      year: "2023",
      fileType: "image",
      url: "https://via.placeholder.com/600x400?text=XI+Management+2023",
    },
  ];

  // Filter Logic
  const filteredResults = results.filter((res) => {
    return (
      (grade === "All" || res.grade === grade) &&
      (stream === "All" || res.stream === stream) &&
      (year === "All" || res.year === year)
    );
  });

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen pt-28 pb-16">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
            Examination Results
          </h1>

          {/* === Filter Section === */}
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Grade */}
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Grades</option>
                <option value="XI">Grade XI</option>
                <option value="XII">Grade XII</option>
              </select>

              {/* Stream */}
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Streams</option>
                <option value="Education">Education</option>
                <option value="Management">Management</option>
              </select>

              {/* Year */}
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Years</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>

              {/* Search Button */}
              <button
                onClick={() => {}}
                className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Search
              </button>
            </div>
          </div>

          {/* === Results Grid === */}
          {filteredResults.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResults.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition duration-300"
                >
                  {res.fileType === "image" ? (
                    <img
                      src={res.url}
                      alt={res.title}
                      className="w-full h-56 object-cover"
                    />
                  ) : (
                    <iframe
                      src={res.url}
                      className="w-full h-56"
                      title={res.title}
                    />
                  )}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {res.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Grade: {res.grade} | Stream: {res.stream} | Year:{" "}
                      {res.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-10">
              No results found. Please adjust your filters.
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default Result;
