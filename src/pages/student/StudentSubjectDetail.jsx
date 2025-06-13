
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, ChevronLeft, Clock, Users, Star, Share2, Heart, Calendar, TrendingUp, User, Bell } from "lucide-react";
import ChapterList from "../admin/ChapterList";
import StudentChapterList from "./StudentChapterList";

function StudentSubjectDetail() {
  const { subjectId } = useParams(); // subject id from URL
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/student/subject/?subjectId=${subjectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setSubject(response.data);
      } catch (error) {
        console.error("Error fetching subject:", error);
        setSubject(null);
      }
      setLoading(false);
    };

    fetchSubject();
  }, [subjectId, token]);

  // Loading Component
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animate-reverse mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse">Loading subject details...</p>
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
  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md mx-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Subject Not Found</h2>
          <p className="text-gray-600 mb-6">
            The requested subject could not be loaded. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Hero Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                  Dashboard
                </button>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <button className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                  Subjects
                </button>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-800 font-medium">{subject.subject_name}</li>
            </ol>
          </nav>

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">
                  {subject.subject_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  {subject.subject_name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {subject.course}
                  </span>

                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 group">
                <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
              </button>
              <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 group">
                <Share2 className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">78%</p>
                <p className="text-sm text-gray-500">Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-500">Chapters</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">5.2h</p>
                <p className="text-sm text-gray-500">Study Time</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">


          {/* Chapters Content */}
          <div className="p-8">
            <StudentChapterList subjectId={subjectId} />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group">
          <BookOpen className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
        </button>
      </div>
    </div>
  );
}

export default StudentSubjectDetail;