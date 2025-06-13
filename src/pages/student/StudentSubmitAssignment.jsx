// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const StudentSubmitAssignment = () => {
//   const { taskId } = useParams(); // 👈 Get taskId from the URL
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [taskName, setTaskName] = useState(''); // 👈 State for task name

//   // Fetch assignment details
//   useEffect(() => {
//     const fetchAssignment = async () => {
//       const token = localStorage.getItem('access_token');
//       try {
//         const res = await axios.get(`http://localhost:8000/student/task/?taskId=${taskId}`, {
//         headers: {
//          Authorization: `Bearer ${token}`,
//         },
//         });
//         setTaskName(res.data.task_name);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load assignment.');
//       }
//     };
//     fetchAssignment();
//   }, [taskId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     if (!file) {
//       setError('Please upload a file.');
//       return;
//     }

//     const token = localStorage.getItem('access_token');
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('assignment', taskId);

//     try {
//         await axios.post(
//         `http://localhost:8000/student/submission/?taskId=${taskId}`,
//         formData,
//       {
//       headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data',
//       },
//      }
//     );
//       setMessage('Assignment submitted successfully!');
//       setFile(null);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.detail || 'Submission failed.');
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
//       <h2 className="text-2xl font-semibold mb-4">Submit Assignment</h2>
//       {taskName && <h3 className="text-lg font-medium mb-2">Task: {taskName}</h3>}

//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {message && <p className="text-green-600 mb-2">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1">Upload File</label>
//           <input
//             type="file"
//             className="w-full"
//             onChange={(e) => setFile(e.target.files[0])}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Submit Assignment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudentSubmitAssignment;


// ==========================================================================









// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const StudentSubmitAssignment = () => {
//   const { taskId } = useParams(); // 👈 Get taskId from the URL
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [taskName, setTaskName] = useState(''); // 👈 State for task name
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [dragActive, setDragActive] = useState(false);

//   // Fetch assignment details
//   useEffect(() => {
//     const fetchAssignment = async () => {
//       const token = localStorage.getItem('access_token');
//       try {
//         const res = await axios.get(`http://localhost:8000/student/task/?taskId=${taskId}`, {
//         headers: {
//          Authorization: `Bearer ${token}`,
//         },
//         });
//         setTaskName(res.data.task_name);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load assignment.');
//       }
//     };
//     fetchAssignment();
//   }, [taskId]);
//   console.log(("tt=",taskName));
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');
//     setIsSubmitting(true);

//     if (!file) {
//       setError('Please upload a file.');
//       setIsSubmitting(false);
//       return;
//     }

//     const token = localStorage.getItem('access_token');
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('assignment', taskId);

//     try {
//         await axios.post(
//         `http://localhost:8000/student/submission/?taskId=${taskId}`,
//         formData,
//       {
//       headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'multipart/form-data',
//       },
//      }
//     );
//       setMessage('Assignment submitted successfully!');
//       setFile(null);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.detail || 'Submission failed.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setFile(e.dataTransfer.files[0]);
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const removeFile = () => {
//     setFile(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-colors duration-300">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto">
//           {/* Header Section */}
//           <div className="mb-8">
//             <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
//               <div className="flex items-center space-x-4 mb-4">
//                 <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                       d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent">
//                     Submit Assignment
//                   </h1>
//                   <p className="text-slate-600 dark:text-slate-300 mt-1">
//                     Upload your completed assignment file
//                   </p>
//                 </div>
//               </div>

//               {taskName && (
//                 <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-700/50">
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg">
//                       <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Assignment</p>
//                       <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">{taskName}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Main Form */}
//           <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 dark:border-slate-700/50 p-8">
//             {/* Messages */}
//             {error && (
//               <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
//                 </div>
//               </div>
//             )}

//             {message && (
//               <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <p className="text-green-700 dark:text-green-300 font-medium">{message}</p>
//                 </div>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* File Upload Area */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">
//                   Upload Assignment File
//                 </label>
                
//                 <div
//                   className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
//                     dragActive
//                       ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 scale-105'
//                       : file
//                       ? 'border-green-300 bg-green-50 dark:bg-green-900/20'
//                       : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-700/50'
//                   }`}
//                   onDragEnter={handleDrag}
//                   onDragLeave={handleDrag}
//                   onDragOver={handleDrag}
//                   onDrop={handleDrop}
//                 >
//                   <input
//                     type="file"
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     required
//                   />
                  
//                   {!file ? (
//                     <div className="space-y-4">
//                       <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-800 dark:to-blue-800 rounded-full flex items-center justify-center">
//                         <svg className="w-8 h-8 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                             d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
//                           Drop your file here or click to browse
//                         </p>
//                         <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//                           Supports PDF, DOC, DOCX, TXT and other common formats
//                         </p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 rounded-full flex items-center justify-center">
//                         <svg className="w-8 h-8 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-lg font-semibold text-green-700 dark:text-green-300">
//                           File Selected
//                         </p>
//                         <div className="mt-3 bg-white dark:bg-slate-700 rounded-lg p-4 border border-green-200 dark:border-green-700">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-3">
//                               <div className="p-2 bg-slate-100 dark:bg-slate-600 rounded-lg">
//                                 <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <p className="font-medium text-slate-800 dark:text-slate-200">{file.name}</p>
//                                 <p className="text-sm text-slate-500 dark:text-slate-400">{formatFileSize(file.size)}</p>
//                               </div>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={removeFile}
//                               className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
//                             >
//                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-center">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || !file}
//                   className={`group relative px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform ${
//                     isSubmitting || !file
//                       ? 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
//                       : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover:shadow-xl hover:scale-105 active:scale-95'
//                   }`}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center space-x-3">
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       <span>Submitting...</span>
//                     </div>
//                   ) : (
//                     <div className="flex items-center space-x-3">
//                       <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                           d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                       </svg>
//                       <span>Submit Assignment</span>
//                     </div>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Help Section */}
//           <div className="mt-8 bg-slate-100/50 dark:bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
//             <div className="flex items-start space-x-3">
//               <svg className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <div>
//                 <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Submission Guidelines</h3>
//                 <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
//                   <li>• Ensure your file is properly formatted and contains all required content</li>
//                   <li>• Maximum file size limit may apply depending on your institution's policy</li>
//                   <li>• Double-check that you're submitting the correct assignment file</li>
//                   <li>• You can resubmit if needed before the deadline</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentSubmitAssignment;




// =========================================================













import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentSubmitAssignment = () => {
  const { taskId } = useParams();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [taskName, setTaskName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Fetch assignment details
  useEffect(() => {
    const fetchAssignment = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const res = await axios.get(`http://localhost:8000/student/task/?taskId=${taskId}`, {
        headers: {
         Authorization: `Bearer ${token}`,
        },
        });
        setTaskName(res.data.task_name);
      } catch (err) {
        console.error(err);
        setError('Failed to load assignment.');
      }
    };
    fetchAssignment();
  }, [taskId]);
  console.log(("tt=",taskName));
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    if (!file) {
      setError('Please upload a file.');
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('file', file);
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
      setMessage('Assignment submitted successfully!');
      setFile(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Submission failed.');
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
      setFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with subtle pattern */}
      <div className="bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Assignment</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your completed assignment and ensure all requirements are met before submission
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Assignment Info Card */}
          {taskName && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Assignment</h2>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{taskName}</h3>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Main Submission Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-8">
              {/* Messages */}
              {error && (
                <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {message && (
                <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">{message}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* File Upload Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Upload Your Assignment</h3>
                      <p className="text-sm text-gray-600 mt-1">Select or drag and drop your assignment file</p>
                    </div>
                    {file && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        File Selected
                      </span>
                    )}
                  </div>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
                      dragActive
                        ? 'border-blue-400 bg-blue-50'
                        : file
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                    />
                    
                    {!file ? (
                      <div className="p-12 text-center">
                        <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Choose a file or drag it here</h4>
                        <p className="text-gray-600 mb-4">PDF, DOC, DOCX, TXT files up to 10MB</p>
                        <button
                          type="button"
                          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Browse Files
                        </button>
                      </div>
                    ) : (
                      <div className="p-8">
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Ready
                              </span>
                              <button
                                type="button"
                                onClick={removeFile}
                                className="inline-flex items-center p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ensure your file meets all assignment requirements
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !file}
                      className={`px-8 py-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                        isSubmitting || !file
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          <span>Submit Assignment</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Help & Guidelines */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Submission Guidelines</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <p className="text-sm text-gray-600">Ensure your file is properly formatted and contains all required content</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <p className="text-sm text-gray-600">Check file size limits and supported formats before uploading</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <p className="text-sm text-gray-600">Double-check that you're submitting the correct assignment file</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <p className="text-sm text-gray-600">You can resubmit if needed before the deadline</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubmitAssignment;