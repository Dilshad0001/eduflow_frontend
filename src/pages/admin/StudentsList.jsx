import { useEffect, useState } from 'react';
import axios from 'axios';

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStudents = async (search = '') => {
    setLoading(true);
    try {

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No authorization token found. Please login.");
      setLoading(false);
      navigate("/login");
      return;
    }

      const response = await axios.get("http://localhost:8000/adminuser/student/",{
          headers: {
            Authorization: `Bearer ${token}`,
          },

      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(keyword);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Student List</h1>

        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search by full name..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="text-center py-10">Loading students...</div>
        ) : (
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Full Name</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Course</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student.id} className="border-t">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{student.full_name}</td>
                    <td className="py-2 px-4">{student.phone_number}</td>
                    <td className="py-2 px-4">{student.course}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentsList;
