

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Upload, 
  FileText, 
  Users,
  BarChart2,
  Calendar,
  MessageCircle,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    { 
      title: 'Courses', 
      path: '/teacher/courses',
      icon: BookOpen,
      description: 'Manage your courses',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Upload Task', 
      path: '/teacher/task/upload',
      icon: Upload,
      description: 'Create new assignments',
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'Submitted Tasks', 
      path: '/teacher/task/submitted',
      icon: FileText,
      description: 'Review student work',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Students', 
      path: '/teacher/students',
      icon: Users,
      description: 'View your students',
      color: 'from-amber-500 to-amber-600'
    },
  ];

  const stats = [
    { value: 5, label: 'Active Courses', icon: BookOpen, change: '+2 this term' },
    { value: 127, label: 'Total Students', icon: Users, change: '12 new' },
    { value: 42, label: 'Tasks to Grade', icon: FileText, change: '5 urgent' },
    { value: 4.8, label: 'Average Rating', icon: BarChart2, change: '0.2↑' },
  ];

  const recentActivities = [
    { id: 1, student: 'Alex Johnson', action: 'submitted Math Assignment', time: '15 min ago', course: 'Algebra 101' },
    { id: 2, student: 'Maria Garcia', action: 'asked question about', time: '1 hour ago', course: 'Calculus' },
    { id: 3, student: 'Sam Wilson', action: 'completed all tasks for', time: '3 hours ago', course: 'Geometry' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Midterm Exam', course: 'Advanced Calculus', date: 'June 15', time: '9:00 AM' },
    { id: 2, title: 'Project Deadline', course: 'Discrete Math', date: 'June 18', time: '11:59 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 -mt-20">
      {/* Removed <TeacherNavbar /> */}

      <main className="lg:pl-6 pt-1">
        {/* Top Header */}
        <header className="bg-yellow-50 shadow-sm border-b border-gray-100 h-50">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 py-20">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, Professor! 👋</h1>
                  <p className="text-gray-600 mt-1">Here's what's happening with your classes today</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-3">
                      <div className="bg-gray-100 p-1 rounded-full mr-2">
                        <stat.icon className="h-3 w-3 text-gray-600" />
                      </div>
                      <span className="text-sm text-gray-600">{stat.change}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-2xl">
                    <stat.icon className="h-8 w-8 text-gray-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <div 
                  key={index} 
                  onClick={() => navigate(action.path)}
                  className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 p-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-lg group cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${action.color} p-3 rounded-xl mb-3 mx-auto w-fit group-hover:opacity-90 transition-all duration-200`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors text-center">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mt-1">{action.description}</p>
                  <div className="flex justify-center mt-4">
                    <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                  <button className="text-gray-700 hover:text-gray-900 font-semibold flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
                      <div className="bg-gray-100 p-3 rounded-xl">
                        <MessageCircle className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          <span className="font-semibold">{activity.student}</span> {activity.action} <span className="text-blue-600">{activity.course}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-gray-800 pl-4 py-3 bg-gray-50 rounded-r-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{event.title}</p>
                          <p className="text-xs text-gray-600 mb-2">{event.course}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/teacher/courses')}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-700">View All Courses</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                  
                  <button 
                    onClick={() => navigate('/teacher/task/upload')}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center">
                      <Upload className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-700">Create New Assignment</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                  
                  <button 
                    onClick={() => navigate('/teacher/task/submitted')}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-700">Grade Submissions</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
