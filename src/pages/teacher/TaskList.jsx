// Assignment Tasks

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid3X3, List, Search, Filter, ChevronRight, BookOpen, Users, Clock, AlertCircle } from 'lucide-react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTasks(keyword);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const fetchTasks = async (query = '') => {
    setLoading(true);
    setError('');

    if (!token) {
      setError('You are not logged in. Please log in to view tasks.');
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get('http://localhost:8000/teacher/task/question', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: query },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      if (err.response?.status === 401) {
        setError('Session expired or unauthorized. Please log in again.');
        navigate("/login");
      } else {
        setError('Failed to fetch tasks. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTasks(keyword);
  };

  const handleClearSearch = () => {
    setKeyword('');
  };

  const handleAddTask = () => {
    navigate('/teacher/task/add');
  };

  const getTaskStatus = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(diff / (1000 * 3600 * 24));

    if (daysLeft < 0) return { status: 'overdue', color: 'bg-red-50 text-red-700', label: 'Overdue' };
    if (daysLeft <= 3) return { status: 'urgent', color: 'bg-yellow-50 text-yellow-700', label: 'Due Soon' };
    return { status: 'active', color: 'bg-green-50 text-green-700', label: 'Active' };
  };

  const getPriorityClass = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(diff / (1000 * 3600 * 24));

    if (daysLeft < 0) return 'border-l-4 border-red-400';
    if (daysLeft <= 3) return 'border-l-4 border-yellow-400';
    return 'border-l-4 border-green-400';
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'all') return true;
    const taskStatus = getTaskStatus(task.submission_deadline).status;
    return taskStatus === filterStatus;
  });

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderTaskCards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredTasks.map((task) => {
        const taskStatus = getTaskStatus(task.submission_deadline);
        return (
          <div
            key={task.id}
            className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-200 ${getPriorityClass(task.submission_deadline)}`}
          >
            {/* Task Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-1 mr-2">
                {task.task_name}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${taskStatus.color}`}>
                {taskStatus.label}
              </span>
            </div>

            {/* Students List */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Assigned Students:</h4>
              <div className="flex flex-wrap gap-2 max-h-20 overflow-auto">
                {task.students.slice(0, 3).map((student, idx) => (
                  <div key={idx} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                      {getInitials(student.full_name)}
                    </div>
                    <span className="text-sm text-gray-700 truncate max-w-24" title={student.full_name}>
                      {student.full_name}
                    </span>
                  </div>
                ))}
                {task.students.length > 3 && (
                  <div className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                    <span className="text-sm text-gray-600 font-medium">
                      +{task.students.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg line-clamp-3" title={task.description}>
                  {task.description}
                </p>
              </div>
            )}

            {/* Task Meta */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Uploaded: {new Date(task.uploaded_at).toLocaleDateString()}
              </div>
              <div className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Due: {new Date(task.submission_deadline).toLocaleDateString()}
              </div>
            </div>

            {/* File Download */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              {task.task_file ? (
                <a
                  href={task.task_file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download File
                </a>
              ) : (
                <span className="text-gray-400 text-sm italic">No file attached</span>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/teacher/task/${task.id}`);
                }}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all duration-200"
              >
                View Details
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTaskList = () => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-semibold text-gray-900">Task Dashboard</h2>
          </div>
          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'}
          </div>
        </div>
      </div>
      <div>
        {filteredTasks.map((task) => {
          const taskStatus = getTaskStatus(task.submission_deadline);
          return (
            <div
              key={task.id}
              onClick={() => navigate(`/teacher/task/${task.id}`)}
              className="flex items-center justify-between px-6 py-5 hover:bg-green-50 border-b border-gray-100 transition-all duration-200 last:border-b-0 group cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform ${
                  taskStatus.status === 'overdue' ? 'bg-red-500' :
                  taskStatus.status === 'urgent' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  {task.task_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                    {task.task_name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${taskStatus.color}`}>
                      {taskStatus.label}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Due: {new Date(task.submission_deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {task.students.length} {task.students.length === 1 ? 'student' : 'students'}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (loading && tasks.length === 0)
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-green-500 mx-auto mb-4"></div>
          <p className="text-gray-700 text-2xl font-semibold animate-pulse">
            Loading tasks...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 -mt-25 ">
      <div className="max-w-full mx-auto">
        {/* Dashboard Container */}
        <div className="bg-gray-100 rounded-lg shadow-md p-8 max-w-full ">
          
          {/* Header */}
          <div className="flex  h-14 flex-col lg:flex-row justify-between items-center mb-8 pb-6 border-b-2 border-gray-200">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 lg:mb-0">
              
            </h1>
            <div className="flex items-center gap-6">
              {/* Stats */}
              <div className="hidden sm:flex gap-4">
                <div className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-center shadow-sm">
                  <div className="text-2xl font-bold">{tasks.length}</div>
                  <div className="text-sm text-gray-500">Total Tasks</div>
                </div>
                <div className="bg-white border-2 border-yellow-200 text-gray-700 px-6 py-3 rounded-lg text-center shadow-sm">
                  <div className="text-2xl font-bold">
                    {tasks.filter(t => getTaskStatus(t.submission_deadline).status === 'urgent').length}
                  </div>
                  <div className="text-sm text-gray-500">Due Soon</div>
                </div>
              </div>
              
              {/* Add Task Button */}
              <button
                onClick={handleAddTask}
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-300"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by task or student name..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-l-lg text-gray-700 placeholder-gray-400"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 font-semibold transition-all duration-300"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleClearSearch}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 font-semibold rounded-r-lg transition-all duration-300"
              >
                Clear
              </button>
            </form>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 flex-wrap items-center">
              {/* View Mode Toggle */}
              <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center ${
                    viewMode === 'card'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center ${
                    viewMode === 'list'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4 mr-1" />
                  List
                </button>
              </div>

              {/* Filter Buttons */}
              {[
                { key: 'all', label: 'All Tasks' },
                { key: 'active', label: 'Active' },
                { key: 'urgent', label: 'Due Soon' },
                { key: 'overdue', label: 'Overdue' }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setFilterStatus(filter.key)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    filterStatus === filter.key
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300 hover:shadow-sm'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Tasks Grid/List */}
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-xl font-medium">
                {tasks.length === 0 ? 'No tasks found.' : 'No tasks match the current filter.'}
              </p>
            </div>
          ) : (
            viewMode === 'card' ? renderTaskCards() : renderTaskList()
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;



// Assigned Students