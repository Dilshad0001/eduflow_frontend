// import { useNavigate } from 'react-router-dom';

// function AdminDashboard() {
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-10">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//         {/* Users List Card */}
//         <div
//           onClick={() => handleNavigation('/admin/users')}
//           className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
//         >
//           <h2 className="text-xl font-semibold text-center mb-2">Users List</h2>
//           <p className="text-gray-600 text-center">Manage all platform users</p>
//         </div>

//         {/* Students List Card */}
//         <div
//           onClick={() => handleNavigation('/admin/students')}
//           className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
//         >
//           <h2 className="text-xl font-semibold text-center mb-2">Students List</h2>
//           <p className="text-gray-600 text-center">View and manage students</p>
//         </div>

//         {/* Teachers List Card */}
//         <div
//           onClick={() => handleNavigation('/admin/teachers')}
//           className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
//         >
//           <h2 className="text-xl font-semibold text-center mb-2">Teachers List</h2>
//           <p className="text-gray-600 text-center">View and manage teachers</p>
//         </div>

//         {/* Courses List Card */}
//         <div
//           onClick={() => handleNavigation('/admin/courses')}
//           className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
//         >
//           <h2 className="text-xl font-semibold text-center mb-2">Course List</h2>
//           <p className="text-gray-600 text-center">View and manage courses</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;



// =====================


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar'; // Import the separate navbar component

function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false); // Close sidebar after navigation
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    {
      title: 'Users List',
      description: 'Manage all platform users',
      path: '/admin/users',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      title: 'Students List',
      description: 'View and manage students',
      path: '/admin/students',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Teachers List',
      description: 'View and manage teachers',
      path: '/admin/teachers',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Course List',
      description: 'View and manage courses',
      path: '/admin/courses',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Use the separate AdminNavbar component */}
      <AdminNavbar 
        onSidebarToggle={toggleSidebar} 
        sidebarOpen={sidebarOpen}
      />

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 mt-16">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="cursor-pointer group flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex-shrink-0 text-gray-600 group-hover:text-blue-600 transition-colors">
                {item.icon}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500">Admin Dashboard v1.0</p>
            <p className="text-xs text-gray-400 mt-1">© 2025 Your Company</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Welcome to your administrative control panel</p>
          </div>

          {/* Dashboard Cards - Original Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors">
                  <div className="text-blue-600">
                    {item.icon}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-center text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900">56</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;



// Top Performers This Month