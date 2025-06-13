// No subjects found for this course









import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Users, Clock, ChevronRight } from "lucide-react";
import TeacherSubjectList from "./TeacherSubjectList";

function TeacherCourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/teacher/course/?courseId=${courseId}`,
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
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 -mt-20">
      <div className="container mx-auto px-4 py-8 max-w-full ">
        {/* Stats Cards */}


        {/* Subjects Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-lg flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 ">Subjects in {course.course_name}</h2>
          </div>
                    <div className="bg-white backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden shadow-2xl">
            <div className="p-8 ">
              <TeacherSubjectList courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseDetail;
