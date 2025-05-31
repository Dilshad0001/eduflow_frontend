import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get('http://localhost:8000/student/lesson/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLessons(res.data);
      } catch (err) {
        setError('Failed to fetch lessons.');
      }
    };

    fetchLessons();
  }, [token]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">My Lessons</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{lesson.lesson_name}</h2>
            {lesson.video ? (
              <video
                controls
                src={lesson.video}
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <p className="text-gray-500">No video available</p>
            )}
            <p className="text-sm text-gray-600 mt-2">
              Chapter ID: {lesson.chapter}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentLessons;
