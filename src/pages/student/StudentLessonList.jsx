import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Play, ChevronRight, Clock, CheckCircle, AlertCircle, Video, Grid3X3, List, BookOpen, Eye } from "lucide-react";

function StudentLessonList({ chapterId }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCardView, setIsCardView] = useState(true); // Toggle state
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  // Generate mock progress data for each lesson
  const getLessonProgress = (lessonId, index) => ({
    progress: Math.floor(Math.random() * 100),
    isCompleted: Math.random() > 0.7,
    duration: `${Math.floor(Math.random() * 25) + 5} min`,
    viewCount: Math.floor(Math.random() * 150) + 20,
    rating: 4.1 + Math.random() * 0.9
  });

  // Lesson colors
  const getLessonColor = (index) => {
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

  // Card View Component
  const CardView = () => (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {lessons.map((lesson, index) => {
        const progressData = getLessonProgress(lesson.id, index);
        
        return (
          <div
            key={lesson.id}
            className="group block cursor-pointer"
            onClick={() => navigate(`/student/lesson/${lesson.id}`)}
          >
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 group-hover:border-blue-300 h-full">
              {/* Lesson Header */}
              <div className={`h-2 bg-gradient-to-r ${getLessonColor(index)}`}></div>
              
              {/* Video Preview or Placeholder */}
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                {lesson.video ? (
                  <>
                    <video
                      src={lesson.video}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-200 shadow-lg">
                        <Play className="w-5 h-5 text-blue-600 ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${getLessonColor(index)} flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <Video className="w-8 h-8 mx-auto mb-2 opacity-80" />
                      <p className="text-sm font-medium opacity-90">No Video</p>
                    </div>
                  </div>
                )}
                
                {/* Lesson Number Badge */}
                <div className="absolute top-3 left-3">
                  <div className={`w-8 h-8 bg-gradient-to-br ${getLessonColor(index)} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                </div>
              </div>
              
              {/* Lesson Content */}
              <div className="p-5">
                {/* Status Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Lesson {index + 1}
                  </span>
                  {lesson.is_approved ? (
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Approved
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  )}
                  {progressData.isCompleted && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      Completed
                    </span>
                  )}
                </div>

                {/* Lesson Title */}
                <h3 className="font-bold text-base text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {lesson.lesson_name}
                </h3>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500">Progress</span>
                    <span className="text-xs font-medium text-gray-700">
                      {progressData.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getLessonColor(index)} transition-all duration-500`}
                      style={{ width: `${progressData.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Lesson Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-4">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{progressData.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{progressData.viewCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {lesson.is_approved ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-orange-500" />
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  {progressData.isCompleted ? (
                    <button className="w-full py-2 px-3 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                      Review Lesson
                    </button>
                  ) : progressData.progress > 0 ? (
                    <button className="w-full py-2 px-3 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Continue Watching
                    </button>
                  ) : (
                    <button className="w-full py-2 px-3 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Start Lesson
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // List View Component
  const ListView = () => (
    <div className="space-y-3">
      {lessons.map((lesson, index) => {
        const progressData = getLessonProgress(lesson.id, index);
        
        return (
          <div
            key={lesson.id}
            className="group cursor-pointer"
            onClick={() => navigate(`/student/lesson/${lesson.id}`)}
          >
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-200 group-hover:border-blue-300">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  {/* Left Section */}
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Video Thumbnail or Icon */}
                    <div className="relative">
                      {lesson.video ? (
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <video
                            src={lesson.video}
                            className="w-full h-full object-cover"
                            preload="metadata"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className={`w-16 h-12 bg-gradient-to-br ${getLessonColor(index)} rounded-lg flex items-center justify-center`}>
                          <Video className="w-5 h-5 text-white" />
                        </div>
                      )}
                      {/* Lesson Number */}
                      <div className="absolute -top-1 -left-1 w-5 h-5 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700">{index + 1}</span>
                      </div>
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          Lesson {index + 1}
                        </span>
                        {lesson.is_approved ? (
                          <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            Approved
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                            Pending
                          </span>
                        )}
                        {progressData.isCompleted && (
                          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                        {lesson.lesson_name}
                      </h3>
                      
                      {/* Progress Bar - List View */}
                      <div className="mt-2 flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${getLessonColor(index)} transition-all duration-500`}
                            style={{ width: `${progressData.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600 min-w-0">
                          {progressData.progress}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section - Stats */}
                  <div className="hidden md:flex items-center space-x-6 mx-6">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{progressData.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>{progressData.viewCount} views</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      {lesson.is_approved ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                  </div>

                  {/* Right Section - Action */}
                  <div className="flex items-center space-x-3">
                    {progressData.isCompleted ? (
                      <button className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                        Review Lesson
                      </button>
                    ) : progressData.progress > 0 ? (
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Continue Watching
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Start Lesson
                      </button>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <p className="text-gray-600 font-medium animate-pulse">Loading lessons...</p>
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
  if (lessons.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Video className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">No lessons found</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Lessons will appear here once they're added to this chapter. Check back later or contact your instructor.
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Video className="w-4 h-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold text-blue-900">{lessons.length}</p>
              <p className="text-xs text-blue-700">Total Lessons</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold text-green-900">{lessons.filter(l => l.is_approved).length}</p>
              <p className="text-xs text-green-700">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold text-purple-900">{lessons.length * 15}m</p>
              <p className="text-xs text-purple-700">Est. Time</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold text-orange-900">{Math.floor(lessons.length * 0.3)}</p>
              <p className="text-xs text-orange-700">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle Switch */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Lessons</h2>
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

      {/* Lessons Display */}
      {isCardView ? <CardView /> : <ListView />}

      {/* Progress Summary */}
      <div className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Progress</h3>
          <p className="text-gray-600 mb-4">
            You've completed {Math.floor(lessons.length * 0.3)} out of {lessons.length} lessons
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 max-w-md mx-auto">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{ width: `${(Math.floor(lessons.length * 0.3) / lessons.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            {Math.round((Math.floor(lessons.length * 0.3) / lessons.length) * 100)}% Complete
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentLessonList;