// src/pages/Home.jsx
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import NoticeBoard from '../components/home/NoticeBoard';
import Testimonials from '../components/home/Testimonials';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <NoticeBoard />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
};

export default Home;
