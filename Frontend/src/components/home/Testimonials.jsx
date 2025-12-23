import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  { 
    name: 'Sita Sharma', 
    role: 'BBS Graduate',
    feedback: 'The campus provides an excellent learning environment. The transition from theory to practice was seamless thanks to the specialized workshops.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&fit=crop'
  },
  { 
    name: 'Ramesh Bhandari', 
    role: 'B.Ed Student',
    feedback: 'Faculty are knowledgeable and supportive. They don’t just teach; they mentor you for the challenges of the professional world.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop'
  },
  { 
    name: 'Anita Gurung', 
    role: 'MBS Alumni',
    feedback: 'I love the modern facilities and resources. The digital library and research labs are state-of-the-art and helped me immensely in my thesis.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&fit=crop'
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#FDFCFB] relative overflow-hidden">
      {/* Decorative Shading */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A45D]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h4 className="text-[#C8A45D] font-black uppercase text-xs tracking-[0.4em]">Success Stories</h4>
            <h2 className="text-5xl md:text-6xl font-black text-[#1a0f0a] tracking-tighter leading-none">
              VOICES OF <br />
              <span className="text-[#3F1536]">EXCELLENCE.</span>
            </h2>
          </div>
          <div className="md:text-right">
             <p className="text-gray-500 font-medium max-w-xs text-lg">
               Hear directly from the students who are shaping their future at KSC.
             </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-between hover:border-[#C8A45D]/30 transition-all duration-500"
            >
              <div className="relative">
                {/* Floating Quote Icon */}
                <div className="absolute -top-6 -left-4 w-12 h-12 bg-[#3F1536] rounded-2xl flex items-center justify-center shadow-lg shadow-[#3F1536]/20 group-hover:-translate-y-2 transition-transform duration-500">
                  <FaQuoteLeft className="text-[#C8A45D] text-lg" />
                </div>

                <div className="flex gap-1 mb-8 pt-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-[#C8A45D] text-xs" />
                  ))}
                </div>

                <p className="text-gray-600 text-lg leading-relaxed font-medium mb-10 italic">
                  "{item.feedback}"
                </p>
              </div>

              <div className="flex items-center gap-5 pt-8 border-t border-gray-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#C8A45D] rounded-2xl rotate-6 scale-105 opacity-0 group-hover:opacity-20 transition-all duration-500" />
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-2xl object-cover relative z-10 border-2 border-white shadow-md"
                  />
                </div>
                <div>
                  <h3 className="text-[#1a0f0a] font-black text-xl leading-none mb-1">
                    {item.name}
                  </h3>
                  <span className="text-[#C8A45D] text-xs font-bold uppercase tracking-widest">
                    {item.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;