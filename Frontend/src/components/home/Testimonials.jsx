// src/components/home/Testimonials.jsx
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  { name: 'Sita Sharma', feedback: 'The campus provides excellent learning environment.' },
  { name: 'Ramesh Bhandari', feedback: 'Faculty are knowledgeable and supportive.' },
  { name: 'Anita Gurung', feedback: 'I love the modern facilities and resources.' },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Students Say</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <FaQuoteLeft className="text-blue-600 text-3xl mb-4 mx-auto" />
            <p className="text-gray-700 mb-4">"{item.feedback}"</p>
            <h3 className="text-gray-900 font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
