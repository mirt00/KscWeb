// src/pages/Admission/Admission.jsx
import React, { useState } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Button from "../../components/common/Button";
import useFetch from "../../hooks/useFetch";

const Admission = () => {
  const [activeTab, setActiveTab] = useState("admission");
  const { data, loading, error } = useFetch("/api/fees-scholarships");

  return (
    <>
      <Header />
      <main className="bg-gray-50 flex flex-col min-h-screen pt-24">
        <section className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 sm:p-10">
            {/* ===== Tabs ===== */}
            <div className="flex justify-center mb-10 space-x-4">
              <button
                onClick={() => setActiveTab("admission")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  activeTab === "admission"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Admission
              </button>
              <button
                onClick={() => setActiveTab("fee")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  activeTab === "fee"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Fee & Scholarships
              </button>
            </div>

            {/* ===== Admission Section ===== */}
            {activeTab === "admission" && (
              <div className="animate-fadeIn">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 text-center mb-6">
                  Admission
                </h1>

                <p className="text-gray-600 text-center text-lg leading-relaxed mb-8">
                  Kathmandu Shiksha Campus welcomes applications for various
                  academic programs. Our mission is to nurture academic
                  excellence, discipline, and personal growth in every student.
                  You can apply online or visit the campus for in-person
                  registration and counseling.
                </p>

                {/* ===== Admission Process ===== */}
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h2 className="text-2xl font-semibold text-blue-600 mb-3 border-l-4 border-blue-600 pl-3">
                      Admission Process
                    </h2>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Fill out the online application form.</li>
                      <li>Submit required academic and ID documents.</li>
                      <li>Attend the counseling and orientation session.</li>
                      <li>Complete fee payment to confirm admission.</li>
                    </ol>
                  </div>

                  {/* ===== Eligibility Criteria ===== */}
                  <div>
                    <h2 className="text-2xl font-semibold text-blue-600 mb-3 border-l-4 border-blue-600 pl-3">
                      Eligibility Criteria
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Completion of SEE or equivalent for +2 programs.</li>
                      <li>Completion of +2 or equivalent for Bachelor’s programs.</li>
                      <li>Merit-based selection depending on entrance performance.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center mt-10">
                  <Button
                    variant="primary"
                    className="text-lg px-8 py-3 rounded-xl"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            )}

            {/* ===== Fee & Scholarships Section ===== */}
            {activeTab === "fee" && (
              <div className="animate-fadeIn">
                <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-8">
                  Fee & Scholarships
                </h2>

                {loading && (
                  <p className="text-center text-gray-500 text-lg animate-pulse">
                    Loading information...
                  </p>
                )}

                {error && (
                  <p className="text-center text-red-600 text-lg">
                    Failed to load data: {error}
                  </p>
                )}

                {data && (
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Image Section */}
                    {data.image && (
                      <div className="flex-1">
                        <img
                          src={data.image}
                          alt="Fee & Scholarships"
                          className="w-full h-auto rounded-2xl shadow-md object-cover"
                        />
                      </div>
                    )}

                    {/* Text Section */}
                    {data.description && (
                      <div className="flex-1 text-gray-700 text-lg leading-relaxed">
                        <p>{data.description}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Admission;
