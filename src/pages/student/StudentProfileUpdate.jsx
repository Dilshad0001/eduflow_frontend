import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentProfileUpdate = () => {
  const [form, setForm] = useState({
    full_name: '',
    phone_number: '',
    course: '',
  });
  const [profile, setProfile] = useState(null); // to store current values
  const [profileId, setProfileId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    // Fetch profile
    axios
      .get('http://127.0.0.1:8000/student/personal/profile/', { headers })
      .then((res) => {
        if (res.data.length > 0) {
          setProfile(res.data[0]);
          setProfileId(res.data[0].id);
        } else {
          setError('Profile not found');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching profile');
        setLoading(false);
      });

    // Fetch courses
    axios
      .get('http://127.0.0.1:8000/api/course-list/', { headers })
      .then((res) => setCourses(res.data))
      .catch((err) => setError('Error fetching courses'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token');
    const dataToSend = {
      full_name: form.full_name || profile.full_name,
      phone_number: form.phone_number || profile.phone_number,
      course: form.course || profile.course_id, // You'll need course_id in profile
    };

    try {
      await axios.put(
        `http://127.0.0.1:8000/student/personal/profile/${profileId}/`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/student/profile');
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Update Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder={profile.full_name}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          placeholder={profile.phone_number}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.course_name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default StudentProfileUpdate;
