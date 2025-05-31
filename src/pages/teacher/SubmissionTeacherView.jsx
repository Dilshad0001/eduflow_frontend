// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function SubmissionTeacherView() {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [keyword, setKeyword] = useState("");
//   const [error, setError] = useState(null);

//   // Fetch submissions from backend
//   const fetchSubmissions = async (searchKeyword = "") => {
//     setLoading(true);
//     setError(null);
//     try {
//       const url = searchKeyword
//         ? `http://localhost:8000/teacher/submission/?submission=${encodeURIComponent(searchKeyword)}`
//         : "http://localhost:8000/teacher/submission/";

//       const response = await axios.get(url, {
//         headers: {
//           // If you have a token, add it here
//           // Authorization: `Bearer ${token}`,
//         },
//       });
//       setSubmissions(response.data);
//     } catch (err) {
//       setError("Failed to fetch submissions.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   // Handle search form submit
//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchSubmissions(keyword);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Assignment Submissions</h1>

//       <form onSubmit={handleSearch} className="mb-6 flex">
//         <input
//           type="text"
//           placeholder="Search by student or task name"
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition"
//         >
//           Search
//         </button>
//       </form>

//       {loading && <p>Loading submissions...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && submissions.length === 0 && <p>No submissions found.</p>}

//       {!loading && submissions.length > 0 && (
//         <table className="w-full table-auto border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2 text-left">Student</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Assignment</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">File</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Submitted At</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Mark</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((sub) => (
//               <tr key={sub.id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-4 py-2">{sub.student}</td>
//                 <td className="border border-gray-300 px-4 py-2">{sub.assignment}</td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {sub.file ? (
//                     <a href={sub.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                       View File
//                     </a>
//                   ) : (
//                     "No file"
//                   )}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">{new Date(sub.submitted_at).toLocaleString()}</td>
//                 <td className="border border-gray-300 px-4 py-2">{sub.status}</td>
//                 <td className="border border-gray-300 px-4 py-2">{sub.mark ?? "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


// ======================================================================



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function SubmissionTeacherView() {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [keyword, setKeyword] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const fetchSubmissions = async (searchKeyword = "") => {
//     setLoading(true);
//     setError(null);

//     // const token = localStorage.getItem("token"); // Get the token from localStorage
//     const token = localStorage.getItem("access_token");
//     try {
//       const url = searchKeyword
//         ? `http://localhost:8000/teacher/submission/?submission=${encodeURIComponent(searchKeyword)}`
//         : "http://localhost:8000/teacher/submission";

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Attach token here
//         },
//       });

//       setSubmissions(response.data);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         setError("Unauthorized access. Please login again.");
//         // Optional: redirect to login page on unauthorized
//         navigate("/login");
//       } else {
//         setError("Failed to fetch submissions.");
//       }
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   // Debounce search keyword input
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchSubmissions(keyword);
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [keyword]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchSubmissions(keyword);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Assignment Submissions</h1>

//       <form onSubmit={handleSearch} className="mb-6 flex" role="search">
//         <input
//           type="text"
//           placeholder="Search by student or task name"
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           aria-label="Search submissions"
//           className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           aria-label="Submit search"
//           className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition"
//         >
//           Search
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             setKeyword("");
//             fetchSubmissions();
//           }}
//           aria-label="Clear search"
//           className="ml-2 bg-gray-300 px-3 rounded hover:bg-gray-400"
//         >
//           Clear
//         </button>
//       </form>

//       {loading && <p>Loading submissions...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && submissions.length === 0 && <p>No submissions found.</p>}

//       {!loading && submissions.length > 0 && (
//         <table
//           className="w-full table-auto border-collapse border border-gray-300"
//           role="table"
//         >
//           <thead>
//             <tr className="bg-gray-100">
//               <th
//                 scope="col"
//                 className="border border-gray-300 px-4 py-2 text-left"
//               >
//                 Student
//               </th>
//               <th
//                 scope="col"
//                 className="border border-gray-300 px-4 py-2 text-left"
//               >
//                 Assignment
//               </th>
//               <th
//                 scope="col"
//                 className="border border-gray-300 px-4 py-2 text-left"
//               >
//                 File
//               </th>
//               <th
//                 scope="col"
//                 className="border border-gray-300 px-4 py-2 text-left"
//               >
//                 Submitted At
//               </th>
//               <th
//                 scope="col"
//                 className="border border-gray-300 px-4 py-2 text-left"
//               >
//                 Status
//               </th>
//               <th
//                 scope="col"
//                 className="border border-gray-300 px-4 py-2 text-left"
//               >
//                 Mark
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((sub) => (
//               <tr
//                 key={sub.id}
//                 className="hover:bg-gray-50 cursor-pointer"
//                 onClick={() => navigate(`/teacher/submission/${sub.id}`)}
//               >
//                 <td className="border border-gray-300 px-4 py-2">{sub.student}</td>
//                 <td className="border border-gray-300 px-4 py-2">{sub.assignment}</td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {sub.file ? (
//                     <a
//                       href={sub.file}
//                       onClick={(e) => e.stopPropagation()} // prevent row click when clicking link
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       View File
//                     </a>
//                   ) : (
//                     "No file"
//                   )}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {new Date(sub.submitted_at).toLocaleString()}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">{sub.status}</td>
//                 <td className="border border-gray-300 px-4 py-2">{sub.mark ?? "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
// =======================================================

















import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SubmissionTeacherView() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const fetchSubmissions = async (searchKeyword = "") => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError("Unauthorized access. Please log in.");
      navigate("/login");
      setLoading(false);
      return;
    }

    try {
      const url = searchKeyword
        ? `http://localhost:8000/teacher/submission/?search=${encodeURIComponent(searchKeyword)}` // Changed parameter name to 'search' for generality
        : "http://localhost:8000/teacher/submission";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubmissions(response.data);
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
      if (err.response?.status === 401) {
        setError("Session expired or unauthorized. Please log in again.");
        navigate("/login");
      } else if (err.response?.status === 404) {
        setError("No submissions found for the current user or search.");
      } else {
        setError("Failed to fetch submissions. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []); // Empty dependency array means this runs once on mount

  // Debounce search keyword input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSubmissions(keyword);
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce); // Cleanup on unmount or keyword change
  }, [keyword, token]); // Add token to dependency array to re-fetch if token changes

  const handleClearSearch = () => {
    setKeyword("");
    // fetchSubmissions(); // No need to call this here, useEffect for keyword will handle it
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "text-yellow-400 font-medium";
      case "Graded":
        return "text-green-400 font-medium";
      case "Late":
        return "text-red-400 font-medium";
      default:
        return "text-gray-400 font-medium";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-400 leading-tight">
          Assignment Submissions
        </h1>

        <form onSubmit={(e) => { e.preventDefault(); fetchSubmissions(keyword); }} className="mb-8 flex flex-col sm:flex-row gap-3" role="search">
          <input
            type="text"
            placeholder="Search by student or assignment name..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="Search submissions by student or assignment name"
            className="flex-grow bg-gray-800 border border-gray-700 rounded-lg px-5 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out shadow-sm"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              aria-label="Submit search"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search"
              className="bg-gray-700 text-indigo-300 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Clear
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <p className="text-indigo-400 text-xl font-medium animate-pulse">
              Loading submissions...
            </p>
          </div>
        )}

        {error && (
          <div
            className="bg-red-900 border border-red-700 text-red-300 px-5 py-4 rounded-lg mb-6 shadow-md"
            role="alert"
          >
            <strong className="font-bold">Error:</strong> {error}
          </div>
        )}

        {!loading && submissions.length === 0 && !error && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center mt-10 border border-gray-700">
            <p className="text-gray-400 text-xl font-medium">
              No submissions found for the current search criteria.
            </p>
          </div>
        )}

        {!loading && submissions.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-700">
            <table
              className="w-full text-left text-gray-200"
              role="table"
            >
              <thead className="bg-gray-700 uppercase text-gray-300 text-sm">
                <tr>
                  <th scope="col" className="px-6 py-3 font-semibold tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold tracking-wider">
                    Assignment
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold tracking-wider">
                    File
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold tracking-wider">
                    Submitted At
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold tracking-wider">
                    Mark
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate(`/teacher/submission/${sub.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-indigo-300 font-medium">
                      {sub.student} {/* Assuming `student_name` is available */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-300">
                      {sub.assignment} {/* Assuming `assignment_name` is available */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {sub.file ? (
                        <a
                          href={sub.file}
                          onClick={(e) => e.stopPropagation()} // prevent row click when clicking link
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline font-medium inline-flex items-center"
                        >
                          View File
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                        </a>
                      ) : (
                        <span className="text-gray-500 italic">No file</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(sub.submitted_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusColor(sub.status)}>{sub.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-400 font-semibold">
                      {sub.mark ?? "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}