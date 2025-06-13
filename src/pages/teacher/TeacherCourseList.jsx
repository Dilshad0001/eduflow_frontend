
// Your Courses

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookOpen, Users, Clock, ChevronRight, Grid3X3, List, Search, Filter } from "lucide-react";

function TeacherCourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // "list" or "card"

  const token = localStorage.getItem("access_token"); // token stored here

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/teacher/course",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const renderCourseCards = () => (
    <div className="grid grid-cols-4 gap-6 ">
      {courses.map((course, index) => (
        <Link
          key={course.id}
          to={`/teacher/course/${course.id}`}
          className="group bg-white rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {index + 1}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
              {course.course_name}
            </h3>
            <p className="text-gray-500 text-sm mb-4">Course Management</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="bg-gray-50 px-2 py-1 rounded-full">Active</span>
              <span>ID: {course.id}</span>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </Link>
      ))}
    </div>
  );

  const renderCourseList = () => (
    <div className="bg-gray-200 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-semibold text-gray-900">Course Dashboard</h2>
          </div>
          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
            {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
          </div>
        </div>
      </div>
      <div>
        {courses.map((course, index) => (
          <Link
            key={course.id}
            to={`/teacher/course/${course.id}`}
            className="flex items-center justify-between px-6 py-5 hover:bg-green-50 border-b border-gray-100 transition-all duration-200 last:border-b-0 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                  {course.course_name}
                </h3>
                <p className="text-gray-500 text-sm">Click to view course details</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white -mt-12">
      <div className="container mx-auto px-0 py-1 max-w-7xl">


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 h-10 ">
          <div className="bg-gray-200 border border-gray-100 rounded-xl hover:shadow-lg hover:border-green-200 transition-all duration-300 group h-20">
            <div className="p-4">
              <div className="flex items-center justify-between  ">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Courses</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {courses.length}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl border border-green-100 group-hover:bg-green-100 transition-colors">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 border border-gray-100 rounded-xl hover:shadow-lg hover:border-green-200 transition-all duration-300 group h-20">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Students</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">2,847</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl border border-green-100 group-hover:bg-green-100 transition-colors">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 border border-gray-100 rounded-xl hover:shadow-lg hover:border-green-200 transition-all duration-300 group h-20">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Hours</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">156h</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl border border-green-100 group-hover:bg-green-100 transition-colors">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Filter</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List className="w-4 h-4" />
                {/* <span className="text-sm font-medium">List</span> */}
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                  viewMode === "card"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                {/* <span className="text-sm font-medium">Cards</span> */}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          {loading ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
              <div className="inline-flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <span className="text-gray-600 text-lg">Loading courses...</span>
              </div>
            </div>
          ) : (
            <>
              {courses.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-600">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                  <p className="text-gray-500 mb-6">Start by creating your first course</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Create Course
                  </button>
                </div>
              ) : (
                <>
                  {viewMode === "card" ? renderCourseCards() : renderCourseList()}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseList;


// Course Dashboard

// List