// src/pages/Contact.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Contact = () => {
  const [contact, setContact] = useState({ address: "", phone_no: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch contact info from backend
  const fetchContact = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get("http://localhost:5000/api/contact");
      if (data.success && data.contacts && data.contacts.length > 0) {
        setContact(data.contacts[0]);
      } else {
        setContact({ address: "", phone_no: "", email: "" });
        setError("No contact information found.");
      }
    } catch (err) {
      console.error("Error fetching contact:", err.message);
      setError("Failed to fetch contact information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-gray-50">
        <section className="pt-32 pb-16 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-3">
              Contact Us
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
              Reach out to us directly or visit our campus. We are here to help!
            </p>
          </div>

          {/* Contact + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Contact Card */}
            <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col justify-center hover:shadow-2xl transition-all">
              <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-6">
                Get in Touch
              </h2>

              {loading ? (
                <p className="text-gray-500 animate-pulse">Loading contact info...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="w-32 font-semibold text-blue-600">Address:</span>
                    <span className="sm:ml-4">{contact.address || "Not available"}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="w-32 font-semibold text-blue-600">Phone:</span>
                    <span className="sm:ml-4">{contact.phone_no || "Not available"}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="w-32 font-semibold text-blue-600">Email:</span>
                    <span className="sm:ml-4">{contact.email || "Not available"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Google Map */}
            <div className="rounded-3xl overflow-hidden shadow-xl h-72 sm:h-96 lg:h-full transition hover:shadow-2xl">
              <iframe
                title="Kathmandu Shiksha Campus Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.2223799272016!2d85.25711131506088!3d27.682404382771614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb2310c74d489f%3A0xee6ce7ebe3de9a8a!2sKathmandu%20Shiksha%20Campus!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
