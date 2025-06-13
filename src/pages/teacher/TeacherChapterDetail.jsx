import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LessonList from "./LessonList";
import TeacherLessonList from "./TeacherLessonList";

function TeacherChapterDetail() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/teacher/chapter/?chapterId=${chapterId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("res==",response.data);
        
        setChapter(response.data);
      } catch (err) {
        console.error("Error fetching chapter:", err);
        setChapter(null);
      }
      setLoading(false);
    };

    fetchChapter();
  }, [chapterId, token]);
  console.log("chapter==",chapter);
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-300/50 border-t-slate-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-gray-200/50 border-b-gray-500 rounded-full animate-spin animate-reverse"></div>
          <div className="mt-4 text-center">
            <p className="text-slate-600 font-medium animate-pulse">Loading chapter...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-50 to-orange-50 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-200">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-700">Chapter Not Found</h2>
          <p className="text-slate-500">The requested chapter could not be located.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-to-br from-slate-50 via-gray-50 to-slate-100 -mt-10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-100/40 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative  px-1 py-0.5  space-y-40 max-w-full">
        {/* Chapter Details Card */}
        <div className="max-w-full mx-auto transform hover:scale-[1.02] transition-all duration-300">
          <div className="bg-gray-100 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-slate-200/80 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            
            {/* Content */}
            <div className="relative z-10  ">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">lessons of {chapter.chapter_name}</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="max-w-full mx-auto ">          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/80 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 -mt-35 pt-0">
            <TeacherLessonList chapterId={chapterId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherChapterDetail;