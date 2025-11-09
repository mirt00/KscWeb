// src/pages/StudentInfo/ResultPlacement.jsx
import React, { useState } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Result from "./Result";
import Placement from "./Placement";

const ResultPlacement = () => {
  const [activeTab, setActiveTab] = useState("result");

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-gray-50 pt-24">
        <section className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-8">
            Student Results & Placements
          </h1>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setActiveTab("result")}
              className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
                activeTab === "result"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Results
            </button>
            <button
              onClick={() => setActiveTab("placement")}
              className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
                activeTab === "placement"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Placements
            </button>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {activeTab === "result" ? (
              <Result />
            ) : (
              <Placement />
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ResultPlacement;
