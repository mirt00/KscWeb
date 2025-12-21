// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StudentCard from "../../components/common/StudentCard";

// const Placement = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(""); // for better error handling

//   const fetchPlacements = async () => {
//     try {
//       // Correct backend URL
//       const res = await axios.get("http://localhost:5000/api/placement");     
        
//       if (!res.data.success){
//           console.log("the data fetch failed! and the status is ", res.data.success)
//       }

//         // console.log("the response is: ",res)

//       // Map backend data safely
//       // const data = (res.data.data || []).map((item) => ({
//       //   name: item.studentName || "Unknown",
//       //   position: item.position || "N/A",
//       //   faculty: item.faculty || "N/A",
//       //   year: item.year || "N/A",
//       //   photo: item.photoUrl || "https://via.placeholder.com/150", // fallback photo
//       // }));


//       console.log("the placement data is: ", res.data)
//       setStudents(res.data?.placements);
//     } catch (err) {
//       console.error("Error fetching placements:", err);
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlacements();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center mt-20 text-gray-500 animate-pulse">
//         Loading placements...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-20 text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return (
//      <div>
//     {students.length === 0 ? (
//       <p>No placements found.</p>
//     ) : (
//        students.map((student, idx) => <StudentCard key={idx} student={student} />)
//     )}
//   </div>
//   );
// };

// export default Placement;
import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "../../components/common/StudentCard";
import { GraduationCap, Trophy, Users } from "lucide-react";

const Placement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlacements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/placement");
      if (res.data?.success) {
        setStudents(res.data.placements);
      }
    } catch (err) {
      setError("Unable to load placement data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#3F1536] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#3F1536] font-bold animate-pulse">Loading Success Stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      {/* ===== HERO SECTION ===== */}
      <div className="bg-[#3F1536] py-16 mb-12 text-white overflow-hidden relative rounded-3xl">
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
            <GraduationCap size={400} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 ">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8A45D]/20 rounded-full border border-[#C8A45D]/30 mb-6">
            <Trophy size={18} className="text-[#C8A45D]" />
            <span className="text-[#C8A45D] text-xs font-black uppercase tracking-widest">Our Pride</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
            PLACEMENT <span className="text-[#C8A45D]">RECORDS</span>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
            Celebrating the outstanding achievements of our students who have secured 
            positions in leading institutions and organizations worldwide.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
            <p className="text-red-700 font-bold">{error}</p>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-500">No placements found yet.</h3>
            <p className="text-gray-400">Success stories are currently being updated.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {students.map((student, idx) => (
              <div 
                key={student._id || idx} 
                className="transform transition-all duration-500 hover:-translate-y-2"
              >
                <StudentCard student={student} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== STATISTICS FOOTER ===== */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="text-center">
            <h4 className="text-4xl font-black text-[#3F1536] mb-2">{students.length}+</h4>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Global Placements</p>
          </div>
          <div className="text-center border-y md:border-y-0 md:border-x border-gray-100 py-6 md:py-0">
            <h4 className="text-4xl font-black text-[#3F1536] mb-2">95%</h4>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Success Rate</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-black text-[#3F1536] mb-2">50+</h4>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Partner Companies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placement;