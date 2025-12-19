import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/admin/placement";

const AdminPlacement = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  // Form states
  const [studentName, setStudentName] = useState("");
  const [position, setPosition] = useState("");
  const [faculty, setFaculty] = useState("Management");
  const [year, setYear] = useState(new Date().getFullYear());
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  // Fetch placements
  const fetchPlacements = async () => {
    try {
      const res = await axios.get(API);

      // Support backend response with or without `data` wrapper
     console.log("The data is",res.data )
      setPlacements(res.data?.placements );
    } catch (err) {
      console.error(err);
      setError("Failed to fetch placements");
    }
  };

  useEffect(() => { fetchPlacements(); }, []);

  // Create / Update placement
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !position || (!photo && !editing)) return alert("Required fields missing");

    setLoading(true);
    const formData = new FormData();
    formData.append("studentName", studentName);
    formData.append("position", position);
    formData.append("faculty", faculty);
    formData.append("year", year);
    formData.append("company", company);
    formData.append("description", description);
    if (photo) formData.append("photo", photo);

    try {
      if (editing) {
        await axios.put(`${API}/${editing._id}`, formData);
      } else {
        await axios.post(API, formData);
      }

      // Reset form
      setStudentName(""); setPosition(""); setFaculty("Management"); setYear(new Date().getFullYear());
      setCompany(""); setDescription(""); setPhoto(null); setEditing(null);

      fetchPlacements();
    } catch (err) {
      console.error(err);
      setError("Failed to save placement");
    }
    setLoading(false);
  };

  // Delete placement
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this placement?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchPlacements();
    } catch (err) {
      console.error(err);
      setError("Failed to delete placement");
    }
  };

  // Edit placement
  const handleEdit = (p) => {
    setEditing(p);
    setStudentName(p.studentName);
    setPosition(p.position);
    setFaculty(p.faculty);
    setYear(p.year);
    setCompany(p.company);
    setDescription(p.description);
    setPhoto(null);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Manage Placements</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* Form */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-md space-y-3 max-w-lg mx-auto"
      >
        <h2 className="text-lg font-semibold text-center">{editing ? "Edit Placement" : "Add Placement"}</h2>

        <input 
          type="text" placeholder="Student Name" value={studentName} 
          onChange={e => setStudentName(e.target.value)} 
          className="border p-2 rounded w-full"
        />
        <input 
          type="text" placeholder="Position" value={position} 
          onChange={e => setPosition(e.target.value)} 
          className="border p-2 rounded w-full"
        />
        <select value={faculty} onChange={e => setFaculty(e.target.value)} className="border p-2 rounded w-full">
          <option value="Management">Management</option>
          <option value="Education">Education</option>
        </select>
        <input 
          type="number" value={year} onChange={e => setYear(e.target.value)} 
          className="border p-2 rounded w-full"
        />
        <input 
          type="text" placeholder="Company" value={company} 
          onChange={e => setCompany(e.target.value)} 
          className="border p-2 rounded w-full"
        />
        <textarea 
          placeholder="Description" value={description} 
          onChange={e => setDescription(e.target.value)} 
          className="border p-2 rounded w-full"
        />
        <input 
          type="file" onChange={e => setPhoto(e.target.files[0])} 
          className="border p-2 rounded w-full"
        />
        <button 
          type="submit" disabled={loading} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-1/4"
        >
          {loading ? "Saving..." : editing ? "Update" : "Create"}
        </button>
      </form>

      {/* Placements Table */}
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        {placements.length === 0 ? (
          <p className="text-center">No placements yet.</p>
        ) : (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Position</th>
                <th className="p-2 border">Faculty</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Photo</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {placements.map(p => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{p.studentName}</td>
                  <td className="p-2">{p.position}</td>
                  <td className="p-2">{p.faculty}</td>
                  <td className="p-2">{p.year}</td>
                  <td className="p-2">{p.company}</td>
                  <td className="p-2">
                    <a href={p.photoUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPlacement;
