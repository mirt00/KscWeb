import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      if (!adminInfo) return navigate("/admin/login");

      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${adminInfo.token}` },
        });
        setMessage(data.message);
      } catch (err) {
        navigate("/admin/login");
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">{message}</p>
    </div>
  );
};

export default AdminDashboard;
