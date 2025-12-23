import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { MapPin, Phone, Mail, Clock, Send, PhoneCall } from "lucide-react";

const Contact = () => {
  const [contact, setContact] = useState({ address: "", phone_no: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContact = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/contact");
      if (data.success && data.contacts?.length > 0) {
        setContact(data.contacts[0]);
      }
    } catch (err) {
      setError("Unable to load contact details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Updated with Brand Gradient */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-[#FDF4F9] to-white">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-black tracking-[0.2em] text-[#3F1536] uppercase bg-[#C8A45D]/20 rounded-full">
              Connect with Excellence
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-[#3F1536] mb-6 tracking-tight uppercase">
              Get in <span className="text-[#C8A45D]">Touch.</span>
            </h1>
            <p className="text-[#9B708F] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Have questions? We're here to help. Reach out via any of the channels below or visit our campus.
            </p>
          </div>
        </section>

        {/* Info & Map Section */}
        <section className="pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-[#3F1536]/5 border border-slate-100">
                <h2 className="text-2xl font-black text-[#3F1536] mb-8 uppercase tracking-tight">Contact Information</h2>
                
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-12 bg-slate-50 rounded-xl"></div>
                    <div className="h-12 bg-slate-50 rounded-xl"></div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Address Item - Maroon Theme */}
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#FDF4F9] text-[#3F1536] rounded-2xl flex items-center justify-center border border-[#3F1536]/10 group-hover:bg-[#3F1536] group-hover:text-[#C8A45D] transition-all duration-300">
                        <MapPin size={24} />
                      </div>
                      <div className="ml-5">
                        <p className="text-[10px] font-black text-[#9B708F] uppercase tracking-widest">Our Location</p>
                        <p className="text-lg text-[#3F1536] font-bold mt-1 leading-snug">{contact.address || "Kathmandu, Nepal"}</p>
                      </div>
                    </div>

                    {/* Phone Item - Gold Theme */}
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#FDF4F9] text-[#C8A45D] rounded-2xl flex items-center justify-center border border-[#C8A45D]/20 group-hover:bg-[#C8A45D] group-hover:text-white transition-all duration-300">
                        <Phone size={24} />
                      </div>
                      <div className="ml-5">
                        <p className="text-[10px] font-black text-[#9B708F] uppercase tracking-widest">Phone Number</p>
                        <p className="text-lg text-[#3F1536] font-bold mt-1 leading-snug">{contact.phone_no || "+977 1-XXXXXXX"}</p>
                      </div>
                    </div>

                    {/* Email Item - Mauve Theme */}
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#FDF4F9] text-[#9B708F] rounded-2xl flex items-center justify-center border border-[#3F1536]/10 group-hover:bg-[#3F1536] group-hover:text-white transition-all duration-300">
                        <Mail size={24} />
                      </div>
                      <div className="ml-5">
                        <p className="text-[10px] font-black text-[#9B708F] uppercase tracking-widest">Email Address</p>
                        <p className="text-lg text-[#3F1536] font-bold mt-1 leading-snug">{contact.email || "info@ksc.edu.np"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Action Buttons - Brand Color Palette */}
                <div className="grid grid-cols-2 gap-4 mt-10">
                    <a href={`tel:${contact.phone_no}`} className="flex items-center justify-center gap-2 bg-[#3F1536] text-[#C8A45D] py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:brightness-125 transition-all active:scale-95 shadow-lg shadow-[#3F1536]/20">
                        <PhoneCall size={18} /> Call
                    </a>
                    <a href={`mailto:${contact.email}`} className="flex items-center justify-center gap-2 bg-[#C8A45D] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-[#C8A45D]/30">
                        <Send size={18} /> Email
                    </a>
                </div>
              </div>

              {/* Working Hours Card - Updated with Maroon Background */}
              <div className="bg-[#3F1536] p-8 rounded-3xl text-white flex items-center justify-between overflow-hidden relative shadow-xl shadow-[#3F1536]/20">
                <div className="relative z-10">
                    <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 mb-2 text-[#C8A45D]">
                        <Clock size={20} /> Office Hours
                    </h3>
                    <p className="text-lg font-bold">Sunday — Friday</p>
                    <p className="text-white/60 font-medium">6:00 AM - 5:00 PM</p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5 text-white">
                    <Clock size={120} />
                </div>
              </div>
            </div>

            {/* Right: Map - Updated Border Color */}
            <div className="lg:col-span-7">
              <div className="h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#FDF4F9] relative group">
                <iframe
                  title="Campus Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.744158931346!2d85.3400!3d27.7000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzAwLjAiTiA4NcKwMjAnMjQuMCJF!5e0!3m2!1sen!2snp!4v1620000000000!5m2!1sen!2snp"
                  className="w-full h-full grayscale-[50%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                {/* Decorative overlay - Brand Themed */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-[#C8A45D]/20 pointer-events-none">
                    <p className="text-[#3F1536] font-black uppercase text-[10px] tracking-widest">Live Navigation</p>
                    <p className="text-[#9B708F] text-xs font-bold">Main Administrative Block</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;