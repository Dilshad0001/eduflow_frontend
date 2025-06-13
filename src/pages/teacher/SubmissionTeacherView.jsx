

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function SubmissionTeacherView() {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [keyword, setKeyword] = useState("");
//   const [error, setError] = useState(null);
//   const [filterStatus, setFilterStatus] = useState('all');

//   const navigate = useNavigate();
//   const token = localStorage.getItem("access_token");

//   const fetchSubmissions = async (searchKeyword = "") => {
//     setLoading(true);
//     setError(null);

//     if (!token) {
//       setError("Unauthorized access. Please log in.");
//       navigate("/login");
//       setLoading(false);
//       return;
//     }

//     try {
//       const url = searchKeyword
//         ? `http://localhost:8000/teacher/submission/?search=${encodeURIComponent(searchKeyword)}`
//         : "http://localhost:8000/teacher/submission";

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSubmissions(response.data);
//     } catch (err) {
//       console.error("Failed to fetch submissions:", err);
//       if (err.response?.status === 401) {
//         setError("Session expired or unauthorized. Please log in again.");
//         navigate("/login");
//       } else if (err.response?.status === 404) {
//         setError("No submissions found for the current user or search.");
//       } else {
//         setError("Failed to fetch submissions. Please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

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

//   const handleClearSearch = () => {
//     setKeyword("");
//   };

//   const getStatusInfo = (status) => {
//     switch (status) {
//       case "Submitted":
//         return { color: "bg-yellow-100 text-yellow-800", label: "Submitted" };
//       case "Graded":
//         return { color: "bg-green-100 text-green-800", label: "Graded" };
//       case "Late":
//         return { color: "bg-red-100 text-red-800", label: "Late" };
//       default:
//         return { color: "bg-gray-100 text-gray-800", label: "Unknown" };
//     }
//   };

//   const getStatusBorderClass = (status) => {
//     switch (status) {
//       case "Submitted":
//         return "border-l-4 border-yellow-500";
//       case "Graded":
//         return "border-l-4 border-green-500";
//       case "Late":
//         return "border-l-4 border-red-500";
//       default:
//         return "border-l-4 border-gray-500";
//     }
//   };

//   const filteredSubmissions = submissions.filter(submission => {
//     if (filterStatus === 'all') return true;
//     return submission.status.toLowerCase() === filterStatus.toLowerCase();
//   });

//   const getInitials = (name) => {
//     return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
//   };

//   if (loading && submissions.length === 0)
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex justify-center items-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
//           <p className="text-white text-2xl font-semibold animate-pulse">
//             Loading submissions...
//           </p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-600 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-full mx-auto">
//         {/* Dashboard Container */}
//         <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          
//           {/* Header */}
//           <div className="flex flex-col lg:flex-row justify-between items-center mb-8 pb-6 border-b-2 border-gray-200">
//             <h1 className="text-4xl font-bold text-gray-800 mb-4 lg:mb-0">
//               📄 Assignment Submissions
//             </h1>
//             <div className="flex items-center gap-6">
//               {/* Stats */}
//               <div className="hidden sm:flex gap-4">
//                 <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl text-center shadow-lg">
//                   <div className="text-2xl font-bold">{submissions.length}</div>
//                   <div className="text-sm opacity-90">Total Submissions</div>
//                 </div>
//                 <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl text-center shadow-lg">
//                   <div className="text-2xl font-bold">
//                     {submissions.filter(s => s.status === 'Graded').length}
//                   </div>
//                   <div className="text-sm opacity-90">Graded</div>
//                 </div>
//                 <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-2xl text-center shadow-lg">
//                   <div className="text-2xl font-bold">
//                     {submissions.filter(s => s.status === 'Submitted').length}
//                   </div>
//                   <div className="text-sm opacity-90">Pending</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Search and Filters */}
//           <div className="mb-8 space-y-4">
//             {/* Search Form */}
//             <form onSubmit={handleSearch} className="flex max-w-2xl mx-auto">
//               <div className="flex-1 relative">
//                 <input
//                   type="text"
//                   placeholder="Search by student or assignment name..."
//                   value={keyword}
//                   onChange={(e) => setKeyword(e.target.value)}
//                   className="w-full px-6 py-4 border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-l-2xl text-gray-700 placeholder-gray-400"
//                 />
//                 <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 font-semibold transition-all duration-300"
//               >
//                 Search
//               </button>
//               <button
//                 type="button"
//                 onClick={handleClearSearch}
//                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 font-semibold rounded-r-2xl transition-all duration-300"
//               >
//                 Clear
//               </button>
//             </form>

//             {/* Filter Buttons */}
//             <div className="flex justify-center gap-4 flex-wrap">
//               {[
//                 { key: 'all', label: 'All Submissions' },
//                 { key: 'submitted', label: 'Submitted' },
//                 { key: 'graded', label: 'Graded' },
//                 { key: 'late', label: 'Late' }
//               ].map(filter => (
//                 <button
//                   key={filter.key}
//                   onClick={() => setFilterStatus(filter.key)}
//                   className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:-translate-y-1 ${
//                     filterStatus === filter.key
//                       ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
//                       : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md'
//                   }`}
//                 >
//                   {filter.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
//               <p className="text-red-700 font-medium">{error}</p>
//             </div>
//           )}

//           {/* Submissions Grid */}
//           {filteredSubmissions.length === 0 ? (
//             <div className="text-center py-16">
//               <div className="text-6xl mb-4">📋</div>
//               <p className="text-gray-500 text-xl font-medium">
//                 {submissions.length === 0 ? 'No submissions found.' : 'No submissions match the current filter.'}
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filteredSubmissions.map((submission) => {
//                 const statusInfo = getStatusInfo(submission.status);
//                 return (
//                   <div
//                     key={submission.id}
//                     className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${getStatusBorderClass(submission.status)}`}
//                     onClick={() => navigate(`/teacher/submission/${submission.id}`)}
//                   >
//                     {/* Submission Header */}
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="flex items-center flex-1 mr-2">
//                         <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
//                           {getInitials(submission.student)}
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
//                             {submission.student}
//                           </h3>
//                           <p className="text-sm text-gray-500">Student</p>
//                         </div>
//                       </div>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusInfo.color}`}>
//                         {statusInfo.label}
//                       </span>
//                     </div>

//                     {/* Assignment Info */}
//                     <div className="mb-4 bg-gray-50 p-4 rounded-lg">
//                       <h4 className="text-sm font-medium text-gray-600 mb-1">Assignment:</h4>
//                       <p className="text-gray-800 font-semibold line-clamp-2" title={submission.assignment}>
//                         {submission.assignment}
//                       </p>
//                     </div>

//                     {/* Submission Meta */}
//                     <div className="grid grid-cols-1 gap-3 mb-4 text-sm">
//                       <div className="flex items-center text-gray-500">
//                         <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         Submitted: {new Date(submission.submitted_at).toLocaleDateString()} {new Date(submission.submitted_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                       </div>
                      
//                       {submission.mark && (
//                         <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
//                           <div className="flex items-center text-green-700">
//                             <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                             Mark Awarded:
//                           </div>
//                           <span className="text-green-800 font-bold text-lg">{submission.mark}</span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Actions */}
//                     <div className="flex justify-between items-center pt-4 border-t border-gray-100">
//                       {submission.file ? (
//                         <a
//                           href={submission.file}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-200"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                           View File
//                           <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                           </svg>
//                         </a>
//                       ) : (
//                         <span className="text-gray-400 text-sm italic">No file attached</span>
//                       )}
                      
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigate(`/teacher/submission/${submission.id}`);
//                         }}
//                         className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
//                       >
//                         View Details
//                         <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


























import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid3X3, List, Search, ChevronRight } from 'lucide-react';

export default function SubmissionTeacherView() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'

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
        ? `http://localhost:8000/teacher/submission/?search=${encodeURIComponent(searchKeyword)}`
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
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSubmissions(keyword);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSubmissions(keyword);
  };

  const handleClearSearch = () => {
    setKeyword("");
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "Submitted":
        return { color: "bg-yellow-50 text-yellow-700", label: "Submitted" };
      case "Graded":
        return { color: "bg-green-50 text-green-700", label: "Graded" };
      case "Late":
        return { color: "bg-red-50 text-red-700", label: "Late" };
      default:
        return { color: "bg-gray-50 text-gray-700", label: "Unknown" };
    }
  };

  const getStatusBorderClass = (status) => {
    switch (status) {
      case "Submitted":
        return "border-l-4 border-yellow-400";
      case "Graded":
        return "border-l-4 border-green-400";
      case "Late":
        return "border-l-4 border-red-400";
      default:
        return "border-l-4 border-gray-400";
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (filterStatus === 'all') return true;
    return submission.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderSubmissionCards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredSubmissions.map((submission) => {
        const statusInfo = getStatusInfo(submission.status);
        return (
          <div
            key={submission.id}
            className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-200 ${getStatusBorderClass(submission.status)}`}
            onClick={() => navigate(`/teacher/submission/${submission.id}`)}
          >
            {/* Submission Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center flex-1 mr-2">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  {getInitials(submission.student)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {submission.student}
                  </h3>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>

            {/* Assignment Info */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-1">Assignment:</h4>
              <p className="text-gray-800 font-semibold line-clamp-2" title={submission.assignment}>
                {submission.assignment}
              </p>
            </div>

            {/* Submission Meta */}
            <div className="grid grid-cols-1 gap-3 mb-4 text-sm">
              <div className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submitted: {new Date(submission.submitted_at).toLocaleDateString()} {new Date(submission.submitted_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              
              {submission.mark && (
                <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Mark Awarded:
                  </div>
                  <span className="text-green-800 font-bold text-lg">{submission.mark}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              {submission.file ? (
                <a
                  href={submission.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View File
                </a>
              ) : (
                <span className="text-gray-400 text-sm italic">No file attached</span>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/teacher/submission/${submission.id}`);
                }}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all duration-200"
              >
                View Details
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSubmissionList = () => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-semibold text-gray-900">Submission Dashboard</h2>
          </div>
          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
            {filteredSubmissions.length} {filteredSubmissions.length === 1 ? 'Submission' : 'Submissions'}
          </div>
        </div>
      </div>
      <div>
        {filteredSubmissions.map((submission) => {
          const statusInfo = getStatusInfo(submission.status);
          return (
            <div
              key={submission.id}
              onClick={() => navigate(`/teacher/submission/${submission.id}`)}
              className="flex items-center justify-between px-6 py-5 hover:bg-green-50 border-b border-gray-100 transition-all duration-200 last:border-b-0 group cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform ${
                  submission.status === 'Late' ? 'bg-red-500' :
                  submission.status === 'Submitted' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  {getInitials(submission.student)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                    {submission.student}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {submission.assignment}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {submission.mark && (
                  <div className="text-lg font-bold text-green-700">
                    {submission.mark}
                  </div>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (loading && submissions.length === 0)
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-green-500 mx-auto mb-4"></div>
          <p className="text-gray-700 text-2xl font-semibold animate-pulse">
            Loading submissions...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 -mt-24">
      <div className="max-w-full mx-auto">
        {/* Dashboard Container */}
        <div className="bg-gray-100 rounded-lg shadow-md p-8 max-w-full">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 pb-6 border-b-2 border-gray-200 h-15">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 lg:mb-0">
            </h1>
            <div className="flex items-center gap-6">
              {/* Stats */}
              <div className="hidden sm:flex gap-4">
                <div className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-center shadow-sm">
                  <div className="text-2xl font-bold">{submissions.length}</div>
                  <div className="text-sm text-gray-500">Total Submissions</div>
                </div>
                <div className="bg-white border-2 border-green-200 text-gray-700 px-6 py-3 rounded-lg text-center shadow-sm">
                  <div className="text-2xl font-bold">
                    {submissions.filter(s => s.status === 'Graded').length}
                  </div>
                  <div className="text-sm text-gray-500">Graded</div>
                </div>
                <div className="bg-white border-2 border-yellow-200 text-gray-700 px-6 py-3 rounded-lg text-center shadow-sm">
                  <div className="text-2xl font-bold">
                    {submissions.filter(s => s.status === 'Submitted').length}
                  </div>
                  <div className="text-sm text-gray-500">Pending</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by student or assignment name..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-l-lg text-gray-700 placeholder-gray-400"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 font-semibold transition-all duration-300"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleClearSearch}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 font-semibold rounded-r-lg transition-all duration-300"
              >
                Clear
              </button>
            </form>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 flex-wrap items-center">
              {/* View Mode Toggle */}
              <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center ${
                    viewMode === 'card'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center ${
                    viewMode === 'list'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4 mr-1" />
                  List
                </button>
              </div>

              {/* Filter Buttons */}
              {[
                { key: 'all', label: 'All Submissions' },
                { key: 'submitted', label: 'Submitted' },
                { key: 'graded', label: 'Graded' },
                { key: 'late', label: 'Late' }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setFilterStatus(filter.key)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    filterStatus === filter.key
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300 hover:shadow-sm'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Submissions Grid/List */}
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 text-xl font-medium">
                {submissions.length === 0 ? 'No submissions found.' : 'No submissions match the current filter.'}
              </p>
            </div>
          ) : (
            viewMode === 'card' ? renderSubmissionCards() : renderSubmissionList()
          )}
        </div>
      </div>
    </div>
  );
}