import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/admin/result";

const AdminResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
 
  // Form states   
  const [title, setTitle] = useState("");
  const [faculty, setFaculty] = useState("Management");
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Fetch results
  const fetchResults = async () => {
    try {
      const res = await axios.get(API);
      setResults(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // CREATE / UPDATE handler
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title || !file) return alert("Title and Image are required");

  setLoading(true);
  const formData = new FormData();
  formData.append("title", title);
  formData.append("faculty", faculty);
  formData.append("year", year);
  formData.append("description", description);
  formData.append("image", file); // <-- match multer field name

  try {
    if (editingResult) {
      await axios.put(`${API}/${editingResult._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditingResult(null);
    } else {
      
      console.log(Object.fromEntries(formData));
      await axios.post(API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    // Reset form
    setTitle("");
    setFaculty("Management");
    setYear(new Date().getFullYear());
    setDescription("");
    setFile(null);

    fetchResults();
  } catch (err) {
    console.error("Create Result Error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to upload result");
  } finally {
    setLoading(false);
  }
};

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchResults();
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT
  const handleEdit = (res) => {
    setEditingResult(res);
    setTitle(res.title);
    setFaculty(res.faculty);
    setYear(res.year);
    setDescription(res.description);
    setFile(null);
  };

  return (
    <div className="pt-28 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-700">Manage Results</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-700">
            {editingResult ? "Edit Result" : "Post New Result"}
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <select
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="Management">Management</option>
            <option value="Education">Education</option>
          </select>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-1/4"
          >
            {loading ? "Saving..." : editingResult ? "Update" : "Create"}
          </button>
        </form>

        {/* Results Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
          {results.length === 0 ? (
            <p className="text-center text-gray-500">No results posted yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Faculty</th>
                  <th className="p-2 border">Year</th>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res) => (
                  <tr key={res._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{res.title}</td>
                    <td className="p-2">{res.faculty}</td>
                    <td className="p-2">{res.year}</td>
                    <td className="p-2">
                      <a
                        href={res.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(res)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(res._id)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminResult;
