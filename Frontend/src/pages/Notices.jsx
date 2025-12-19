import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const getViewerType = (fileUrl) => {
    if (!fileUrl) return "none";
    if (fileUrl.endsWith(".pdf")) return "pdf";
    if (fileUrl.match(/\.(jpg|jpeg|png|webp)$/i)) return "image";
    if (fileUrl.match(/\.(doc|docx|ppt|pptx|xls|xlsx)$/i)) return "office";
    return "download"; // fallback
  };

  const getOfficeViewerUrl = (fileUrl) => {
    // Use Microsoft Office Viewer (works for PPT, DOC, XLS)
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
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
                    className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition hover:scale-105"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-3">
                      {notice.title}
                    </h3>

                    {notice.fileUrl && (
                      <button
                        onClick={() => {
                          setSelectedNotice(notice);
                          setIsModalOpen(true);
                        }}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                      >
                        Open Notice
                      </button>
                    )}

                    <p className="text-sm text-gray-400 mt-4">
                      Posted on: {new Date(notice.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <Footer />

        {/* Modal Viewer */}
        {isModalOpen && selectedNotice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-11/12 sm:w-3/4 lg:w-2/3 p-4 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
              >
                ✖
              </button>

              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                {selectedNotice.title}
              </h3>

              {getViewerType(selectedNotice.fileUrl) === "pdf" && (
                <iframe
                  src={selectedNotice.fileUrl}
                  width="100%"
                  height="600px"
                  title={selectedNotice.title}
                  className="border"
                />
              )}

              {getViewerType(selectedNotice.fileUrl) === "image" && (
                <img
                  src={selectedNotice.fileUrl}
                  alt={selectedNotice.title}
                  className="w-full rounded-lg"
                />
              )}

              {getViewerType(selectedNotice.fileUrl) === "office" && (
                <iframe
                  src={getOfficeViewerUrl(selectedNotice.fileUrl)}
                  width="100%"
                  height="600px"
                  title={selectedNotice.title}
                  className="border"
                />
              )}

              {getViewerType(selectedNotice.fileUrl) === "download" && (
                <a
                  href={selectedNotice.fileUrl}
                  download={selectedNotice.fileName || selectedNotice.title}
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
                >
                  Download File
                </a>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Notices;
