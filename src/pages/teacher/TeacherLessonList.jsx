
// Lessons in this Chapter


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TeacherLessonList({ chapterId }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      if (!chapterId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8000/teacher/task/lesson/?chapterId=${chapterId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLessons(response.data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
        setError("Failed to load lessons");
        setLessons([]);
      }

      setLoading(false);
    };

    fetchLessons();
  }, [chapterId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">Loading lessons...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="bg-white border border-red-200 rounded-lg p-8 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-600 text-lg font-medium">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Lessons
              </h1>
              <div className="h-1 w-20 bg-gray-900 rounded-full mt-2"></div>
            </div>
            <button
              onClick={() => navigate("/teacher/lesson/add", { state: { chapterId } })}
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Lesson</span>
            </button>
          </div>

          {/* Empty State */}
          <div className="flex items-center justify-center h-96">
            <div className="text-center bg-white rounded-lg p-12 shadow-sm border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No lessons found</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Start building your course by creating your first lesson. Students are waiting to learn from you!
              </p>
              <button
                onClick={() => navigate("/teacher/lesson/add", { state: { chapterId } })}
                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Create First Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-1">
      <div className="max-w-full mx-auto ">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 ">
          <div>
            <p className="text-gray-600 mt-3 text-lg ">
              {lessons.length} lesson{lessons.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <button
            onClick={() => navigate("/teacher/newlesson/add", { state: { chapterId } })}
            className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Lesson</span>
          </button>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 hover:shadow-lg transition-all duration-200 group h-fit"
              onClick={() => navigate(`/teacher/lesson/${lesson.id}`)}
            >
              <div className="flex flex-col space-y-4">
                {/* Header with Icon and Title */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-200">
                      <svg className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Lesson Title */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-200 line-clamp-2">
                    {lesson.lesson_name}
                  </h2>
                </div>

                {/* Chapter and Status */}
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 font-medium">
                    Chapter: {lesson.chapter}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${lesson.is_approved ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className={`text-xs font-medium ${lesson.is_approved ? 'text-green-700' : 'text-yellow-700'}`}>
                      {lesson.is_approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                </div>

                {/* Video Section */}
                {lesson.video && (
                  <div className="mt-3">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <video
                        src={lesson.video}
                        controls
                        className="w-full rounded-md shadow-sm"
                        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='180' viewBox='0 0 300 180'%3E%3Crect width='300' height='180' fill='%23f3f4f6'/%3E%3Cg fill='%23374151' opacity='0.3'%3E%3Cpath d='M120 60l40 30L120 120V60z'/%3E%3C/g%3E%3C/svg%3E"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherLessonList;