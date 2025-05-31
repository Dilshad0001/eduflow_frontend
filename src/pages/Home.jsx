import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleCardClick = (role) => {
    if (role === 'teacher') {
      navigate('/teacher/dashboard');
    } else if (role === 'student') {
      navigate('/student/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-8">Welcome to the Learning Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Teacher Card */}
        <div
          onClick={() => handleCardClick('teacher')}
          className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
        >
          <h2 className="text-xl font-semibold text-center mb-2">Teacher</h2>
          <p className="text-gray-600 text-center">Click here to enter the Teacher Dashboard</p>
        </div>

        {/* Student Card */}
        <div
          onClick={() => handleCardClick('student')}
          className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
        >
          <h2 className="text-xl font-semibold text-center mb-2">Student</h2>
          <p className="text-gray-600 text-center">Click here to enter the Student Dashboard</p>
        </div>

        {/* Admin Card */}
        <div
          onClick={() => handleCardClick('admin')}
          className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
        >
          <h2 className="text-xl font-semibold text-center mb-2">Admin</h2>
          <p className="text-gray-600 text-center">Click here to enter the Admin Dashboard</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
