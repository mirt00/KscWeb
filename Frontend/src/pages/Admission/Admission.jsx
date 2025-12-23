import React, { useState } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Button from "../../components/common/Button";
import useFetch from "../../hooks/useFetch";
import RegisterForm from "../Admission/RegisterForm"; 

const Admission = () => {
  const [activeTab, setActiveTab] = useState("admission");
  const [showForm, setShowForm] = useState(false);
  const { data, loading, error } = useFetch("/api/fees-scholarships");

  const handleApplyClick = () => {
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      {/* Background set to a soft gray to let the deep maroon cards pop */}
      <main className="bg-[#F8F9FA] flex flex-col min-h-screen pt-24 pb-12">
        <section className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-5xl mx-auto">
            
            {showForm ? (
              <div className="animate-in slide-in-from-bottom-10 duration-700">
                <button 
                  onClick={() => setShowForm(false)}
                  className="mb-8 flex items-center gap-2 text-[#3F1536] font-black hover:text-[#C8A45D] transition-colors group uppercase tracking-widest text-sm"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> 
                  Return to Info
                </button>
                <RegisterForm onSubmit={(data) => console.log(data)} />
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in duration-500">
                
                {/* Visual Header Banner using Campus Deep Maroon */}
                <div className="h-40 bg-[#3F1536] flex flex-col items-center justify-center relative overflow-hidden">
                   {/* Decorative Gold Glow */}
                   <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-[#C8A45D] opacity-20 blur-[100px]"></div>
                   <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-[0.2em] relative z-10">
                     Enrollment <span className="text-[#C8A45D]">2024</span>
                   </h2>
                   <div className="w-20 h-1 bg-[#C8A45D] mt-4 relative z-10"></div>
                </div>

                <div className="p-8 sm:p-12">
                  {/* ===== Campus Branded Tab Switcher ===== */}
                  <div className="flex p-1.5 bg-[#3F1536]/5 rounded-2xl w-fit mx-auto mb-16">
                    <button
                      onClick={() => setActiveTab("admission")}
                      className={`px-10 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs transition-all duration-300 ${
                        activeTab === "admission"
                          ? "bg-[#3F1536] text-white shadow-xl scale-105"
                          : "text-[#3F1536]/60 hover:text-[#3F1536]"
                      }`}
                    >
                      Admission Info
                    </button>
                    <button
                      onClick={() => setActiveTab("fee")}
                      className={`px-10 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs transition-all duration-300 ${
                        activeTab === "fee"
                          ? "bg-[#3F1536] text-white shadow-xl scale-105"
                          : "text-[#3F1536]/60 hover:text-[#3F1536]"
                      }`}
                    >
                      Fees & Scholarship
                    </button>
                  </div>

                  {/* ===== Admission Content ===== */}
                  {activeTab === "admission" && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-black text-[#3F1536] mb-6 tracking-tight uppercase">
                          Build Your <span className="text-[#C8A45D]">Legacy.</span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                          Join Kathmandu Shiksha Campus, where traditional values meet modern excellence. 
                          Begin your academic journey in an environment designed for success.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Process Card - Maroon Themed */}
                        <div className="bg-[#3F1536]/[0.02] p-10 rounded-[2rem] border-l-8 border-[#3F1536]">
                          <h3 className="text-xl font-black text-[#3F1536] mb-8 uppercase tracking-widest">
                            The Process
                          </h3>
                          <ul className="space-y-6">
                            {[
                              "Digital Application Form Submission",
                              "Academic Document Verification",
                              "Counseling & Interview Session",
                              "Final Seat Confirmation"
                            ].map((step, i) => (
                              <li key={i} className="flex items-center gap-4 text-[#3F1536] font-bold">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C8A45D] text-white flex items-center justify-center text-sm">
                                  {i+1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Eligibility Card - Gold/Maroon Themed */}
                        <div className="bg-[#C8A45D]/[0.05] p-10 rounded-[2rem] border-l-8 border-[#C8A45D]">
                          <h3 className="text-xl font-black text-[#C8A45D] mb-8 uppercase tracking-widest">
                            Eligibility
                          </h3>
                          <ul className="space-y-6">
                            {[
                              "SEE Completion for +2 Programs",
                              "NEB/Equivalent for Bachelor's",
                              "Entrance Examination Success"
                            ].map((text, i) => (
                              <li key={i} className="flex items-center gap-4 text-gray-700 font-bold">
                                <div className="w-2 h-2 bg-[#3F1536] rotate-45"></div>
                                {text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-center mt-16">
                        <button
                          onClick={handleApplyClick}
                          className="group relative px-16 py-5 bg-[#C8A45D] text-white font-black uppercase tracking-[0.2em] text-sm rounded-full shadow-2xl hover:bg-[#3F1536] transition-all duration-500 active:scale-95"
                        >
                          Apply Online Now
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ===== Fee & Scholarships Section ===== */}
                  {activeTab === "fee" && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <h2 className="text-3xl font-black text-[#3F1536] text-center mb-12 uppercase tracking-widest">
                        Scholarships & <span className="text-[#C8A45D]">Grants</span>
                      </h2>
                      
                      {loading ? (
                         <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8A45D]"></div></div>
                      ) : (
                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                           <div className="flex-1 relative group">
                              <div className="absolute -inset-4 bg-[#C8A45D]/20 rounded-[2.5rem] blur-xl"></div>
                              <img 
                                src={data?.image || "/placeholder-fee.jpg"} 
                                alt="Fees" 
                                className="relative w-full rounded-[2rem] shadow-2xl border-4 border-white object-cover" 
                              />
                           </div>
                           <div className="flex-1 space-y-8">
                              <div className="text-gray-600 leading-relaxed font-medium text-lg italic border-l-4 border-[#C8A45D] pl-6">
                                 {data?.description || "Detailed fee structures are available at the campus administration office."}
                              </div>
                              <div className="p-8 bg-[#3F1536] rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A45D] opacity-10 rounded-full -mr-16 -mt-16"></div>
                                 <h4 className="text-[#C8A45D] font-black uppercase tracking-widest mb-2">Merit Scholarship</h4>
                                 <p className="text-sm opacity-80 leading-loose">
                                   We grant significant scholarships based on SEE results and entrance performance to support hardworking students.
                                 </p>
                              </div>
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Admission;