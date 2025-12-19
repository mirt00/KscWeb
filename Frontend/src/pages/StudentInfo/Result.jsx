import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/common/Header";

const API = "http://localhost:5000/api/result"; // Fixed API endpoint (matches backend route)

const Result = () => {
  const [grade, setGrade] = useState("All");
  const [stream, setStream] = useState("All");
  const [year, setYear] = useState("All");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // added error state

  // Fetch results from backend
  const fetchResults = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API);

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to fetch results");
      }
console.log("THe data",res.data.data)
      // Safely map backend data
      const data = (res.data?.data|| []).map((item) => ({
        title: item.title || "Untitled",
        grade: item.faculty === "Education" ? "XI" : "XII", // adjust mapping if needed
        stream: item.faculty || "N/A",
        year: item.year || "N/A",
        // fileType: item.imageUrl?.endsWith(".pdf") ? "pdf" : "image",
        url: item.resultImage.url || "https://via.placeholder.com/400x300", // fallback
      }));

      setResults(data);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError(err.message || "Something went wrong while fetching results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Filter results
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

          {/* Filter Section */}
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Grades</option>
                <option value="XI">Grade XI</option>
                <option value="XII">Grade XII</option>
              </select>

              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Streams</option>
                <option value="Education">Education</option>
                <option value="Management">Management</option>
              </select>

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

              <button
                onClick={fetchResults}
                className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Search
              </button>
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <p className="text-center text-gray-500 animate-pulse mt-10">
              Loading results...
            </p>
          ) : error ? (
            <p className="text-center text-red-500 mt-10">{error}</p>
          ) : filteredResults.length === 0 ? (
            <p className="text-center text-gray-600 mt-10">
              No results found. Please adjust your filters.
            </p>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResults.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition duration-300"
                >
                <img
                      src={res.url}
                      alt={res.title}
                      className="w-full h-56 object-cover"
                    />
                    
                   
                
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {res.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Grade: {res.grade} | Stream: {res.stream} | Year: {res.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Result;
