import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const items = [
    { title: 'Profile', path: '/teacher/profile' },
    { title: 'Courses', path: '/teacher/courses' }, // ✅ Updated here
    { title: 'Upload Task', path: '/teacher/task/upload' },
    { title: 'Submitted Tasks', path: '/teacher/task/submitted' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {items.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="cursor-pointer bg-white shadow-md p-6 rounded-xl hover:bg-green-50 transition border hover:border-green-500"
          >
            <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
