// src/components/home/AboutSection.jsx
import React from 'react';
import { FaChalkboardTeacher, FaUniversity, FaBookOpen } from 'react-icons/fa';
import Button from '../common/Button';

const AboutSection = () => {
  const features = [
    { icon: <FaUniversity />, title: 'Modern Campus', description: 'State-of-the-art classrooms and labs.' },
    { icon: <FaChalkboardTeacher />, title: 'Expert Faculty', description: 'Learn from experienced teachers.' },
    { icon: <FaBookOpen />, title: 'Comprehensive Courses', description: 'Wide range of academic programs.' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Us</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Kathmandu Shiksha Campus provides top-quality education with modern facilities and experienced faculty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="text-4xl text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button variant="primary">Learn More</Button>
      </div>
    </section>
  );
};

export default AboutSection;
