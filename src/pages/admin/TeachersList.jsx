import { useEffect, useState } from 'react';
import axios from 'axios';

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('access_token'); // Assume token is stored here

  const fetchTeachers = async (search = '') => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/adminuser/teacher/?teacher=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTeachers(keyword);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Teacher List</h1>

        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search by name..."
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
          <div className="text-center py-10">Loading teachers...</div>
        ) : (
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Teacher Name</th>
                <th className="py-2 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No teachers found
                  </td>
                </tr>
              ) : (
                teachers.map((teacher, index) => (
                  <tr key={teacher.id} className="border-t">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{teacher.teacher_name}</td>
                    <td className="py-2 px-4">{teacher.user.email}</td>
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

export default TeachersList;
