// src/pages/About.jsx
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AboutSection from '../components/home/AboutSection';

const About = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-50 flex flex-col min-h-screen pt-28 pb-12">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
          <AboutSection />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
