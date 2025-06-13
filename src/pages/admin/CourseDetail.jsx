// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import SubjectList from "./SubjectList";  // Adjust path as necessary

// function CourseDetail() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/adminuser/study/course/${id}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setCourse(response.data);
//       } catch (error) {
//         console.error("Error fetching course detail:", error);
//         setCourse(null);
//       }
//       setLoading(false);
//     };

//     fetchCourse();
//   }, [id]);

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
//             <SubjectList courseId={id} />
//           </>
//         ) : (
//           <p className="text-red-600">Course not found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CourseDetail;










// ==============================================














import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Users, Clock, ChevronRight } from "lucide-react";
import SubjectList from "./SubjectList";
// import TeacherSubjectList from "./TeacherSubjectList";


function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/adminuser/study/course/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course detail:", error);
        setCourse(null);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 text-lg animate-pulse">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <h2 className="text-2xl font-semibold mb-2">Course Not Found</h2>
          <p>Please check the course ID or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 max-w-full">
      <div className="container mx-auto px-4 py-8 max-w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
            <BookOpen className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{course.course_name}</h1>
          <p className="text-gray-600 text-lg max-w-full mx-auto">
            Overview of the course and its associated subjects
          </p>
          <div className="w-20 h-1 bg-gray-900 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 ">
          <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Course Code</p>
                <p className="text-xl font-bold text-gray-900">{course.course_code || 'N/A'}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Subjects</p>
                <p className="text-xl font-bold text-gray-900">{course.subjects?.length || 0}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Users className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Hours</p>
                <p className="text-xl font-bold text-gray-900">{course.total_hours || 'N/A'}h</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Clock className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-w-full">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-lg flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Subjects in this Course</h2>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
              {course.subjects?.length || 0} Subjects
            </span>
          </div>

          <div className="divide-y divide-gray-200">
            {course.subjects?.length > 0 ? (
              course.subjects.map((subject, idx) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-gray-900">{subject.subject_name}</h3>
                      <p className="text-sm text-gray-500">{subject.description || 'No description'}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-600">
                <p>No subjects found for this course.</p>
              </div>
            )}
          </div>
                    <div className="bg-gradient-to-br from-black/70 to-gray-900/70 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
            <div className="p-8 ">
              {/* <TeacherSubjectList courseId={courseId} /> */}
              <SubjectList courseId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
