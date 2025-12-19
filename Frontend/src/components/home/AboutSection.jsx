import React, { useEffect, useState } from "react";
import axios from "axios";

const AboutSection = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/about")
      .then((res) => {
        if (res.data.success) {
          setAbout(res.data.data);
        }
      })
      .catch((err) => console.error("About fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Loading about page...
      </div>
    );
  }

  if (!about) return null;

  return (
    <div className="space-y-16">
      {/* ================= Banner ================= */}
      {about.bannerImage && (
        <div className="w-full h-[220px] sm:h-[320px] md:h-[420px] rounded-xl overflow-hidden">
          <img
            src={about.bannerImage}
            alt="About Banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ================= Chairman ================= */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {about.chairmanMessage?.name}
          </h2>
          <p className="text-sm text-blue-600 mt-1">
            {about.chairmanMessage?.designation}
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {about.chairmanMessage?.message}
          </p>
        </div>

        {about.chairmanMessage?.photo && (
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src={about.chairmanMessage.photo}
              alt="Chairman"
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover shadow-lg"
            />
          </div>
        )}
      </section>

      {/* ================= Campus Chief ================= */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        {about.campusChiefMessage?.photo && (
          <div className="flex justify-center">
            <img
              src={about.campusChiefMessage.photo}
              alt="Campus Chief"
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover shadow-lg"
            />
          </div>
        )}

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {about.campusChiefMessage?.name}
          </h2>
          <p className="text-sm text-green-600 mt-1">
            {about.campusChiefMessage?.designation}
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {about.campusChiefMessage?.message}
          </p>
        </div>
      </section>

      {/* ================= Mission / Vision / History ================= */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Our Mission
          </h3>
          <p className="text-gray-600">{about.mission}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Our Vision
          </h3>
          <p className="text-gray-600">{about.vision}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Our History
          </h3>
          <p className="text-gray-600">{about.history}</p>
        </div>
      </section>

      {/* ================= Why Choose Us ================= */}
      {about.whyChooseUs?.length > 0 && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-10">
            Why Choose Us
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt=""
                    className="w-10 h-10 mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= Extra Sections ================= */}
      {about.extraSections?.map((sec, index) => (
        <section
          key={index}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {sec.sectionTitle}
            </h2>
            <p className="mt-4 text-gray-600">{sec.content}</p>
          </div>

          {sec.image && (
            <img
              src={sec.image}
              alt=""
              className="rounded-xl shadow object-cover"
            />
          )}
        </section>
      ))}
    </div>
  );
};

export default AboutSection;
