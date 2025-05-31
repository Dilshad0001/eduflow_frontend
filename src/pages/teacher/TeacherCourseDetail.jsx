// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import TeacherSubjectList from "./TeacherSubjectList";
// // import SubjectList from "./SubjectList";  // Adjust path as necessary

// function TeacherCourseDetail() {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         console.log(courseId);
        
//         const response = await axios.get(
//           `http://localhost:8000/teacher/course/?courseId=${courseId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log(response.data);
        
//         setCourse(response.data);
//       } catch (error) {
//         console.error("Error fetching course detail:", error);
//         setCourse(null);
//       }
//       setLoading(false);
//     };

//     fetchCourse();
//   }, [courseId]);

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
//         {loading ? (
//           <div>Loading course detail...</div>
//         ) : course ? (
//           <>
//             <h1 className="text-2xl font-bold mb-2">Course Detail</h1>
//             <p className="text-lg">Course Name: {course.course_name}</p>
//             <h2 className="text-xl font-semibold mt-6">Subjects</h2>
//             <TeacherSubjectList courseId={courseId} />
//           </>
//         ) : (
//           <p className="text-red-600">Course not found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TeacherCourseDetail;


// ===========================================================





import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TeacherSubjectList from "./TeacherSubjectList";
// import SubjectList from "./SubjectList";  // Adjust path as necessary

function TeacherCourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log(courseId);
        
        const response = await axios.get(
          `http://localhost:8000/teacher/course/?courseId=${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course detail:", error);
        setCourse(null);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-600/40 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-blue-600/30 border-b-blue-500 rounded-full animate-spin animate-reverse"></div>
          <div className="absolute inset-2 w-16 h-16 border-2 border-indigo-600/20 border-r-indigo-400 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="mt-6 text-center">
            <p className="text-gray-300 font-medium animate-pulse">Loading course details...</p>
            <div className="mt-2 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-400"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-28 h-28 mx-auto bg-gradient-to-br from-red-600/30 to-red-900/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-600/50 shadow-2xl">
            <svg className="w-14 h-14 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-100 mb-2">Course Not Found</h2>
            <p className="text-gray-400 text-lg">The requested course could not be located or may have been removed.</p>
          </div>
          <div className="pt-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/50">
              <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-500 text-sm">Error Code: 404</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-emerald-600/6 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10 p-6 space-y-10">
        {/* Course Details Card */}
        <div className="max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-500">
          <div className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-800/60 relative overflow-hidden group">
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1500"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-purple-600/30 transition-shadow duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                    Course Details
                  </h1>
                  <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2"></div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-purple-600/15 to-blue-600/15 rounded-2xl border border-purple-600/30 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-purple-300 font-semibold uppercase tracking-wider">Course Name</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-100 ml-9">{course.course_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Course Subjects
                </h2>
                <p className="text-gray-500 mt-1">Explore all subjects in this course</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
              <div className="w-4 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black/70 to-gray-900/70 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
            <div className="p-8">
              <TeacherSubjectList courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseDetail;