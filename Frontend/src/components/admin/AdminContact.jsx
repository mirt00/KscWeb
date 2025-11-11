// src/components/admin/AdminContact.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [current, setCurrent] = useState({ address: "", phone_no: "", email: "", _id: null });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/contact");
      if (data.success) setContacts(data.contacts);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => setCurrent({ ...current, [e.target.name]: e.target.value });

  const handleSaveOrUpdate = async () => {
    if (!current.address || !current.phone_no || !current.email) return setMessage("All fields are required");
    setLoading(true);
    try {
      const method = current._id ? "put" : "post";
      const url = current._id
        ? `http://localhost:5000/api/contact/${current._id}`
        : "http://localhost:5000/api/contact";

      const { data } = await axios({ method, url, data: current });
      setMessage(data.message);
      setCurrent({ address: "", phone_no: "", email: "", _id: null });
      fetchContacts();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error saving contact");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact) => setCurrent(contact);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      const { data } = await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setMessage(data.message);
      fetchContacts();
    } catch (err) {
      console.error(err);
      setMessage("Error deleting contact");
    }
  };

  return (
    <div className="ml-72 mt-24 p-6"> {/* Adjusted for sidebar width and top header */}
      {/* Page Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-8 text-center">
        Admin Contact Management
      </h2>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-10 max-w-md mx-auto hover:shadow-xl transition">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5 text-center">
          {current._id ? "Edit Contact" : "Add New Contact"}
        </h3>

        <div className="space-y-4">
          <input
            type="text"
            name="address"
            value={current.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="phone_no"
            value={current.phone_no}
            onChange={handleChange}
            placeholder="Phone +977..."
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={current.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSaveOrUpdate}
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full text-lg"
        >
          {current._id ? "Update Contact" : "Save Contact"}
        </button>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition overflow-x-auto max-w-3xl mx-auto">
        <table className="table-auto border-collapse border border-gray-200 text-left w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border">Address</th>
              <th className="px-6 py-3 border">Phone</th>
              <th className="px-6 py-3 border">Email</th>
              <th className="px-6 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No contacts found
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 border">{c.address}</td>
                  <td className="px-6 py-4 border">{c.phone_no}</td>
                  <td className="px-6 py-4 border">{c.email}</td>
                  <td className="px-6 py-4 border flex gap-3">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-yellow-500 text-white px-4 py-4 rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-600 text-white px-4 py-4 rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContact;
