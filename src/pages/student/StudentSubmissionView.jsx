// Assignment Submissions



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid3X3, List, Clock, Calendar, FileText, Download, Star, Award, CheckCircle, AlertTriangle, BookOpen, ExternalLink } from "lucide-react";

const StudentSubmissionView = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCardView, setIsCardView] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/student/submission/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmissions(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load submissions. Redirecting to create profile...");
        // Navigate to create profile page after short delay
        setTimeout(() => {
          navigate("/student/createprofile");
        }, 1500);
      }
      setLoading(false);
    };

    fetchSubmissions();
  }, [navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'graded':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getMarkColor = (mark) => {
    if (mark >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (mark >= 80) return 'text-green-600 dark:text-green-400';
    if (mark >= 70) return 'text-yellow-600 dark:text-yellow-400';
    if (mark >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradientColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'submitted':
        return 'from-blue-500 to-blue-600';
      case 'graded':
        return 'from-green-500 to-green-600';
      case 'pending':
        return 'from-yellow-500 to-yellow-600';
      case 'rejected':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'submitted':
        return <CheckCircle className="w-4 h-4 text-white" />;
      case 'graded':
        return <Award className="w-4 h-4 text-white" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-white" />;
      case 'rejected':
        return <AlertTriangle className="w-4 h-4 text-white" />;
      default:
        return <FileText className="w-4 h-4 text-white" />;
    }
  };

  // Card View Component
  const CardView = () => (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {submissions.map((submission, index) => (
        <div key={submission.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover:border-blue-300 h-full">
          {/* Status Header */}
          <div className={`h-2 bg-gradient-to-r ${getGradientColor(submission.status)}`}></div>
          
          {/* Card Content */}
          <div className="p-6">
            {/* Header with Status */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${getGradientColor(submission.status)} rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
                  {getStatusIcon(submission.status)}
                </div>
              </div>
              <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                {submission.status}
              </div>
            </div>

            {/* Assignment Title */}
            <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {submission.assignment}
            </h3>

            {/* Grade Display */}
            {submission.mark !== null && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Grade</span>
                  <div className="flex items-center space-x-1">
                    <span className={`text-2xl font-bold ${getMarkColor(submission.mark)}`}>
                      {submission.mark}
                    </span>
                    <span className="text-gray-500 text-sm">/100</span>
                  </div>
                </div>
                {/* Grade Progress Bar */}
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      submission.mark >= 90 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                      submission.mark >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      submission.mark >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                      submission.mark >= 60 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${Math.min(submission.mark, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Submission Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                <span>Submitted: {formatDate(submission.submitted_at)}</span>
              </div>
            </div>

            {/* View File Button */}
            {submission.file && (
              <a
                href={submission.file}
                className="w-full inline-flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Submission
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // List View Component
  const ListView = () => (
    <div className="space-y-3">
      {submissions.map((submission, index) => (
        <div key={submission.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:border-blue-300">
          <div className="p-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center space-x-4 flex-1">
                {/* Status Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${getGradientColor(submission.status)} rounded-xl flex items-center justify-center shadow-sm`}>
                  {getStatusIcon(submission.status)}
                </div>

                {/* Submission Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Submission
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                    {submission.mark !== null && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-600`}>
                        Grade: {submission.mark}/100
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                    {submission.assignment}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Submitted: {formatDate(submission.submitted_at)}</span>
                  </div>
                </div>
              </div>

              {/* Middle Section - Grade */}
              {submission.mark !== null && (
                <div className="hidden md:flex items-center space-x-4 mx-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getMarkColor(submission.mark)}`}>
                      {submission.mark}
                    </div>
                    <div className="text-xs text-gray-500">Grade</div>
                  </div>
                </div>
              )}

              {/* Right Section - Action */}
              <div className="flex items-center space-x-3">
                {submission.file && (
                  <a
                    href={submission.file}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View File
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
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
              <p className="text-gray-600 font-medium animate-pulse">Loading your submissions...</p>
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
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-blue-900">{submissions.length}</p>
                <p className="text-xs text-blue-700">Total Submissions</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-green-900">
                  {submissions.filter(s => s.status?.toLowerCase() === 'graded').length}
                </p>
                <p className="text-xs text-green-700">Graded</p>
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
                  {submissions.filter(s => s.status?.toLowerCase() === 'pending').length}
                </p>
                <p className="text-xs text-yellow-700">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-bold text-purple-900">
                  {submissions.filter(s => s.mark >= 90).length}
                </p>
                <p className="text-xs text-purple-700">A+ Grades</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600 mt-1">
              {submissions.length} submission{submissions.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {/* View Toggle Switch */}
          {submissions.length > 0 && (
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
        {submissions.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No Submissions Found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Your submitted assignments will appear here once you start submitting them.
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

        {/* Submissions Display */}
        {submissions.length > 0 && (
          <>
            {isCardView ? <CardView /> : <ListView />}
            
            {/* Submission Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Submission Summary</h3>
                <p className="text-gray-600 mb-4">
                  Track your academic progress and performance
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{submissions.length}</p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {submissions.filter(s => s.status?.toLowerCase() === 'graded').length}
                    </p>
                    <p className="text-sm text-gray-500">Graded</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {submissions.filter(s => s.status?.toLowerCase() === 'pending').length}
                    </p>
                    <p className="text-sm text-gray-500">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {submissions.filter(s => s.mark >= 90).length}
                    </p>
                    <p className="text-sm text-gray-500">A+ Grades</p>
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

export default StudentSubmissionView;