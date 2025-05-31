// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function StudentLessonList({ chapterId }) {
//   const [lessons, setLessons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("access_token");
//   const navigate = useNavigate(); // ✅ navigation hook

//   useEffect(() => {
//     const fetchLessons = async () => {
//       if (!chapterId) return;

//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(
//           `http://localhost:8000/student/lesson/?chapterId=${chapterId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setLessons(response.data);
//       } catch (err) {
//         console.error("Error fetching lessons:", err);
//         setError("Failed to load lessons");
//         setLessons([]);
//       }

//       setLoading(false);
//     };

//     fetchLessons();
//   }, [chapterId]);

//   if (loading) return <p className="text-gray-600">Loading lessons...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;
//   if (lessons.length === 0) return <p className="text-gray-500">No lessons found.</p>;

//   return (
//     <div className="space-y-4">
//       {lessons.map((lesson) => (
//         <div
//           key={lesson.id}
//           className="border p-4 rounded-lg bg-white shadow cursor-pointer hover:bg-gray-100 transition"
//           onClick={() => navigate(`/student/lesson/${lesson.id}`)} // ✅ navigate on click
//         >
//           <h2 className="text-xl font-semibold text-gray-800">{lesson.lesson_name}</h2>
//           <p className="text-sm text-gray-600">Chapter: {lesson.chapter}</p>
//           <p className="text-sm text-gray-600">Approved: {lesson.is_approved ? "Yes" : "No"}</p>
//           {lesson.video && (
//             <video
//               src={lesson.video}
//               controls
//               className="mt-2 w-full max-w-md rounded"
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default StudentLessonList;


// =======================================================================





import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentLessonList({ chapterId }) {
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
          `http://localhost:8000/student/lesson/?chapterId=${chapterId}`,
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
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <p className="ml-3 text-gray-600 dark:text-gray-300 font-medium">Loading lessons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-4 rounded-md">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No lessons found</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Lessons will appear here once they're added to this chapter.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lessons</h2>
        <p className="text-gray-600 dark:text-gray-400">{lessons.length} lesson{lessons.length !== 1 ? 's' : ''} available</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/20 cursor-pointer transition-all duration-200 overflow-hidden hover:scale-[1.02]"
            onClick={() => navigate(`/student/lesson/${lesson.id}`)}
          >
            {/* Video Preview */}
            {lesson.video && (
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
                <video
                  src={lesson.video}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors duration-200">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* No Video Placeholder */}
            {!lesson.video && (
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-blue-400 dark:text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">No Video Available</p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{index + 1}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                    {lesson.lesson_name}
                  </h3>
                </div>
              </div>

              {/* Meta Information */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="truncate">Chapter: {lesson.chapter}</span>
                </div>

                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    lesson.is_approved 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    <svg className={`w-3 h-3 mr-1 ${
                      lesson.is_approved ? 'text-green-500 dark:text-green-400' : 'text-yellow-500 dark:text-yellow-400'
                    }`} fill="currentColor" viewBox="0 0 20 20">
                      {lesson.is_approved ? (
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      )}
                    </svg>
                    {lesson.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Action Indicator */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">Click to view lesson</span>
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentLessonList;