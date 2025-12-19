import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/notice");
        setNotices(res.data.notices || []);
      } catch (err) {
        console.error("Error fetching notices:", err);
        setError("Failed to load notices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Helper to handle opening files in a new tab
  const handleOpenNotice = (fileUrl) => {
    if (!fileUrl) return;

    const extension = fileUrl.split('.').pop().toLowerCase();
    const officeExtensions = ["doc", "docx", "ppt", "pptx", "xls", "xlsx"];

    let finalUrl = fileUrl;

    // If it's an Office document, wrap it in Microsoft's viewer URL
    if (officeExtensions.includes(extension)) {
      finalUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`;
    }

    // Open the URL in a new browser tab
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-gray-50 pt-28 sm:pt-32">
        <section className="grow container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-6 sm:mb-8">
            Campus Notices
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 px-4">
            Stay informed with the latest updates and announcements from{" "}
            <span className="font-semibold text-blue-600">Kathmandu Shiksha Campus</span>.
          </p>

          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            {loading ? (
              <p className="text-center text-gray-500 animate-pulse">Loading notices...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : notices.length === 0 ? (
              <p className="text-center text-gray-500">No notices available at the moment.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notices.map((notice) => (
                  <li
                    key={notice._id}
                    className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition hover:scale-105 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-3">
                        {notice.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Posted on: {new Date(notice.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {notice.fileUrl && (
                      <button
                        onClick={() => handleOpenNotice(notice.fileUrl)}
                        className="w-full text-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                      >
                        View Notice
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Notices;