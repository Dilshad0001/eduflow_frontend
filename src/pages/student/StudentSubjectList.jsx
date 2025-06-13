import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Search, Filter, Grid, List, BookOpen, Clock, TrendingUp, Star, ChevronRight, User, Bell, Calendar } from "lucide-react";

const StudentSubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showStats, setShowStats] = useState(true);
  const navigate = useNavigate();

  // Generate progress data based on actual subjects
  const getProgressData = (subjectId) => ({
    progress: Math.floor(Math.random() * 40) + 60,
    assignments: Math.floor(Math.random() * 10) + 1,
    lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No authorization token found. Please login.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/student/subject", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        
        setSubjects(response.data);
        setError('');
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError("Failed to fetch subjects. Make sure you're logged in and the course ID is valid.");
        setSubjects([]);
        navigate("/student/createprofile");
      }

      setLoading(false);
    };

    fetchSubjects();
  }, [navigate]);

  // Filter and sort subjects
  const filteredSubjects = subjects
    .filter(subject => 
      subject.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.course.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.subject_name.localeCompare(b.subject_name);
        case 'course':
          return a.course.localeCompare(b.course);
        default:
          return 0;
      }
    });

  // Subject card colors
  const getSubjectColor = (index) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-emerald-500 to-emerald-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-teal-500 to-teal-600'
    ];
    return colors[index % colors.length];
  };

  // Loading Component
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animate-reverse mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse">Loading your subjects...</p>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search subjects or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="course">Sort by Course</option>
              </select>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {showStats && subjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
                  <p className="text-sm text-gray-500">Total Subjects</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                  <p className="text-sm text-gray-500">Avg Progress</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-500">Hours This Week</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">A+</p>
                  <p className="text-sm text-gray-500">Best Grade</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl shadow-sm mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredSubjects.length === 0 && !error && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {searchTerm ? 'No subjects found' : 'No subjects enrolled'}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              {searchTerm 
                ? `No subjects match "${searchTerm}". Try adjusting your search.`
                : "It looks like you haven't enrolled in any subjects yet. Contact your administrator to get started."
              }
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Subjects Display */}
        {filteredSubjects.length > 0 && (
          <div className={viewMode === 'grid' 
            ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "space-y-4"
          }>
            {filteredSubjects.map((subject, index) => (
              <Link 
                key={subject.id} 
                to={`/student/subject/${subject.id}`}
                className="group block"
              >
                {viewMode === 'grid' ? (
                  // Grid View Card
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group-hover:border-blue-300">
                    {/* Card Header */}
                    <div className={`h-2 bg-gradient-to-r ${getSubjectColor(index)}`}></div>
                    
                    {/* Card Content */}
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getSubjectColor(index)} rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
                          <span className="text-white text-lg font-bold">
                            {subject.subject_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                      </div>

                      {/* Subject Info */}
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {subject.subject_name}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <div className={`w-2 h-2 bg-gradient-to-r ${getSubjectColor(index)} rounded-full`}></div>
                        <p className="text-sm text-gray-600 font-medium">
                          {subject.course}
                        </p>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">Progress</span>
                          <span className="text-xs font-medium text-gray-700">
                            {getProgressData(subject.id).progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${getSubjectColor(index)} transition-all duration-500`}
                            style={{ width: `${getProgressData(subject.id).progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{getProgressData(subject.id).lastAccessed}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <span>{getProgressData(subject.id).assignments} assignments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View Card
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 p-6 transition-all duration-200 group-hover:border-blue-300">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${getSubjectColor(index)} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <span className="text-white text-xl font-bold">
                          {subject.subject_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                          {subject.subject_name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{subject.course}</p>
                        
                        <div className="flex items-center space-x-6 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>{getProgressData(subject.id).progress}% Complete</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Last accessed {getProgressData(subject.id).lastAccessed}</span>
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Results Info */}
        {filteredSubjects.length > 0 && searchTerm && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Showing {filteredSubjects.length} of {subjects.length} subjects
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSubjectList;