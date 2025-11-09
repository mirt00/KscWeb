import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

const FeeScholarships = () => {
  // ✅ Scholarships array
  const scholarships = [
    {
      title: "Merit-Based Scholarship",
      description:
        "Awarded to students who demonstrate exceptional academic performance in internal and board examinations.",
    },
    {
      title: "Need-Based Financial Aid",
      description:
        "Designed to support students facing financial challenges, helping them continue their studies without interruption.",
    },
    {
      title: "Community Service Scholarship",
      description:
        "Offered to students actively involved in community development and volunteer initiatives promoting social responsibility.",
    },
    {
      title: "Special Category Scholarship",
      description:
        "Available for differently-abled students and those from underprivileged backgrounds to promote inclusive education.",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-gray-50 pt-24">
        <section className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-10">
            Fee & Scholarships
          </h1>

          {/* ===== Fee Structure ===== */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Fee Structure
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kathmandu Shiksha Campus provides affordable and transparent fee structures
              for all programs. Students can pay in easy installments, and concessions are
              available for academically strong and deserving candidates.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Payment can be made per semester or annually.</li>
              <li>Additional discounts for early registration.</li>
              <li>Special fee waiver for top performers in entrance exams.</li>
            </ul>
          </div>

          {/* ===== Scholarships ===== */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Scholarships
            </h2>

            {Array.isArray(scholarships) && scholarships.length > 0 ? (
              <div className="space-y-6">
                {scholarships.map((item, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 rounded transition p-2"
                  >
                    <h3 className="text-xl font-semibold text-blue-600 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">
                No scholarship information available at the moment.
              </p>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default FeeScholarships;
