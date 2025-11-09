// src/pages/Notices.jsx
import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import NoticeBoard from "../components/home/NoticeBoard";

const Notices = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-gray-50 pt-28 sm:pt-32">
        {/* Notice Section */}
        <section className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-6 sm:mb-8">
            Campus Notices
          </h2>

          {/* Intro Text */}
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 px-4">
            Stay informed with the latest updates, announcements, and important events 
            from <span className="font-semibold text-blue-600">Kathmandu Shiksha Campus</span>.
          </p>

          {/* Notice Board Component */}
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            <NoticeBoard />
          </div>
        </section>

        {/* Footer stays aligned properly */}
        <Footer />
      </main>
    </>
  );
};

export default Notices;
