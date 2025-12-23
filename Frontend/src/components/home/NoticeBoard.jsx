import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, ArrowUpRight, Megaphone } from 'lucide-react';

const notices = [
  { 
    title: 'Spring Semester Registration 2025', 
    date: 'Oct 15, 2025', 
    category: 'Academic',
    description: 'Registration for the upcoming spring semester is now open for all undergraduate programs.'
  },
  { 
    title: 'New Course Launch: Advanced Data Science', 
    date: 'Nov 01, 2025', 
    category: 'Curriculum',
    description: 'We are proud to introduce a specialized track in AI and Data Analytics starting this winter.'
  },
  { 
    title: '32nd Annual Sports & Cultural Meet', 
    date: 'Nov 20, 2025', 
    category: 'Events',
    description: 'Join us for a week of competition, teamwork, and celebration of campus talent.'
  },
  { 
    title: 'Scholarship Application Deadline', 
    date: 'Dec 05, 2025', 
    category: 'Financial',
    description: 'Final call for merit-based scholarship applications for the 2025 session.'
  },
];

const NoticeBoard = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A45D]/5 blur-[100px] rounded-full" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Heading & Call to Action */}
          <div className="lg:w-1/3 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#3F1536]/5 rounded-full">
              <Megaphone size={16} className="text-[#3F1536]" />
              <span className="text-[#3F1536] text-[10px] font-black uppercase tracking-[0.2em]">Latest Updates</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-black text-[#1a0f0a] leading-[0.9] tracking-tighter">
              CAMPUS <br />
              <span className="text-[#C8A45D]">BULLETIN.</span>
            </h2>
            
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Stay informed with the latest announcements, academic schedules, and campus events. 
              Our bulletin is updated daily to keep you ahead.
            </p>

            <button className="group flex items-center gap-4 text-[#3F1536] font-black uppercase tracking-widest text-xs border-b-2 border-[#C8A45D] pb-2 hover:gap-6 transition-all duration-300">
              View All Announcements <ArrowUpRight size={18} />
            </button>
          </div>

          {/* Right Column: Interactive Notice Feed */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 gap-4">
              {notices.map((notice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-gray-50 hover:bg-white p-8 rounded-[2rem] border border-transparent hover:border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-md text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#C8A45D] group-hover:border-[#C8A45D]/30 transition-colors">
                          {notice.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">{notice.date}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-black text-[#1a0f0a] group-hover:text-[#3F1536] transition-colors leading-tight">
                        {notice.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xl opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                        {notice.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#C8A45D] group-hover:border-[#C8A45D] transition-all duration-500">
                        <Bell className="text-gray-300 group-hover:text-white transition-colors" size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;