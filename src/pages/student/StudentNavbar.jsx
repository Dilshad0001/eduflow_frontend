import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Subjects', route: '/student/subjects', icon: '📚' },
    { label: 'Pending Tasks', route: '/student/tasks/pending', icon: '⏳' },
    { label: 'Completed Tasks', route: '/student/tasks/completed', icon: '✅' },
    { label: 'Profile', route: '/student/profile', icon: '👤' },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-50 to-blue-50 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LearnHub
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => navigate(item.route)}
                className={`relative group flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  location.pathname === item.route
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-white/70 hover:shadow-md hover:shadow-slate-200/50'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
                {location.pathname === item.route && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-20 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-white/70 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap justify-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => navigate(item.route)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-200 ${
                  location.pathname === item.route
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-white/70'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </nav>
  );
};

export default StudentNavbar;