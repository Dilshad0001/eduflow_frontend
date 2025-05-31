// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const StudentSubmissionView = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       const token = localStorage.getItem("access_token");

//       if (!token) {
//         setError("You are not logged in.");
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:8000/student/submission/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setSubmissions(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load submissions. Redirecting to create profile...");
//         // Navigate to create profile page after short delay
//         setTimeout(() => {
//           navigate("/student/createprofile");
//         }, 1500);
//       }
//     };

//     fetchSubmissions();
//   }, [navigate]);

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Assignment Submissions</h1>
//       {error && <p className="text-red-600">{error}</p>}

//       {submissions.length === 0 && !error ? (
//         <p className="text-gray-600">No submissions found.</p>
//       ) : (
//         <div className="space-y-4">
//           {submissions.map((submission) => (
//             <div key={submission.id} className="p-4 border rounded-lg shadow">
//               <h2 className="text-xl font-semibold text-indigo-700">
//                 📘 {submission.assignment}
//               </h2>
//               <p className="text-sm text-gray-600">
//                 Submitted at: {new Date(submission.submitted_at).toLocaleString()}
//               </p>
//               <p className="mt-1">
//                 Status:{" "}
//                 <span className="font-semibold text-blue-600">{submission.status}</span>
//               </p>
//               {submission.mark !== null && (
//                 <p className="mt-1">
//                   Mark:{" "}
//                   <span className="text-green-600 font-semibold">{submission.mark}</span>
//                 </p>
//               )}
//               {submission.file && (
//                 <a
//                   href={submission.file}
//                   className="text-blue-500 underline mt-2 block"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   📎 View Submitted File
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentSubmissionView;


// ============================================================



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentSubmissionView = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/student/submission/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmissions(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load submissions. Redirecting to create profile...");
        // Navigate to create profile page after short delay
        setTimeout(() => {
          navigate("/student/createprofile");
        }, 1500);
      }
    };

    fetchSubmissions();
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'graded':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getMarkColor = (mark) => {
    if (mark >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (mark >= 80) return 'text-green-600 dark:text-green-400';
    if (mark >= 70) return 'text-yellow-600 dark:text-yellow-400';
    if (mark >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent">
                  Assignment Submissions
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mt-1">
                  Track your submitted assignments and grades
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded-r-lg shadow-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-red-700 dark:text-red-300 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* No Submissions State */}
        {submissions.length === 0 && !error ? (
          <div className="text-center py-16">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/50 p-12 max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
                No Submissions Yet
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Your submitted assignments will appear here once you start submitting them.
              </p>
            </div>
          </div>
        ) : (
          /* Submissions Grid */
          <div className="grid gap-6 md:gap-8">
            {submissions.map((submission, index) => (
              <div 
                key={submission.id} 
                className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-slate-800/80"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="p-8">
                  {/* Assignment Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                          {submission.assignment}
                        </h2>
                        <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Submitted {new Date(submission.submitted_at).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(submission.status)} shadow-md`}>
                      {submission.status}
                    </div>
                  </div>

                  {/* Submission Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {/* Mark Display */}
                      {submission.mark !== null && (
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-300 font-medium">Grade</span>
                            <div className="flex items-center space-x-2">
                              <span className={`text-3xl font-bold ${getMarkColor(submission.mark)}`}>
                                {submission.mark}
                              </span>
                              <span className="text-slate-500 dark:text-slate-400">/100</span>
                            </div>
                          </div>
                          {/* Grade Bar */}
                          <div className="mt-3 bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                submission.mark >= 90 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                                submission.mark >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                submission.mark >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                submission.mark >= 60 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                                'bg-gradient-to-r from-red-400 to-red-600'
                              }`}
                              style={{ width: `${Math.min(submission.mark, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* File Attachment */}
                    {submission.file && (
                      <div className="flex justify-end">
                        <a
                          href={submission.file}
                          className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span>View Submission</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Border Accent */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default StudentSubmissionView;