// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function StudentLessonDetail() {
//   const { lessonId } = useParams();
//   const [lesson, setLesson] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchLesson = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/student/lesson/?lessonId=${lessonId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setLesson(response.data);
//       } catch (err) {
//         console.error("Error fetching lesson:", err);
//         setLesson(null);
//       }
//       setLoading(false);
//     };

//     fetchLesson();
//   }, [lessonId, token]);

//   if (loading) return <p>Loading lesson...</p>;
//   if (!lesson) return <p>Lesson not found.</p>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
//         <h1 className="text-2xl font-bold mb-4">{lesson.lesson_name}</h1>
//         <p className="text-gray-600 mb-2">Chapter: {lesson.chapter}</p>
//         <p className="text-gray-600 mb-4">Approved: {lesson.is_approved ? "Yes" : "No"}</p>
//         {lesson.video && (
//           <video
//             src={lesson.video}
//             controls
//             className="mt-2 w-full max-w-md rounded"
//           />
//         )}
//         <p className="mt-4 text-gray-700">{lesson.description}</p>
//       </div>
//     </div>
//   );
// }

// export default StudentLessonDetail;


// ============================================================



import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function StudentLessonDetail() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/student/lesson/?lessonId=${lessonId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLesson(response.data);
      } catch (err) {
        console.error("Error fetching lesson:", err);
        setLesson(null);
      }
      setLoading(false);
    };

    fetchLesson();
  }, [lessonId, token]);

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 dark:border-emerald-800 rounded-full animate-spin border-t-emerald-600 dark:border-t-emerald-400 mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-emerald-400 dark:border-t-emerald-300 mx-auto"></div>
          </div>
          <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 animate-pulse">
            Loading lesson content...
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Preparing your learning materials
          </p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 flex items-center justify-center">
        <div className="text-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Lesson Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The requested lesson content is not available or may have been removed.
          </p>
          <div className="flex space-x-4 justify-center">
            <button 
              onClick={() => window.history.back()} 
              className="px-6 py-3 bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Go Back
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
      {/* Navigation Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Chapter</span>
              </button>
              <span className="text-slate-400 dark:text-slate-500">/</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{lesson.lesson_name}</span>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-all duration-200">
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-all duration-200">
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player Section */}
            {lesson.video && (
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl relative group">
                <div className="aspect-video relative">
                  <video
                    src={lesson.video}
                    controls
                    className="w-full h-full object-cover"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                  />
                  
                  {/* Video Overlay Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 text-white text-sm">
                          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                          <span>{isPlaying ? 'Playing' : 'Paused'}</span>
                        </div>
                      </div>
                      <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200 pointer-events-auto">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lesson Content */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 bg-gradient-to-r from-slate-900 to-emerald-700 dark:from-white dark:to-emerald-300 bg-clip-text text-transparent">
                    {lesson.lesson_name}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {lesson.chapter}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      lesson.is_approved 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700' 
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${lesson.is_approved ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      {lesson.is_approved ? 'Approved' : 'Pending Review'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">About this lesson</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lesson.description || "No description available for this lesson."}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Your Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Lesson Completion</span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">0%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 h-2 rounded-full transition-all duration-500" style={{width: '0%'}}></div>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Mark as Complete
                </button>
              </div>
            </div>

            {/* Lesson Info */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Lesson Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Lesson ID</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{lessonId}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Duration</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">~15 min</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Difficulty</span>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Intermediate</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Format</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Video + Text</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 text-left bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 flex items-center space-x-3">
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 10h6M9 14h6" />
                  </svg>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Take Notes</span>
                </button>
                <button className="w-full px-4 py-3 text-left bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 flex items-center space-x-3">
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ask Question</span>
                </button>
                <button className="w-full px-4 py-3 text-left bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 flex items-center space-x-3">
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Download Resources</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Speed Dial */}
      <div className="fixed bottom-8 right-8">
        <div className="relative group">
          <button className="w-14 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentLessonDetail;