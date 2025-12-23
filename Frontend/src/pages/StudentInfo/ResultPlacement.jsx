// // src/pages/StudentInfo/ResultPlacement.jsx
// import React, { useState } from "react";
// import Header from "../../components/common/Header";
// import Footer from "../../components/common/Footer";
// import Result from "./Result";
// import Placement from "./Placement";

// const ResultPlacement = () => {
//   const [activeTab, setActiveTab] = useState("result");

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen flex flex-col bg-gray-50 pt-24">
//         <section className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           {/* Page Title */}
//           <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-8">
//             Student Results & Placements
//           </h1>

//           {/* Tabs */}
//           <div className="flex justify-center gap-4 mb-12 flex-wrap">
//             <button
//               onClick={() => setActiveTab("result")}
//               className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
//                 activeTab === "result"
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Results
//             </button>
//             <button
//               onClick={() => setActiveTab("placement")}
//               className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
//                 activeTab === "placement"
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Placements
//             </button>
//           </div>

//           {/* Content Section */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
//             {activeTab === "result" ? (
//               <Result />
//             ) : (
//               <Placement />
//             )}
//           </div>
//         </section>

//         <Footer />
//       </main>
//     </>
//   );
// };

// export default ResultPlacement;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Award } from "lucide-react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Result from "./Result";
import Placement from "./Placement";

const ResultPlacement = () => {
  const [activeTab, setActiveTab] = useState("result");

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <Header />
      
      <main className="pt-24">
        {/* ===== TAB NAVIGATION CENTER ===== */}
        <div className="max-w-7xl mx-auto px-6 pt-10">
          <div className="flex flex-col items-center">
            <div className="bg-white p-2 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-2 relative">
              
              {/* Sliding Background Highlight */}
              <motion.div
                className="absolute bg-[#3F1536] rounded-[1.8rem] h-[calc(100%-1rem)] z-0"
                initial={false}
                animate={{
                  width: activeTab === "result" ? "140px" : "160px",
                  x: activeTab === "result" ? 0 : 148,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              <button
                onClick={() => setActiveTab("result")}
                className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-[1.8rem] font-black text-xs uppercase tracking-widest transition-colors duration-300 ${
                  activeTab === "result" ? "text-white" : "text-gray-400 hover:text-[#3F1536]"
                }`}
              >
                <FileText size={16} />
                Results
              </button>

              <button
                onClick={() => setActiveTab("placement")}
                className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-[1.8rem] font-black text-xs uppercase tracking-widest transition-colors duration-300 ${
                  activeTab === "placement" ? "text-white" : "text-gray-400 hover:text-[#3F1536]"
                }`}
              >
                <Award size={16} />
                Placements
              </button>
            </div>
            
            {/* Subtle Indicator Text */}
            <motion.p 
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-[10px] font-bold text-[#C8A45D] uppercase tracking-[0.3em]"
            >
              Viewing {activeTab === "result" ? "Academic Records" : "Success Stories"}
            </motion.p>
          </div>
        </div>

        {/* ===== CONTENT SECTION ===== */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "result" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === "result" ? 20 : -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {activeTab === "result" ? <Result /> : <Placement />}
            </motion.div>
          </AnimatePresence>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default ResultPlacement;