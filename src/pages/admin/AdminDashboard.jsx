import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Users List Card */}
        <div
          onClick={() => handleNavigation('/admin/users')}
          className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-center mb-2">Users List</h2>
          <p className="text-gray-600 text-center">Manage all platform users</p>
        </div>

        {/* Students List Card */}
        <div
          onClick={() => handleNavigation('/admin/students')}
          className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-center mb-2">Students List</h2>
          <p className="text-gray-600 text-center">View and manage students</p>
        </div>

        {/* Teachers List Card */}
        <div
          onClick={() => handleNavigation('/admin/teachers')}
          className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-center mb-2">Teachers List</h2>
          <p className="text-gray-600 text-center">View and manage teachers</p>
        </div>

        {/* Courses List Card */}
        <div
          onClick={() => handleNavigation('/admin/courses')}
          className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-center mb-2">Course List</h2>
          <p className="text-gray-600 text-center">View and manage courses</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
