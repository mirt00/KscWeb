import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import AboutSection from "../../components/home/AboutSection";

const About = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-50 pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AboutSection />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
