import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "../../components/common/StudentCard";

const Placement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // for better error handling

  const fetchPlacements = async () => {
    try {
      // Correct backend URL
      const res = await axios.get("http://localhost:5000/api/placement");     
        
      if (!res.data.success){
          console.log("the data fetch failed! and the status is ", res.data.success)
      }

        // console.log("the response is: ",res)

      // Map backend data safely
      // const data = (res.data.data || []).map((item) => ({
      //   name: item.studentName || "Unknown",
      //   position: item.position || "N/A",
      //   faculty: item.faculty || "N/A",
      //   year: item.year || "N/A",
      //   photo: item.photoUrl || "https://via.placeholder.com/150", // fallback photo
      // }));


      console.log("the placement data is: ", res.data)
      setStudents(res.data?.placements);
    } catch (err) {
      console.error("Error fetching placements:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500 animate-pulse">
        Loading placements...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
      </div>
    );
  }

  return (
     <div>
    {students.length === 0 ? (
      <p>No placements found.</p>
    ) : (
       students.map((student, idx) => <StudentCard key={idx} student={student} />)
    )}
  </div>
  );
};

export default Placement;
