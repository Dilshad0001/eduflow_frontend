// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const StudentPendingTaks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // 👈 Hook for navigation

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const token = localStorage.getItem("access_token");

//       if (!token) {
//         setError("You are not logged in.");
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:8000/student/task/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTasks(res.data);
//       } catch (err) {
//         console.error("Fetch tasks error:", err);
//         setError("Failed to load tasks. Please check your login.");
//         navigate("/student/createprofile");
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleSubmitClick = (taskId) => {
//     // 👇 Navigate to the submission page with taskId as query param or route param
//     navigate(`/student/tasks/submit/${taskId}`);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Assignment Tasks</h1>
//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       {tasks.length === 0 && !error ? (
//         <p className="text-gray-600">No assignments found.</p>
//       ) : (
//         <div className="space-y-4">
//           {tasks.map(task => (
//             <div key={task.id} className="p-4 border rounded-lg shadow hover:shadow-md transition">
//               <h2 className="text-xl font-semibold text-indigo-700">{task.task_name}</h2>
//               <p className="text-gray-700 mt-1">{task.description}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Uploaded: {task.uploaded_at} | Deadline:{" "}
//                 {new Date(task.submission_deadline).toLocaleString()}
//               </p>
//               {task.task_file && (
//                 <a
//                   href={task.task_file}
//                   className="text-blue-600 underline mt-2 block"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   📎 Download Task File
//                 </a>
//               )}
//               <p className="text-sm text-gray-600 mt-2">
//                 Students: {task.students.map(s => s.full_name).join(", ")}
//               </p>
//               {task.blocked_students && (
//                 <p className="text-sm text-red-500 mt-1">
//                   Blocked Students: {task.blocked_students.map(s => s.full_name).join(", ")}
//                 </p>
//               )}

//               {/* Submit Button */}
//               <button
//                 onClick={() => handleSubmitClick(task.id)}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Submit Assignment
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentPendingTaks;


// ===========================================================================




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentPendingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/student/task/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data);
        setError("");
      } catch (err) {
        console.error("Fetch tasks error:", err);
        setError("Failed to load tasks. Please check your login.");
        navigate("/student/createprofile");
      }
      setLoading(false);
    };

    fetchTasks();
  }, [navigate]);

  const handleSubmitClick = (taskId) => {
    navigate(`/student/tasks/submit/${taskId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const getDaysUntilDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
            <p className="ml-4 text-lg text-gray-600 dark:text-gray-300 font-medium">Loading your assignments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignment Tasks</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {tasks.length} assignment{tasks.length !== 1 ? 's' : ''} pending
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 dark:text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {tasks.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Assignments Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You don't have any pending assignments at the moment.</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        )}

        {/* Tasks Grid */}
        {tasks.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map(task => {
              const daysLeft = getDaysUntilDeadline(task.submission_deadline);
              const overdue = isOverdue(task.submission_deadline);
              
              return (
                <div key={task.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 overflow-hidden">
                  {/* Task Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 mr-3">
                        {task.task_name}
                      </h2>
                      <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                        overdue 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : daysLeft <= 3
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {overdue ? 'Overdue' : daysLeft <= 0 ? 'Due Today' : `${daysLeft} days left`}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                      {task.description}
                    </p>

                    {/* Task File */}
                    {task.task_file && (
                      <a
                        href={task.task_file}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium mb-4 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Task File
                      </a>
                    )}
                  </div>

                  {/* Task Details */}
                  <div className="px-6 pb-4 space-y-3">
                    {/* Dates */}
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Uploaded: {formatDate(task.uploaded_at)}</span>
                    </div>

                    <div className={`flex items-center text-sm ${
                      overdue ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Deadline: {formatDate(task.submission_deadline)}</span>
                    </div>

                    {/* Students */}
                    {task.students && task.students.length > 0 && (
                      <div className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <span className="line-clamp-2">
                          Assigned to: {task.students.map(s => s.full_name).join(", ")}
                        </span>
                      </div>
                    )}

                    {/* Blocked Students */}
                    {task.blocked_students && task.blocked_students.length > 0 && (
                      <div className="flex items-start text-sm text-red-600 dark:text-red-400">
                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                        </svg>
                        <span className="line-clamp-2">
                          Blocked: {task.blocked_students.map(s => s.full_name).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={() => handleSubmitClick(task.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Submit Assignment
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPendingTasks;