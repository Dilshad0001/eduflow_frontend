

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import axios from "axios";

function TeacherAddLesson() {
  const location = useLocation();
  const navigate = useNavigate();
  const chapterId = location.state?.chapterId;

  const [lessonName, setLessonName] = useState("");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [chapters,setChapter]=useState()

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!chapterId) {
      setError("Chapter ID is missing. Please select a chapter first.");
    }
  }, [chapterId, navigate]);

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
        
        setChapter(response.data);
      } catch (err) {
        console.error("Error fetching chapter:", err);
        setChapter(null);
      }
    };

    fetchChapter();
  }, [chapterId, token]);
  console.log("chapter id==",chapters);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true); 

    if (!lessonName || !chapterId) {
      setError("Lesson name and chapter are required.");
      setIsSubmitting(false);
      return;
    }

    if (!token) {
      setError("Unauthorized. Please log in.");
      navigate("/login");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("lesson_name", lessonName);
    formData.append("chapter", chapterId);
    if (video) {
      formData.append("video", video);
    }

    try {
      await axios.post(
        "http://localhost:8000/teacher/task/lesson/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("Lesson added successfully!");
      setLessonName("");
      setVideo(null);
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      console.error("Failed to add lesson:", err);
      if (err.response?.status === 401) {
        setError("Session expired or unauthorized. Please log in again.");
        navigate("/login");
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail); 
      } else {
        setError("Failed to add lesson. Please try again.");
      }
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 -mt-15">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Chapters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">Chapter Information</h3>
                  <p className="text-sm text-gray-600">Current lesson destination</p>
                </div>
              </div>
              
              {chapterId ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Chapter</p>
                      <p className="text-lg font-bold text-green-900">{chapters?chapters.chapter_name:chapterId}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-red-800">No Chapter Selected</p>
                      <p className="text-sm text-red-600">Please select a chapter first</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Tips for Success
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Use descriptive lesson names that clearly indicate the content</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Video files should be in MP4 format for best compatibility</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Keep video files under 500MB for optimal loading</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Create New Lesson
                </h2>
                <p className="text-blue-100 mt-2">Fill in the lesson details below to add it to your chapter</p>
              </div>

              {/* Alert Messages */}
              {error && (
                <div className="mx-8 mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-red-800">Error</p>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="mx-8 mt-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-green-800">Success</p>
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Lesson Name Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <label htmlFor="lessonName" className="block text-lg font-semibold text-gray-800">
                          Lesson Name
                        </label>
                        <p className="text-sm text-gray-600">Give your lesson a clear, descriptive title</p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        id="lessonName"
                        type="text"
                        value={lessonName}
                        onChange={(e) => setLessonName(e.target.value)}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-lg"
                        placeholder="e.g., Introduction to React Fundamentals"
                        required
                        disabled={!chapterId || isSubmitting}
                      />
                      <div className="absolute right-4 top-4">
                        <span className="text-red-500 text-xl">*</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Upload Section */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <label htmlFor="videoUpload" className="block text-lg font-semibold text-gray-800">
                        Video Content
                      </label>
                      <p className="text-sm text-gray-600">Upload a video file to accompany your lesson (optional)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      {!video ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
                          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                          </div>
                          <input
                            id="videoUpload"
                            type="file"
                            accept="video/*"
                            onChange={(e) => setVideo(e.target.files[0])}
                            className="hidden"
                            disabled={!chapterId || isSubmitting}
                          />
                          <label
                            htmlFor="videoUpload"
                            className="cursor-pointer inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            Choose Video File
                          </label>
                          <p className="text-sm text-gray-500 mt-2">MP4, MOV, AVI up to 500MB</p>
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-xl p-6 border-2 border-green-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{video.name}</p>
                                <p className="text-sm text-gray-600">{(video.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setVideo(null)}
                              className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              disabled={isSubmitting}
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-9-3v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1v2M7 7h10"></path>
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      All changes will be saved immediately
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Cancel
                      </button>
                      
                      <button
                        type="submit"
                        className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                          !chapterId || isSubmitting
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        }`}
                        disabled={!chapterId || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Creating Lesson...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Create Lesson
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherAddLesson;