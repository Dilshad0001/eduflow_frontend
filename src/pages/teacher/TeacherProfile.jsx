import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/teacher/profile/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    .then((res) => {
        console.log("1");
        console.log(res.data);
      if (res.data && !res.data.detail) {  // Assuming "no data found" returns a string in detail or error
        setProfile(res.data);
        console.log("2");
      } else {
        console.log("3");
        setError('No profile data found');
      }
      setLoading(false);
    })
    .catch((err) => {
      setError('Error fetching proficdsle');
      setLoading(false);
      console.error(err);
    });
  }, []);





  

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Teacher Profile</h1>
        <div>
          <strong className="block text-gray-700 mb-1">Teacher Name:</strong>
          <p className="text-gray-900 text-lg">{profile.teacher_name}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
