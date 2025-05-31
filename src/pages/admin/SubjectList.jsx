import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SubjectList = ({ courseId }) => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!courseId) return; // If no courseId, skip fetch

    const fetchSubjects = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No authorization token found. Please login.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/adminuser/study/subject/?courseId=${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubjects(response.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to fetch subjects. Make sure you are authorized and the course ID is correct.');
        setSubjects([]);
      }
      setLoading(false);
    };

    fetchSubjects();
  }, [courseId, navigate]);

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-2xl mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">📚 Subject List</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {subjects.length === 0 && !error ? (
        <p className="text-gray-600 text-center">No subjects found for this course.</p>
      ) : (
        <ul className="space-y-3">
          {subjects.map((subject) => (
            <li key={subject.id} className="bg-gray-100 p-3 rounded shadow-sm hover:bg-gray-200 cursor-pointer">
              <Link to={`/subject/${subject.id}`} className="block">
                <span className="font-semibold">{subject.subject_name}</span> <br />
                <span className="text-sm text-gray-600">Course: {subject.course}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubjectList;
