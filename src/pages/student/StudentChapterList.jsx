// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function StudentChapterList({ subjectId }) {
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchChapters = async () => {
//       if (!subjectId) return;

//       setLoading(true);
//       setError(null);

//       try {
//         console.log("subjectid==",subjectId);
        
//         const response = await axios.get(
//           `http://localhost:8000/student/chapter/?subjectId=${subjectId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setChapters(response.data);
//       } catch (err) {
//         console.error("Error fetching chapters:", err);
//         setError("Failed to load chapters");
//         setChapters([]);
//       }
//       setLoading(false);
//     };

//     fetchChapters();
//   }, [subjectId, token]);

//   if (loading) return <p className="text-gray-600">Loading chapters...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;
//   if (chapters.length === 0) return <p className="text-gray-500">No chapters found.</p>;

//   return (
//     <ul className="list-disc list-inside space-y-2">
//       {chapters.map((chapter) => (
//         <li key={chapter.id}>
//           <Link
//             to={`/student/chapter/${chapter.id}`}
//             className="text-lg text-blue-600 hover:underline"
//           >
//             {chapter.chapter_name}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default StudentChapterList;


// =================================================================






// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function StudentChapterList({ subjectId }) {
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchChapters = async () => {
//       if (!subjectId) return;

//       setLoading(true);
//       setError(null);

//       try {
//         console.log("subjectid==", subjectId);
        
//         const response = await axios.get(
//           `http://localhost:8000/student/chapter/?subjectId=${subjectId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setChapters(response.data);
//       } catch (err) {
//         console.error("Error fetching chapters:", err);
//         setError("Failed to load chapters");
//         setChapters([]);
//       }
//       setLoading(false);
//     };

//     fetchChapters();
//   }, [subjectId, token]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center p-8">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
//         <p className="ml-3 text-gray-600 dark:text-gray-300 font-medium">Loading chapters...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-4 rounded-md">
//         <div className="flex">
//           <div className="ml-3">
//             <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (chapters.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
//           <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//           </svg>
//         </div>
//         <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No chapters found</p>
//         <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Chapters will appear here once they're added to this subject.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chapters</h3>
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//             {chapters.length} chapter{chapters.length !== 1 ? 's' : ''} available
//           </p>
//         </div>
        
//         <ul className="divide-y divide-gray-100 dark:divide-gray-700">
//           {chapters.map((chapter, index) => (
//             <li key={chapter.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
//               <Link
//                 to={`/student/chapter/${chapter.id}`}
//                 className="flex items-center px-6 py-4 group"
//               >
//                 <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-150">
//                   <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{index + 1}</span>
//                 </div>
                
//                 <div className="flex-1 min-w-0">
//                   <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
//                     {chapter.chapter_name}
//                   </h4>
//                 </div>
                
//                 <div className="flex-shrink-0 ml-4">
//                   <svg 
//                     className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-150" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default StudentChapterList;




// =====================================================









import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Clock, Play, CheckCircle, Lock, Star, Grid3X3, List } from "lucide-react";

function StudentChapterList({ subjectId }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCardView, setIsCardView] = useState(true); // Toggle state

  const token = localStorage.getItem("access_token");

  // Generate mock progress data for each chapter
  const getChapterProgress = (chapterId, index) => ({
    progress: Math.floor(Math.random() * 100),
    isCompleted: Math.random() > 0.6,
    isLocked: index > 2 && Math.random() > 0.7,
    duration: `${Math.floor(Math.random() * 45) + 15} min`,
    lessons: Math.floor(Math.random() * 8) + 3,
    rating: 4.2 + Math.random() * 0.8
  });

  // Chapter colors
  const getChapterColor = (index) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-emerald-500 to-emerald-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-teal-500 to-teal-600',
      'from-indigo-500 to-indigo-600',
      'from-rose-500 to-rose-600'
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchChapters = async () => {
      if (!subjectId) return;

      setLoading(true);
      setError(null);

      try {
        console.log("subjectid==", subjectId);
        
        const response = await axios.get(
          `http://localhost:8000/student/chapter/?subjectId=${subjectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChapters(response.data);
      } catch (err) {
        console.error("Error fetching chapters:", err);
        setError("Failed to load chapters");
        setChapters([]);
      }
      setLoading(false);
    };

    fetchChapters();
  }, [subjectId, token]);

  // Card View Component
  const CardView = () => (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {chapters.map((chapter, index) => {
        const progressData = getChapterProgress(chapter.id, index);
        
        return (
          <Link
            key={chapter.id}
            to={`/student/chapter/${chapter.id}`}
            className="group block"
          >
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 group-hover:border-blue-300 h-full">
              {/* Chapter Header */}
              <div className={`h-2 bg-gradient-to-r ${getChapterColor(index)}`}></div>
              
              {/* Chapter Content */}
              <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${getChapterColor(index)} rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
                      {progressData.isLocked ? (
                        <Lock className="w-4 h-4 text-white" />
                      ) : progressData.isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Ch. {index + 1}
                  </span>
                  {progressData.isCompleted && (
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Done
                    </span>
                  )}
                  {progressData.isLocked && (
                    <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                      Locked
                    </span>
                  )}
                </div>

                {/* Chapter Info */}
                <h3 className="font-bold text-base text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {chapter.chapter_name}
                </h3>

                {/* Progress Bar */}
                {!progressData.isLocked && (
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Progress</span>
                      <span className="text-xs font-medium text-gray-700">
                        {progressData.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${getChapterColor(index)} transition-all duration-500`}
                        style={{ width: `${progressData.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Chapter Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-4">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{progressData.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="w-3 h-3" />
                      <span>{progressData.lessons}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{progressData.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  {progressData.isLocked ? (
                    <button className="w-full py-2 px-3 bg-gray-100 text-gray-500 text-xs font-medium rounded-lg cursor-not-allowed">
                      Locked
                    </button>
                  ) : progressData.isCompleted ? (
                    <button className="w-full py-2 px-3 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                      Review
                    </button>
                  ) : progressData.progress > 0 ? (
                    <button className="w-full py-2 px-3 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Continue
                    </button>
                  ) : (
                    <button className="w-full py-2 px-3 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Start
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );

  // List View Component
  const ListView = () => (
    <div className="space-y-3">
      {chapters.map((chapter, index) => {
        const progressData = getChapterProgress(chapter.id, index);
        
        return (
          <Link
            key={chapter.id}
            to={`/student/chapter/${chapter.id}`}
            className="group block"
          >
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-200 group-hover:border-blue-300">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  {/* Left Section */}
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Chapter Icon */}
                    <div className={`w-12 h-12 bg-gradient-to-br ${getChapterColor(index)} rounded-xl flex items-center justify-center shadow-sm`}>
                      {progressData.isLocked ? (
                        <Lock className="w-5 h-5 text-white" />
                      ) : progressData.isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      )}
                    </div>

                    {/* Chapter Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          Chapter {index + 1}
                        </span>
                        {progressData.isCompleted && (
                          <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                        {progressData.isLocked && (
                          <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                            Locked
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                        {chapter.chapter_name}
                      </h3>
                      
                      {/* Progress Bar - List View */}
                      {!progressData.isLocked && (
                        <div className="mt-2 flex items-center space-x-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${getChapterColor(index)} transition-all duration-500`}
                              style={{ width: `${progressData.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-600 min-w-0">
                            {progressData.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Middle Section - Stats */}
                  <div className="hidden md:flex items-center space-x-6 mx-6">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{progressData.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Play className="w-4 h-4" />
                      <span>{progressData.lessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{progressData.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Right Section - Action */}
                  <div className="flex items-center space-x-3">
                    {progressData.isLocked ? (
                      <button className="px-4 py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed">
                        Locked
                      </button>
                    ) : progressData.isCompleted ? (
                      <button className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                        Review Chapter
                      </button>
                    ) : progressData.progress > 0 ? (
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Continue Learning
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Start Chapter
                      </button>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );

  // Loading Component
  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animate-reverse mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse">Loading chapters...</p>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="ml-3">
            <p className="text-red-700 font-medium">{error}</p>
            <p className="text-red-600 text-sm mt-1">Please try refreshing the page or contact support if the issue persists.</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (chapters.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">No chapters found</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Chapters will appear here once they're added to this subject. Check back later or contact your instructor.
        </p>
        <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold text-blue-900">{chapters.length}</p>
              <p className="text-xs text-blue-700">Total Chapters</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold text-green-900">{Math.floor(chapters.length * 0.4)}</p>
              <p className="text-xs text-green-700">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold text-purple-900">{chapters.length * 25}m</p>
              <p className="text-xs text-purple-700">Est. Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle Switch */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Chapters </h2>
        <div className="flex items-center space-x-3">
          <span className={`text-sm font-medium ${!isCardView ? 'text-gray-900' : 'text-gray-500'}`}>
            
          </span>
          <List className={`w-4 h-4 ${!isCardView ? 'text-gray-900' : 'text-gray-400'}`} />
          
          {/* Toggle Switch */}
          <button
            onClick={() => setIsCardView(!isCardView)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isCardView ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                isCardView ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          
          <Grid3X3 className={`w-4 h-4 ${isCardView ? 'text-gray-900' : 'text-gray-400'}`} />
          <span className={`text-sm font-medium ${isCardView ? 'text-gray-900' : 'text-gray-500'}`}>
            
          </span>
        </div>
      </div>

      {/* Chapters Display */}
      {isCardView ? <CardView /> : <ListView />}

      {/* Progress Summary */}
      <div className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Progress</h3>
          <p className="text-gray-600 mb-4">
            You've completed {Math.floor(chapters.length * 0.4)} out of {chapters.length} chapters
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 max-w-md mx-auto">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{ width: `${(Math.floor(chapters.length * 0.4) / chapters.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            {Math.round((Math.floor(chapters.length * 0.4) / chapters.length) * 100)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentChapterList;