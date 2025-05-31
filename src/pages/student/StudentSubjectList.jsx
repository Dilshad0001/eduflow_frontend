// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const StudentSubjectList = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // console.log(courseId);
    
//     // if (!courseId) return; // Skip if no course ID

//     const fetchSubjects = async () => {
//       setLoading(true);
//       const token = localStorage.getItem("access_token");

//       if (!token) {
//         setError("No authorization token found. Please login.");
//         setLoading(false);
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await axios.get("http://127.0.0.1:8000/student/subject", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log(response.data);
        
//         setSubjects(response.data);
//         setError('');
//       } catch (err) {
//         console.error("Error fetching subjects:", err);
//         setError("Failed to fetch subjects. Make sure you're logged in and the course ID is valid.");
//         setSubjects([]);
//         navigate("/student/createprofil");
//       }

//       setLoading(false);
//     };

//     fetchSubjects();
//   }, [ navigate]);

//   if (loading) return <p className="text-gray-600 text-center">Loading subjects...</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-xl mt-6">
//       <h2 className="text-2xl font-bold mb-4 text-center">📚 My Subjects</h2>

//       {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//       {subjects.length === 0 && !error ? (
//         <p className="text-gray-600 text-center">No subjects found for this course.</p>
//       ) : (
//         <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//           {subjects.map((subject) => (
//             <li
//               key={subject.id}
//               className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition"
//             >
//               <Link to={`/student/subject/${subject.id}`} className="block">
//                 <h3 className="font-semibold text-lg text-gray-800">{subject.subject_name}</h3>
//                 <p className="text-sm text-gray-600 mt-1">Course: {subject.course}</p>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default StudentSubjectList;


// ==============================================================


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const StudentSubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No authorization token found. Please login.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/student/subject", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        
        setSubjects(response.data);
        setError('');
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError("Failed to fetch subjects. Make sure you're logged in and the course ID is valid.");
        setSubjects([]);
        navigate("/student/createprofile");
      }

      setLoading(false);
    };

    fetchSubjects();
  }, [navigate]);

  // Loading Component
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-600 border-t-emerald-400 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-teal-400 rounded-full animate-spin animate-reverse mx-auto"></div>
          </div>
          <p className="text-gray-300 font-medium animate-pulse">Loading your subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/25 mb-6">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            My Learning Journey
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore your enrolled subjects and continue your educational adventure
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-900/20 border-l-4 border-red-400 p-6 rounded-r-xl shadow-sm backdrop-blur-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-red-300 font-medium">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {subjects.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full mb-6">
              <span className="text-4xl opacity-50">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-3">No Subjects Found</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              It looks like you haven't enrolled in any subjects yet. Contact your administrator to get started.
            </p>
            <button 
              onClick={() => navigate('/student/profile')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-emerald-500/25"
            >
              View Profile
            </button>
          </div>
        )}

        {/* Subjects Grid */}
        {subjects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subjects.map((subject, index) => (
              <Link 
                key={subject.id} 
                to={`/student/subject/${subject.id}`}
                className="group block"
              >
                <div className="relative h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-gray-700/50 overflow-hidden">
                  {/* Card Header with Gradient */}
                  <div className="h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    {/* Subject Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110 ${
                        index % 4 === 0 ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                        index % 4 === 1 ? 'bg-gradient-to-br from-teal-500 to-teal-600' :
                        index % 4 === 2 ? 'bg-gradient-to-br from-cyan-500 to-cyan-600' :
                        'bg-gradient-to-br from-green-500 to-green-600'
                      }`}>
                        <span className="text-white text-lg font-bold">
                          {subject.subject_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Subject Name */}
                    <h3 className="font-bold text-lg text-gray-100 mb-2 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
                      {subject.subject_name}
                    </h3>

                    {/* Course Info */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                      <p className="text-sm text-gray-300 font-medium">
                        {subject.course}
                      </p>
                    </div>

                    {/* Progress Bar (Decorative) */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-400">Progress</span>
                        <span className="text-xs font-medium text-gray-300">
                          {Math.floor(Math.random() * 40) + 60}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            index % 4 === 0 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                            index % 4 === 1 ? 'bg-gradient-to-r from-teal-500 to-teal-600' :
                            index % 4 === 2 ? 'bg-gradient-to-r from-cyan-500 to-cyan-600' :
                            'bg-gradient-to-r from-green-500 to-green-600'
                          }`}
                          style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-teal-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {subjects.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 bg-gray-800/60 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-gray-700/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-100">{subjects.length}</div>
                <div className="text-sm text-gray-400">Total Subjects</div>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">Active</div>
                <div className="text-sm text-gray-400">Status</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSubjectList;