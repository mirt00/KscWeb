// src/components/home/HeroSection.jsx
import React from 'react';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <section className="bg-blue-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Welcome to Kathmandu Shiksha Campus
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Empowering students with quality education and modern facilities.
        </p>
        <Button variant="primary">Get Started</Button>
      </div>
    </section>
  );
};

export default HeroSection;
