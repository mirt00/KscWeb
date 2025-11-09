// src/pages/Contact.jsx
import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Contact = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen flex flex-col">
        <section className="pt-28 pb-16 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-blue-700 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Visit our campus or reach out to us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-blue-700 mb-6">
                Get in Touch
              </h3>
              <div className="space-y-5 text-gray-700 text-base leading-relaxed">
                <p>
                  <span className="font-semibold text-blue-600">Address:</span><br />
                  Kathmandu Shiksha Campus,<br />
                  Chandragiri-10, Satungal, Kathmandu, Nepal
                </p>
                <p>
                  <span className="font-semibold text-blue-600">Phone:</span><br />
                  +977 01-1234567
                </p>
                <p>
                  <span className="font-semibold text-blue-600">Email:</span><br />
                  info@ksc.edu.np
                </p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
              <iframe
                title="Kathmandu Shiksha Campus Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.2223799272016!2d85.25711131506088!3d27.682404382771614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb2310c74d489f%3A0xee6ce7ebe3de9a8a!2sKathmandu%20Shiksha%20Campus!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Contact;
