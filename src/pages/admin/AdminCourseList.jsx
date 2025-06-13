// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function AdminCourseList() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("access_token"); // token stored here

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/adminuser/study/course/",
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
//           <Link to={`/course/${course.id}`}>{course.course_name}</Link>
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

// export default AdminCourseList;


// ============================================================



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { BookOpen, Users, Clock, ChevronRight } from "lucide-react";

// function TeacherCourseList() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("access_token"); // token stored here

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/adminuser/study/course/",
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
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="container mx-auto px-4 py-8 max-w-6xl">
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
//             <BookOpen className="w-8 h-8 text-gray-700" />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">My Courses</h1>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Manage and explore your teaching courses with our comprehensive dashboard
//           </p>
//           <div className="w-20 h-1 bg-gray-900 mx-auto mt-6 rounded-full"></div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
//             <div className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Total Courses</p>
//                   <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
//                 </div>
//                 <div className="p-3 bg-gray-100 rounded-lg">
//                   <BookOpen className="w-6 h-6 text-gray-700" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
//             <div className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Active Students</p>
//                   <p className="text-2xl font-bold text-gray-900">2,847</p>
//                 </div>
//                 <div className="p-3 bg-gray-100 rounded-lg">
//                   <Users className="w-6 h-6 text-gray-700" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
//             <div className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Total Hours</p>
//                   <p className="text-2xl font-bold text-gray-900">156h</p>
//                 </div>
//                 <div className="p-3 bg-gray-100 rounded-lg">
//                   <Clock className="w-6 h-6 text-gray-700" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Card */}
//         <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
//           <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-lg">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                 <h2 className="text-xl font-semibold text-gray-900">Course Dashboard</h2>
//               </div>
//               <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
//                 {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
//               </div>
//             </div>
//           </div>

//           <div className="p-0">
//             {loading ? (
//               <div className="p-12 text-center">
//                 <div className="inline-flex items-center space-x-3">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
//                   <span className="text-gray-600 text-lg">Loading courses...</span>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 {courses.length === 0 ? (
//                   <div className="p-12 text-center text-gray-600">
//                     <svg className="mx-auto mb-4 w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
//                     </svg>
//                     <h3 className="text-xl font-medium mb-2">No courses found</h3>
//                     <p>Start by creating your first course</p>
//                   </div>
//                 ) : (
//                   <div>
//                     {courses.map((course, index) => (
//                       <Link
//                         key={course.id}
//                         to={`/admin/course/${course.id}`}
//                         className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 border-b border-gray-200 transition-colors duration-200 last:border-b-0"
//                       >
//                         <div className="flex items-center space-x-4">
//                           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                             {index + 1}
//                           </div>
//                           <div>
//                             <h3 className="text-lg font-semibold text-gray-900 truncate">{course.course_name}</h3>
//                             <p className="text-gray-500 text-sm">Click to view course details</p>
//                           </div>
//                         </div>
//                         <ChevronRight className="w-5 h-5 text-gray-400" />
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TeacherCourseList;


// =============================================================


import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookOpen, Users, Clock, ChevronRight, Plus } from "lucide-react";

function TeacherCourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token"); // token stored here

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/adminuser/study/course/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
            <BookOpen className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">My Courses</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage and explore your teaching courses with our comprehensive dashboard
          </p>
          <div className="w-20 h-1 bg-gray-900 mx-auto mt-6 rounded-full"></div>

          {/* Create Course Button */}
          <div className="mt-6">
            <Link
              to="/admin/create-course"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Course
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Students</p>
                  <p className="text-2xl font-bold text-gray-900">2,847</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Hours</p>
                  <p className="text-2xl font-bold text-gray-900">156h</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Clock className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-900">Course Dashboard</h2>
              </div>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {courses.length} {courses.length === 1 ? "Course" : "Courses"}
              </div>
            </div>
          </div>

          <div className="p-0">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                  <span className="text-gray-600 text-lg">Loading courses...</span>
                </div>
              </div>
            ) : (
              <>
                {courses.length === 0 ? (
                  <div className="p-12 text-center text-gray-600">
                    <svg
                      className="mx-auto mb-4 w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
                      />
                    </svg>
                    <h3 className="text-xl font-medium mb-2">No courses found</h3>
                    <p>Start by creating your first course</p>
                  </div>
                ) : (
                  <div>
                    {courses.map((course, index) => (
                      <Link
                        key={course.id}
                        to={`/admin/course/${course.id}`}
                        className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 border-b border-gray-200 transition-colors duration-200 last:border-b-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {course.course_name}
                            </h3>
                            <p className="text-gray-500 text-sm">Click to view course details</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseList;
