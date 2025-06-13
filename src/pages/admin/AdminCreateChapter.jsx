import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusCircle, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

const AdminCreateChapter = () => {
  const [chapterName, setChapterName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(''); // Stores the ID of the selected subject
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const {subjectId}=useParams()

  // Fetch subjects when the component mounts to populate the dropdown
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No authorization token found. Please login.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        // Assuming your subject list endpoint is similar to the one used in SubjectList
        const response = await axios.get(`http://127.0.0.1:8000/adminuser/study/subject/${subjectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubjects(response.data);
        // Optionally pre-select the first subject if available
        if (response.data.length > 0) {
          setSelectedSubject(response.data[0].id);
        }
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError('Failed to load subjects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (!chapterName.trim() || !subjects) {
      setError('Chapter name and subject are required.');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No authorization token found. Please login.");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
        console.log("chapter=",chapterName);
        console.log("subject=",subjects);
        
        
      const response = await axios.post(
        'http://localhost:8000/adminuser/study/chapter/',
        {
          chapter_name: chapterName,
          subject: subjects.id, // Send the subject ID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccessMessage('Chapter added successfully!');
      setChapterName(''); // Clear the form
      // Optionally navigate back to the subject's chapter list or a success page
      navigate(`/admin/subject/${subjects.id}`); // Redirect to the chapter list of the selected subject
    } catch (err) {
      console.error("Error adding chapter:", err.response ? err.response.data : err);
      setError('Failed to add chapter. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 rounded-t-lg flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            <PlusCircle className="w-6 h-6" />
            <span>Add New Chapter</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {loading && (
            <div className="text-center text-blue-600">
              <p>Loading...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
          )}

          <div>
            <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <h1>{subjects.subject_name}</h1>
          </div>

          <div>
            <label htmlFor="chapter-name" className="block text-sm font-medium text-gray-700 mb-2">
              Chapter Name
            </label>
            <input
              type="text"
              id="chapter-name"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              placeholder="e.g., Introduction to Algebra"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !chapterName.trim() || !subjects}
          >
            {loading ? 'Adding Chapter...' : 'Add Chapter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateChapter;
