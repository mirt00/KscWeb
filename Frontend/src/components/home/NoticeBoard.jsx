// src/components/home/NoticeBoard.jsx
import React from 'react';

const notices = [
  { title: 'Spring Semester Registration', date: 'Oct 15, 2025' },
  { title: 'New Course: Data Science', date: 'Nov 01, 2025' },
  { title: 'Annual Sports Meet', date: 'Nov 20, 2025' },
];

const NoticeBoard = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notice Board</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {notices.map((notice, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{notice.title}</h3>
              <p className="text-gray-500 text-sm">{notice.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
