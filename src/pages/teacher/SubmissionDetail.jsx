// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function SubmissionDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [submission, setSubmission] = useState(null);
//   const [error, setError] = useState("");
//   const [newMark, setNewMark] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [success, setSuccess] = useState(false);

//   // Get token from localStorage
//   const token = localStorage.getItem("access_token"); // Adjust key if different

//   useEffect(() => {
//     if (!token) {
//       setError("Unauthorized. Please login.");
//       navigate("/login");
//       return;
//     }

//     axios
//       .get(`http://localhost:8000/teacher/submission/?submissionId=${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setSubmission(res.data);
//         if (res.data.mark === null) {
//           setNewMark(""); // allow mark input if null
//         }
//       })
//       .catch((err) => {
//         if (err.response?.status === 401) {
//           setError("Unauthorized access. Please login again.");
//           navigate("/login");
//         } else {
//           setError("Submission not found");
//         }
//         console.error(err);
//       });
//   }, [id, token, navigate]);

//   const handleMarkSave = async () => {
//     if (!newMark.trim()) return;

//     if (!token) {
//       setError("Unauthorized. Please login.");
//       navigate("/login");
//       return;
//     }

//     setSaving(true);
//     setError("");
//     setSuccess(false);

//     try {
//       const response = await axios.put(
//         `http://localhost:8000/teacher/submission/?taskId=${id}`,
//         { mark: newMark },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setSubmission(response.data);
//       setSuccess(true);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         setError("Unauthorized access. Please login again.");
//         navigate("/login");
//       } else {
//         setError("Failed to save mark.");
//       }
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!submission) return <p>Loading...</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Submission Detail</h1>

//       <div className="bg-white shadow rounded p-4 space-y-2">
//         <p>
//           <strong>Student:</strong> {submission.student}
//         </p>
//         <p>
//           <strong>Assignment:</strong> {submission.assignment}
//         </p>
//         <p>
//           <strong>Status:</strong> {submission.status}
//         </p>

//         <p>
//           <strong>Mark:</strong>{" "}
//           {submission.mark !== null ? (
//             submission.mark
//           ) : (
//             <div className="flex items-center gap-2 mt-1">
//               <input
//                 type="number"
//                 value={newMark}
//                 onChange={(e) => setNewMark(e.target.value)}
//                 placeholder="Enter mark"
//                 className="border px-3 py-1 rounded w-24"
//               />
//               <button
//                 onClick={handleMarkSave}
//                 disabled={saving}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//               >
//                 {saving ? "Saving..." : "Save"}
//               </button>
//             </div>
//           )}
//         </p>

//         {success && <p className="text-green-600">Mark saved successfully!</p>}
//         {error && <p className="text-red-500">{error}</p>}

//         <p>
//           <strong>Submitted At:</strong>{" "}
//           {new Date(submission.submitted_at).toLocaleString()}
//         </p>

//         <p>
//           <strong>File:</strong>{" "}
//           {submission.file ? (
//             <a
//               href={submission.file}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 underline"
//             >
//               View File
//             </a>
//           ) : (
//             "No file"
//           )}
//         </p>
//       </div>

//       <Link
//         to="/teacher/submission"
//         className="mt-4 inline-block text-blue-600 underline"
//       >
//         ← Back to submissions
//       </Link>
//     </div>
//   );
// }









// ==========================================







import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [error, setError] = useState("");
  const [newMark, setNewMark] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem("access_token"); // Adjust key if different

  useEffect(() => {
    if (!token) {
      setError("Unauthorized. Please login.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8000/teacher/submission/?submissionId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubmission(res.data);
        if (res.data.mark === null) {
          setNewMark(""); // allow mark input if null
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setError("Unauthorized access. Please login again.");
          navigate("/login");
        } else {
          setError("Submission not found");
        }
        console.error(err);
      });
  }, [id, token, navigate]);

  const handleMarkSave = async () => {
    if (!newMark.trim()) return;

    if (!token) {
      setError("Unauthorized. Please login.");
      navigate("/login");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.put(
        `http://localhost:8000/teacher/submission/?taskId=${id}`,
        { mark: newMark },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmission(response.data);
      setSuccess(true);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized access. Please login again.");
        navigate("/login");
      } else {
        setError("Failed to save mark.");
      }
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      submitted: "bg-blue-100 text-blue-800 border-blue-200",
      graded: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      late: "bg-red-100 text-red-800 border-red-200",
    };
    
    const style = statusStyles[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${style}`}>
        {status}
      </span>
    );
  };

  if (error && !submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to="/teacher/submission"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to submissions
          </Link>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg text-gray-600">Loading submission...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/teacher/submission"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4 group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to submissions
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Submission Details</h1>
          <p className="text-gray-600 mt-2">Review and grade student submission</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Student & Assignment Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 border-b border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Student</label>
                  <p className="text-xl font-semibold text-gray-900 mt-1">{submission.student}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Assignment</label>
                  <p className="text-lg text-gray-800 mt-1">{submission.assignment}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Status</label>
                  <div className="mt-2">
                    {getStatusBadge(submission.status)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Submitted</label>
                  <p className="text-gray-800 mt-1">
                    {new Date(submission.submitted_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grading Section */}
          <div className="px-6 py-6">
            <div className="mb-6">
              <label className="text-lg font-semibold text-gray-900 mb-4 block">Grading</label>
              {submission.mark !== null ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <span className="text-green-800 font-semibold text-lg">Mark: {submission.mark}</span>
                  </div>
                  <div className="text-green-600 text-sm">✓ Graded</div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-yellow-800 font-medium">Pending Grade</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 max-w-xs">
                      <label htmlFor="mark-input" className="sr-only">Enter mark</label>
                      <input
                        id="mark-input"
                        type="number"
                        value={newMark}
                        onChange={(e) => setNewMark(e.target.value)}
                        placeholder="Enter mark (0-100)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        min="0"
                        max="100"
                        disabled={saving}
                      />
                    </div>
                    <button
                      onClick={handleMarkSave}
                      disabled={saving || !newMark.trim()}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                    >
                      {saving ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        "Save Grade"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-800 font-medium">Mark saved successfully!</span>
                </div>
              </div>
            )}

            {error && submission && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-red-800 font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* File Section */}
            <div>
              <label className="text-lg font-semibold text-gray-900 mb-4 block">Submitted File</label>
              {submission.file ? (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">Submission File</p>
                        <p className="text-gray-500 text-sm">Click to view or download</p>
                      </div>
                    </div>
                    <a
                      href={submission.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View File
                    </a>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-6 text-center bg-gray-50">
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500 font-medium">No file submitted</p>
                  <p className="text-gray-400 text-sm">This submission doesn't include any files</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}