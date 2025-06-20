

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, FileText, Users, Bookmark, PlusCircle } from "lucide-react"; // Importing icons for stats and new button
import axiosInstance from '../../axiosInstance';

const SubjectList = ({ courseId }) => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!courseId) return;

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
        const response = await axiosInstance.get(`adminuser/study/subject/?courseId=${courseId}`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
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

  const handleAddSubjectClick = () => {
    navigate(`/admin/create-subject/${courseId}`); // Navigate to the add subject page
  };

  if (loading) return <p className="text-center mt-8 text-lg text-gray-700">Loading subjects...</p>;

  return (
    <div className="w-full p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Estimated Chapters</p>
                <p className="text-2xl font-bold text-gray-900">{subjects.length * 5}</p> {/* Placeholder */}
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <FileText className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Enrolled Students</p>
                <p className="text-2xl font-bold text-gray-900">~{subjects.length * 50}</p> {/* Placeholder */}
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Users className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-900">Subject List</h2>
            </div>
            <div className="flex items-center space-x-4"> {/* Added a div to hold both elements */}
              <button
                onClick={handleAddSubjectClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Subject
              </button>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {subjects.length} {subjects.length === 1 ? 'Subject' : 'Subjects'}
              </div>
            </div>
          </div>
        </div>

        <div className="p-0">
          {error && (
            <div className="p-6 text-center text-red-500 flex items-center justify-center space-x-2">
              <Bookmark className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {subjects.length === 0 && !error ? (
            <div className="p-12 text-center text-gray-600">
              <svg className="mx-auto mb-4 w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-medium mb-2">No subjects found</h3>
              <p>There are no subjects available for this course yet.</p>
              <button
                onClick={handleAddSubjectClick}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Subject
              </button>
            </div>
          ) : (
            <div>
              {subjects.map((subject, index) => (
                <Link
                  key={subject.id}
                  to={`/admin/subject/${subject.id}`}
                  className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 border-b border-gray-200 transition-all duration-200 last:border-b-0 cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-blue-500/30 transition-shadow duration-300">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                        {subject.subject_name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{subject.course}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* You can add more dynamic data here if your subject API returns it, e.g., progress */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>Active</span>
                    </div>
                  </div>
                </Link>
              ))}
              {/* Summary footer */}
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">
                      {subjects.length} {subjects.length === 1 ? 'Subject' : 'Subjects'} Available
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Estimated {subjects.length * 5} Total Chapters</span> {/* Placeholder */}
                    <span>•</span>
                    <span>~{Math.floor(subjects.length * 2.5)}h Content</span> {/* Placeholder */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectList;