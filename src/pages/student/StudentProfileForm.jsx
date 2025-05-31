import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentProfileForm = () => {
  const [form, setForm] = useState({
    full_name: '',
    phone_number: '',
    course: '',
  });
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    // Fetch all courses
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:8000/student/course/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        setError('Failed to load courses');
      }
    };
    fetchCourses();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(
        'http://localhost:8000/student/personal/profile/',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/student/homepage');
    } catch (err) {
      setError('Submission failed: ' + (err.response?.data?.detail || 'Check fields.'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Student Profile</h2>

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.course_name}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentProfileForm;
