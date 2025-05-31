// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function TeacherCourseList() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("access_token"); // token stored here

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/teacher/course",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setCourses(response.data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       setCourses([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
//         <h1 className="text-2xl font-bold mb-4">Courses List</h1>

//         {loading ? (
//           <div className="text-center py-10">Loading courses...</div>
//         ) : (
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="py-2 px-4 text-left">#</th>
//                 <th className="py-2 px-4 text-left">Course Name</th>
//               </tr>
//             </thead>
// <tbody>
//   {courses.length === 0 ? (
//     <tr>
//       <td colSpan="2" className="text-center py-4 text-gray-500">
//         No courses found
//       </td>
//     </tr>
//   ) : (
//     courses.map((course, index) => (
//       <tr key={course.id} className="border-t">
//         <td className="py-2 px-4">{index + 1}</td>
//         <td className="py-2 px-4 text-blue-600 hover:underline">
//           <Link to={`/teacher/course/${course.id}`}>{course.course_name}</Link>
//         </td>
//       </tr>
//     ))
//   )}
// </tbody>

//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TeacherCourseList;




// =========================================================


import { useEffect, useState } from "react";

function TeacherCourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token"); // token stored here

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Simulated API call for demo purposes
      setTimeout(() => {
        setCourses([
          { id: 1, course_name: "Advanced React Development" },
          { id: 2, course_name: "Data Structures & Algorithms" },
          { id: 3, course_name: "Machine Learning Fundamentals" },
          { id: 4, course_name: "Web Design Principles" }
        ]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            My Courses
          </h1>
          <p className="text-gray-400 text-lg">Manage and explore your teaching courses</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Glass Effect Header */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-semibold text-white">Course Dashboard</h2>
              </div>
              <div className="text-sm text-gray-400">
                {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <span className="text-gray-300 text-lg">Loading courses...</span>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden">
              {courses.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No courses found</h3>
                  <p className="text-gray-500">Start by creating your first course</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-700/50">
                  {courses.map((course, index) => (
                    <a 
                      key={course.id} 
                      href={`/teacher/course/${course.id}`}
                      className="block group"
                    >
                      <div className="p-6 hover:bg-gray-700/30 transition-all duration-300 transform hover:scale-[1.01]">
                        <div className="flex items-center space-x-4">
                          {/* Course Number Badge */}
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                              {index + 1}
                            </div>
                          </div>
                          
                          {/* Course Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 truncate">
                              {course.course_name}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                              Click to view course details
                            </p>
                          </div>
                          
                          {/* Arrow Icon */}
                          <div className="flex-shrink-0">
                            <svg 
                              className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Hover Effect Line */}
                        <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {courses.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm">
                Successfully loaded {courses.length} course{courses.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherCourseList;