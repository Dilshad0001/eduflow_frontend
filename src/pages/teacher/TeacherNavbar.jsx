

// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { 
//   BookOpen,
//   FileText,
//   User,
//   Upload,
//   GraduationCap,
//   ChevronRight,
//   Home
// } from 'lucide-react';

// const navItems = [
//   { title: 'home', path: '/teacher/dashboard', icon: Home },
//   { title: 'Courses', path: '/teacher/courses', icon: BookOpen },
//   { title: 'Upload Task', path: '/teacher/task/upload', icon: Upload },
//   { title: 'Submitted Tasks', path: '/teacher/task/submitted', icon: FileText },
// ];

// const TeacherNavbar = () => {
//   const navigate = useNavigate();

//   const handleProfileClick = () => {
//     navigate('/teacher/profile');
//   };

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
//       <div className="px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-xl">
//                 <GraduationCap className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-900">Teacher Panel</span>
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <nav className="hidden md:flex items-center space-x-1">
//               {navItems.map((item) => (
//                 <NavLink
//                   key={item.title}
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center px-4 py-2.5 rounded-xl font-medium transition-all ${
//                       isActive
//                         ? 'bg-gray-800 text-white shadow-lg shadow-gray-800/20'
//                         : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//                     }`
//                   }
//                 >
//                   <item.icon className="h-5 w-5 mr-2" />
//                   {item.title}
//                 </NavLink>
//               ))}
//             </nav>

//             <div className="flex items-center space-x-4 ml-4">
//               <div className="relative">
//                 <button className="p-2.5 rounded-xl hover:bg-gray-100 relative transition-colors">
//                   <div className="h-6 w-6 text-gray-600 relative">
//                     <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">3</span>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                     </svg>
//                   </div>
//                 </button>
//               </div>

//               {/* ✅ Avatar and Info block navigates to /teacher/profile */}
//               <div
//                 onClick={handleProfileClick}
//                 className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
//               >
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
//                   TJ
//                 </div>
//                 <div className="hidden md:block">
//                   <p className="font-semibold text-gray-900">Teacher</p>
//                   <p className="text-sm text-gray-500">Professor</p>
//                 </div>
//                 <ChevronRight className="h-4 w-4 text-gray-500 hidden md:block" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TeacherNavbar;




















import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen,
  FileText,
  User,
  Upload,
  GraduationCap,
  ChevronRight,
  Home,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Settings,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';

const navItems = [
  { title: 'Home', path: '/teacher/dashboard', icon: Home },
  { title: 'Courses', path: '/teacher/courses', icon: BookOpen },
  { title: 'Upload Task', path: '/teacher/task/upload', icon: Upload },
  { title: 'Submitted Tasks', path: '/teacher/task/submitted', icon: FileText },
];

const notifications = [
  { id: 1, title: 'Assignment Graded', message: 'Math homework graded for Class 10B', time: '1h', type: 'success' },
  { id: 2, title: 'New Submission', message: '5 new submissions in Physics', time: '3h', type: 'info' },
  { id: 3, title: 'Meeting Reminder', message: 'Department meeting at 2pm', time: '5h', type: 'urgent' },
];

const TeacherNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileClick = () => {
    navigate('/teacher/profile');
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const profileMenuItems = [
    { label: 'My Profile', icon: User, action: handleProfileClick },
    { label: 'Settings', icon: Settings, action: () => navigate('/teacher/settings') },
    { label: 'Dark Theme', icon: isDarkMode ? Sun : Moon, action: () => setIsDarkMode(!isDarkMode) },
    { label: 'Sign Out', icon: LogOut, action: handleLogout, danger: true },
  ];

  const isActiveRoute = (path) => location.pathname === path;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent': return '🔴';
      case 'success': return '🟢';
      default: return '🔵';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsProfileDropdownOpen(false);
        setIsNotificationOpen(false);
      }
      if (!event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isDarkMode
        ? 'bg-slate-900/95 border-slate-800/50'
        : 'bg-white/95 border-gray-200/50'
    } backdrop-blur-xl border-b shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/teacher/dashboard')}>
            <div className="relative group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300 ${
                isDarkMode ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-emerald-600 to-teal-700'
              }`}>
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <span className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                EduFlow
              </span>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} -mt-1`}>
                Teacher Portal
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                isDarkMode ? 'text-slate-400 group-focus-within:text-emerald-400' : 'text-slate-500 group-focus-within:text-emerald-600'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, students, tasks..."
                className={`w-full pl-12 pr-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500 focus:bg-slate-700'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:bg-white'
                } hover:border-emerald-300`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveRoute(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative group flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? `${isDarkMode ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'}`
                      : `${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'} hover:shadow-md`
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.title}</span>

                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-xl border backdrop-blur-xl transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-slate-800/95 border-slate-700'
                    : 'bg-white/95 border-slate-200'
                }`}>
                  <div className="p-4 border-b border-slate-200/10">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-slate-200/10 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors duration-200 cursor-pointer`}
                        onClick={() => setIsNotificationOpen(false)}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              {notification.title}
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              {notification.message}
                            </p>
                          </div>
                          <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    <button className={`w-full text-sm font-medium py-2 px-4 rounded-xl transition-colors duration-200 ${
                      isDarkMode ? 'text-emerald-400 hover:bg-slate-700' : 'text-emerald-600 hover:bg-emerald-50'
                    }`}>
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className={`flex items-center space-x-3 p-2 rounded-xl transition-all duration-200 ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">TJ</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Teacher
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Professor
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  isProfileDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border backdrop-blur-xl transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-slate-800/95 border-slate-700'
                    : 'bg-white/95 border-slate-200'
                }`}>
                  <div className="p-4 border-b border-slate-200/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">TJ</span>
                      </div>
                      <div>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          Teacher Johnson
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          professor@university.edu
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    {profileMenuItems.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={index}
                          onClick={item.action}
                          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                            item.danger
                              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                              : isDarkMode
                                ? 'text-slate-300 hover:text-white hover:bg-slate-700'
                                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors duration-200 mobile-menu-button ${
                isDarkMode
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden mobile-menu transform transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}>
            {/* Mobile Search */}
            <div className="px-4 py-3 border-t border-slate-200/10">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            {/* Mobile Nav Items */}
            <div className="px-4 pb-4 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = isActiveRoute(item.path);

                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`relative w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? `${isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white'} shadow-lg`
                        : `${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'}`
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
    </nav>
  );
};

export default TeacherNavbar;