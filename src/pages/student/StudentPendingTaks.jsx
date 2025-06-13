

// Assignment Tasks

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid3X3, List, Clock, Calendar, Users, UserX, FileDown, Send, AlertTriangle, CheckCircle, Star, XCircle, UploadCloud } from "lucide-react"; // Added XCircle and UploadCloud for file upload UI

const StudentPendingTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCardView, setIsCardView] = useState(true);
  const [submittingTaskId, setSubmittingTaskId] = useState(null); // State to hold the ID of the task being submitted
  const [submissionFile, setSubmissionFile] = useState(null); // State to hold the selected file for submission
  const [submissionMessage, setSubmissionMessage] = useState(''); // Message after submission
  const [submissionError, setSubmissionError] = useState(''); // Error after submission
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission in progress
  const [dragActive, setDragActive] = useState(false); // For drag and drop UI
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/student/task/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data);
        setError("");
      } catch (err) {
        console.error("Fetch tasks error:", err);
        setError("Failed to load tasks. Please check your login.");
        // navigate("/student/createprofile"); // Optionally keep navigation or handle error locally
      }
      setLoading(false);
    };

    fetchTasks();
  }, [navigate,isSubmitting]);

  // Renamed for clarity, now it sets the task ID for submission UI
  const handleInitiateSubmission = (taskId) => {
    setSubmittingTaskId(taskId);
    setSubmissionFile(null); // Clear previous file selection
    setSubmissionMessage('');
    setSubmissionError('');
  };

  const handleCancelSubmission = () => {
    setSubmittingTaskId(null);
    setSubmissionFile(null);
    setSubmissionMessage('');
    setSubmissionError('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSubmissionFile(e.target.files[0]);
      setSubmissionError('');
    }
  };

  const handleSubmission = async (e, taskId) => {
    e.preventDefault();
    setSubmissionError('');
    setSubmissionMessage('');
    setIsSubmitting(true);

    if (!submissionFile) {
      setSubmissionError('Please upload a file.');
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('file', submissionFile);
    formData.append('assignment', taskId);

    try {
      await axios.post(
        `http://localhost:8000/student/submission/?taskId=${taskId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSubmissionMessage('Assignment submitted successfully!');
      setSubmissionFile(null);
      setSubmittingTaskId(null); // Close the submission area
      // Optionally re-fetch tasks to update status
      fetchTasks(); 
    } catch (err) {
      console.error(err);
      setSubmissionError(err.response?.data?.detail || 'Submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSubmissionFile(e.dataTransfer.files[0]);
      setSubmissionError('');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeSubmissionFile = () => {
    setSubmissionFile(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const getDaysUntilDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get task color based on urgency
  const getTaskColor = (deadline) => {
    const daysLeft = getDaysUntilDeadline(deadline);
    const overdue = isOverdue(deadline);
    
    if (overdue) return 'from-red-500 to-red-600';
    if (daysLeft <= 1) return 'from-orange-500 to-orange-600';
    if (daysLeft <= 3) return 'from-yellow-500 to-yellow-600';
    return 'from-blue-500 to-blue-600';
  };

  // Get priority level
  const getPriorityLevel = (deadline) => {
    const daysLeft = getDaysUntilDeadline(deadline);
    const overdue = isOverdue(deadline);
    
    if (overdue) return { label: 'Overdue', level: 4 };
    if (daysLeft <= 1) return { label: 'Critical', level: 3 };
    if (daysLeft <= 3) return { label: 'High', level: 2 };
    return { label: 'Normal', level: 1 };
  };

  // Card View Component
  const CardView = () => (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => {
        const daysLeft = getDaysUntilDeadline(task.submission_deadline);
        const overdue = isOverdue(task.submission_deadline);
        const priority = getPriorityLevel(task.submission_deadline);
        
        return (
          <div key={task.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:border-blue-300 h-full">
            {/* Task Header with Priority Color */}
            <div className={`h-2 bg-gradient-to-r ${getTaskColor(task.submission_deadline)}`}></div>
            
            {/* Task Content */}
            <div className="p-6">
              {/* Header with Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getTaskColor(task.submission_deadline)} rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    {overdue ? (
                      <AlertTriangle className="w-4 h-4 text-white" />
                    ) : (
                      <Send className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                  overdue 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    : daysLeft <= 3
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {overdue ? 'Overdue' : daysLeft <= 0 ? 'Due Today' : `${daysLeft} days left`}
                </div>
              </div>

              {/* Priority Badge */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Assignment
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  priority.level === 4 ? 'bg-red-100 text-red-600' :
                  priority.level === 3 ? 'bg-orange-100 text-orange-600' :
                  priority.level === 2 ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {priority.label} Priority
                </span>
              </div>

              {/* Task Title */}
              <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {task.task_name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {task.description}
              </p>

              {/* Task File */}
              {task.task_file && (
                <a
                  href={task.task_file}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 transition-colors duration-200 group/link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileDown className="w-4 h-4 mr-2 group-hover/link:scale-110 transition-transform duration-200" />
                  Download Task File
                </a>
              )}

              {/* Task Details */}
              <div className="space-y-3 mb-4">
                {/* Dates */}
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Uploaded: {formatDate(task.uploaded_at)}</span>
                </div>

                <div className={`flex items-center text-sm ${
                  overdue ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Deadline: {formatDate(task.submission_deadline)}</span>
                </div>

                {/* Students */}
                {task.students && task.students.length > 0 && (
                  <div className="flex items-start text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-green-500" />
                    <span className="line-clamp-2">
                      Assigned to: {task.students.map(s => s.full_name).join(", ")}
                    </span>
                  </div>
                )}

                {/* Blocked Students */}
                {task.blocked_students && task.blocked_students.length > 0 && (
                  <div className="flex items-start text-sm text-red-600">
                    <UserX className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">
                      Blocked: {task.blocked_students.map(s => s.full_name).join(", ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={() => handleInitiateSubmission(task.id)}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  overdue 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:ring-red-500'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" />
                  Submit Assignment
                </div>
              </button>

              {/* Inline Submission Form for Card View */}
              {submittingTaskId === task.id && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-800 mb-4">Upload Submission for "{task.task_name}"</h4>
                  {submissionError && (
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" /> {submissionError}
                    </div>
                  )}
                  {submissionMessage && (
                    <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" /> {submissionMessage}
                    </div>
                  )}
                  <form onSubmit={(e) => handleSubmission(e, task.id)} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                    <label 
                      htmlFor={`file-upload-${task.id}`}
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'} border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200`}
                    >
                      {submissionFile ? (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <FileDown className="w-5 h-5" />
                          <span>{submissionFile.name} ({formatFileSize(submissionFile.size)})</span>
                          <button type="button" onClick={removeSubmissionFile} className="text-red-500 hover:text-red-700">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500">PDF, DOCX, ZIP, etc.</p>
                        </div>
                      )}
                      <input id={`file-upload-${task.id}`} type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        type="button"
                        onClick={handleCancelSubmission}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !submissionFile}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  // List View Component
  const ListView = () => (
    <div className="space-y-3">
      {tasks.map((task) => {
        const daysLeft = getDaysUntilDeadline(task.submission_deadline);
        const overdue = isOverdue(task.submission_deadline);
        const priority = getPriorityLevel(task.submission_deadline);
        
        return (
          <div key={task.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:border-blue-300">
            <div className="p-4">
              <div className="flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center space-x-4 flex-1">
                  {/* Task Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${getTaskColor(task.submission_deadline)} rounded-xl flex items-center justify-center shadow-sm`}>
                    {overdue ? (
                      <AlertTriangle className="w-5 h-5 text-white" />
                    ) : (
                      <Send className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Task Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Assignment
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        priority.level === 4 ? 'bg-red-100 text-red-600' :
                        priority.level === 3 ? 'bg-orange-100 text-orange-600' :
                        priority.level === 2 ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {priority.label}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        overdue 
                          ? 'bg-red-100 text-red-800'
                          : daysLeft <= 3
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {overdue ? 'Overdue' : daysLeft <= 0 ? 'Due Today' : `${daysLeft} days left`}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                      {task.task_name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {task.description}
                    </p>
                  </div>
                </div>

                {/* Middle Section - Stats */}
                <div className="hidden md:flex items-center space-x-6 mx-6">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(task.uploaded_at)}</span>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    overdue ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(task.submission_deadline)}</span>
                  </div>
                  {task.students && task.students.length > 0 && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{task.students.length} students</span>
                    </div>
                  )}
                </div>

                {/* Right Section - Action */}
                <div className="flex items-center space-x-3">
                  {task.task_file && (
                    <a
                      href={task.task_file}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Download Task File"
                    >
                      <FileDown className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleInitiateSubmission(task.id)}
                    className={`px-4 py-2 font-medium text-sm rounded-lg transition-colors duration-200 ${
                      overdue
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Submit Assignment
                  </button>
                </div>
              </div>
              {/* Inline Submission Form for List View */}
              {submittingTaskId === task.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-800 mb-4">Upload Submission for "{task.task_name}"</h4>
                  {submissionError && (
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" /> {submissionError}
                    </div>
                  )}
                  {submissionMessage && (
                    <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" /> {submissionMessage}
                    </div>
                  )}
                  <form onSubmit={(e) => handleSubmission(e, task.id)} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                    <label 
                      htmlFor={`file-upload-list-${task.id}`}
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'} border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200`}
                    >
                      {submissionFile ? (
                        <div className="flex items-center space-x-2 text-gray-700">
                          <FileDown className="w-5 h-5" />
                          <span>{submissionFile.name} ({formatFileSize(submissionFile.size)})</span>
                          <button type="button" onClick={removeSubmissionFile} className="text-red-500 hover:text-red-700">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500">PDF, DOCX, ZIP, etc.</p>
                        </div>
                      )}
                      <input id={`file-upload-list-${task.id}`} type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        type="button"
                        onClick={handleCancelSubmission}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !submissionFile}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center p-12">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animate-reverse mx-auto"></div>
              </div>
              <p className="text-gray-600 font-medium animate-pulse">Loading your assignments...</p>
              <div className="flex space-x-1 justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Send className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-blue-900">{tasks.length}</p>
                <p className="text-xs text-blue-700">Total Tasks</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-red-900">
                  {tasks.filter(task => isOverdue(task.submission_deadline)).length}
                </p>
                <p className="text-xs text-red-700">Overdue</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-yellow-900">
                  {tasks.filter(task => getDaysUntilDeadline(task.submission_deadline) <= 3 && !isOverdue(task.submission_deadline)).length}
                </p>
                <p className="text-xs text-yellow-700">Due Soon</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-green-900">
                  {tasks.filter(task => getDaysUntilDeadline(task.submission_deadline) > 3).length}
                </p>
                <p className="text-xs text-green-700">On Track</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600 mt-1">
              {tasks.length} assignment{tasks.length !== 1 ? 's' : ''} pending
            </p>
          </div>
          
          {/* View Toggle Switch */}
          {tasks.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${!isCardView ? 'text-gray-900' : 'text-gray-500'}`}>
                List
              </span>
              <List className={`w-4 h-4 ${!isCardView ? 'text-gray-900' : 'text-gray-400'}`} />
              
              {/* Toggle Switch */}
              <button
                onClick={() => setIsCardView(!isCardView)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isCardView ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    isCardView ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              
              <Grid3X3 className={`w-4 h-4 ${isCardView ? 'text-gray-900' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${isCardView ? 'text-gray-900' : 'text-gray-500'}`}>
                Cards
              </span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl shadow-sm mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-red-700 font-medium">{error}</p>
                <p className="text-red-600 text-sm mt-1">Please try refreshing the page or contact support if the issue persists.</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {tasks.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No Assignments Found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              You don't have any pending assignments at the moment. Check back later or contact your instructor.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Clock className="w-4 h-4 mr-2" />
              Refresh Page
            </button>
          </div>
        )}

        {/* Tasks Display */}
        {tasks.length > 0 && (
          <>
            {isCardView ? <CardView /> : <ListView />}
            
            {/* Task Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Assignment Summary</h3>
                <p className="text-gray-600 mb-4">
                  Stay on top of your assignments and meet all deadlines
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{tasks.length}</p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {tasks.filter(task => isOverdue(task.submission_deadline)).length}
                    </p>
                    <p className="text-sm text-gray-500">Overdue</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {tasks.filter(task => getDaysUntilDeadline(task.submission_deadline) <= 3 && !isOverdue(task.submission_deadline)).length}
                    </p>
                    <p className="text-sm text-gray-500">Due Soon</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {tasks.filter(task => getDaysUntilDeadline(task.submission_deadline) > 3).length}
                    </p>
                    <p className="text-sm text-gray-500">On Track</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentPendingTasks;


// Assignment Submissions