import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <AdminNavbar 
        onSidebarToggle={toggleSidebar} 
        sidebarOpen={sidebarOpen} 
      />
      
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar 
          isOpen={sidebarOpen} 
          onClose={closeSidebar} 
        />
        
        {/* Main Content */}
        <main className="flex-1 pt-16 transition-all duration-300">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;