import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { MapPin, Phone, Mail, Clock, Send, PhoneCall } from "lucide-react"; // Install lucide-react

const Contact = () => {
  const [contact, setContact] = useState({ address: "", phone_no: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContact = async () => {
    setLoading(false); // Assuming logic for now
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
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Get in <span className="text-blue-600">Touch.</span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Have questions? We're here to help. Reach out via any of the channels below or visit our campus.
            </p>
          </div>
        </section>

        {/* Info & Map Section */}
        <section className="pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-blue-100 border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h2>
                
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-12 bg-slate-100 rounded-xl"></div>
                    <div className="h-12 bg-slate-100 rounded-xl"></div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Address Item */}
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <MapPin size={24} />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Our Location</p>
                        <p className="text-lg text-slate-700 font-medium mt-1">{contact.address || "Kathmandu, Nepal"}</p>
                      </div>
                    </div>

                    {/* Phone Item */}
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                        <Phone size={24} />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                        <p className="text-lg text-slate-700 font-medium mt-1">{contact.phone_no || "+977 1-XXXXXXX"}</p>
                      </div>
                    </div>

                    {/* Email Item */}
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                        <Mail size={24} />
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                        <p className="text-lg text-slate-700 font-medium mt-1">{contact.email || "info@ksc.edu.np"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-4 mt-10">
                    <a href={`tel:${contact.phone_no}`} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all active:scale-95">
                        <PhoneCall size={18} /> Call
                    </a>
                    <a href={`mailto:${contact.email}`} className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200">
                        <Send size={18} /> Email
                    </a>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-slate-900 p-8 rounded-3xl text-white flex items-center justify-between overflow-hidden relative">
                <div className="relative z-10">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                        <Clock size={20} className="text-blue-400" /> Office Hours
                    </h3>
                    <p className="text-slate-400">Sunday — Friday: 6:00 AM - 5:00 PM</p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                    <Clock size={120} />
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div className="lg:col-span-7">
              <div className="h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white relative group">
                <iframe
                  title="Campus Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.2223799272016!2d85.25711131506088!3d27.682404382771614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb2310c74d489f%3A0xee6ce7ebe3de9a8a!2sKathmandu%20Shiksha%20Campus!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"

                  className="w-full h-full grayscale-[20%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                {/* Decorative overlay */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/20 pointer-events-none">
                    <p className="text-slate-900 font-bold text-sm">Find us on Google Maps</p>
                    <p className="text-slate-500 text-xs">Navigate to our main administrative building</p>
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