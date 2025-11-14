import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminNoticeList() {
  const [notices, setNotices] = useState([]);
  const [editingNotice, setEditingNotice] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000/api/v1/notice";

  // Allowed file types
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/zip",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  // Fetch notices
  const fetchNotices = async () => {
    try {
      const res = await axios.get(API);
      setNotices(res.data.notices);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
      alert("Error fetching notices. Check console.");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Create new notice
  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!newTitle || !newFile) {
      alert("Title and file are required");
      return;
    }
    if (!allowedTypes.includes(newFile.type)) {
      alert("Unsupported file type!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("file", newFile);

      await axios.post(API, formData);
      setNewTitle("");
      setNewFile(null);
      fetchNotices();
    } catch (error) {
      console.error("Failed to create notice:", error);
      alert(error?.response?.data?.message || "Failed to create notice");
    }
    setLoading(false);
  };

  // Delete notice
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchNotices();
    } catch (error) {
      console.error("Failed to delete notice:", error);
      alert("Failed to delete notice. Check console.");
    }
  };

  // Save edit
  const handleEditSave = async () => {
    if (!newTitle) {
      alert("Title cannot be empty");
      return;
    }
    if (newFile && !allowedTypes.includes(newFile.type)) {
      alert("Unsupported file type!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      if (newFile) formData.append("file", newFile);

      await axios.put(`${API}/${editingNotice._id}`, formData);
      setEditingNotice(null);
      setNewFile(null);
      fetchNotices();
    } catch (error) {
      console.error("Failed to update notice:", error);
      alert(error?.response?.data?.message || "Failed to update notice");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 ml-80 mt-20 space-y-6">
      <h1 className="text-2xl font-bold">Manage Notices</h1>

      {/* CREATE NOTICE */}
      <form
        onSubmit={handleCreateNotice}
        className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 max-w-md"
      >
        <h2 className="text-lg font-semibold">Post New Notice</h2>

        <input
          type="text"
          placeholder="Notice Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="file"
          onChange={(e) => setNewFile(e.target.files[0])}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-2xl w-auto mx-auto text-sm"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {/* NOTICE TABLE */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">File</th>
              <th className="p-3 border">Published Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{notice.title}</td>
                <td className="p-3">
                  {notice.fileUrl ? (
                    <a
                      href={notice.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View File
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>
                <td className="p-3">
                  {new Date(notice.createdAt).toLocaleDateString()}{" "}
                  {new Date(notice.createdAt).toLocaleTimeString()}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingNotice(notice);
                      setNewTitle(notice.title);
                    }}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-4 rounded-lg shadow-lg space-y-3">
            <h2 className="text-lg font-semibold">Edit Notice</h2>

            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border p-2 w-full rounded"
            />

            <input
              type="file"
              onChange={(e) => setNewFile(e.target.files[0])}
              className="border p-2 w-full rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingNotice(null)}
                className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={handleEditSave}
                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  