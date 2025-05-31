// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const AddLesson = () => {
// //   const [lessonName, setLessonName] = useState('');
// //   const [video, setVideo] = useState(null);
// //   const [chapterId, setChapterId] = useState('');
// //   const [chapters, setChapters] = useState([]);
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   const token = localStorage.getItem('access_token');

// //   useEffect(() => {
// //     const fetchChapters = async () => {
// //       try {
// //         const res = await axios.get('http://localhost:8000/teacher/chapter/', {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setChapters(res.data);
// //       } catch (err) {
// //         console.error(err);
// //         setError('Failed to load chapters');
// //       }
// //     };

// //     fetchChapters();
// //   }, [token]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!lessonName || !video || !chapterId) {
// //       setError('All fields are required');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('lesson_name', lessonName);
// //     formData.append('video', video);
// //     formData.append('chapter', chapterId);

// //     try {
// //       await axios.post('http://localhost:8000/teacher/task/lesson/', formData, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });
// //       navigate('/teacher/lesson/upload'); // Redirect after success
// //     } catch (err) {
// //       console.error(err);
// //       setError('Failed to add lesson');
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <h1 className="text-2xl font-bold mb-4">Add New Lesson</h1>

// //       {error && <p className="text-red-500 mb-4">{error}</p>}

// //       <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-lg">
// //         <div className="mb-4">
// //           <label className="block mb-1 font-semibold">Lesson Name:</label>
// //           <input
// //             type="text"
// //             value={lessonName}
// //             onChange={(e) => setLessonName(e.target.value)}
// //             className="w-full border px-3 py-2 rounded"
// //           />
// //         </div>

// //         <div className="mb-4">
// //           <label className="block mb-1 font-semibold">Video File:</label>
// //           <input
// //             type="file"
// //             accept="video/*"
// //             onChange={(e) => setVideo(e.target.files[0])}
// //             className="w-full"
// //           />
// //         </div>

// //         <div className="mb-4">
// //           <label className="block mb-1 font-semibold">Chapter:</label>
// //           <select
// //             value={chapterId}
// //             onChange={(e) => setChapterId(e.target.value)}
// //             className="w-full border px-3 py-2 rounded"
// //           >
// //             <option value="">Select a chapter</option>
// //             {chapters.map((chap) => (
// //               <option key={chap.id} value={chap.id}>
// //                 {chap.chapter_name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
// //         >
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddLesson;



// // =============================================================







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddLesson = () => {
//   const [lessonName, setLessonName] = useState('');
//   const [video, setVideo] = useState(null);
//   const [chapterId, setChapterId] = useState('');
//   const [chapters, setChapters] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const token = localStorage.getItem('access_token');

//   useEffect(() => {
//     const fetchChapters = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/teacher/chapter/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setChapters(res.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load chapters');
//       }
//     };

//     fetchChapters();
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!lessonName || !video || !chapterId) {
//       setError('All fields are required');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('lesson_name', lessonName);
//     formData.append('video', video);
//     formData.append('chapter', chapterId);

//     try {
//       await axios.post('http://localhost:8000/teacher/task/lesson/', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       navigate('/teacher/lesson/upload'); // Redirect after success
//     } catch (err) {
//       console.error(err);
//       setError('Failed to add lesson');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
//         <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
//           Add New Lesson
//         </h1>

//         {error && (
//           <p className="mb-6 text-center text-red-600 font-semibold">{error}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="lessonName"
//               className="block mb-2 text-sm font-semibold text-gray-700"
//             >
//               Lesson Name
//             </label>
//             <input
//               id="lessonName"
//               type="text"
//               value={lessonName}
//               onChange={(e) => setLessonName(e.target.value)}
//               placeholder="Enter lesson name"
//               className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="video"
//               className="block mb-2 text-sm font-semibold text-gray-700"
//             >
//               Video File
//             </label>
//             <input
//               id="video"
//               type="file"
//               accept="video/*"
//               onChange={(e) => setVideo(e.target.files[0])}
//               className="w-full text-gray-700"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="chapter"
//               className="block mb-2 text-sm font-semibold text-gray-700"
//             >
//               Chapter
//             </label>
//             <select
//               id="chapter"
//               value={chapterId}
//               onChange={(e) => setChapterId(e.target.value)}
//               className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             >
//               <option value="">Select a chapter</option>
//               {chapters.map((chap) => (
//                 <option key={chap.id} value={chap.id}>
//                   {chap.chapter_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-6 py-3 shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddLesson;


// ============================================================================




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLesson = () => {
  const [lessonName, setLessonName] = useState('');
  const [video, setVideo] = useState(null);
  const [chapterId, setChapterId] = useState('');
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await axios.get('http://localhost:8000/teacher/chapter/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChapters(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load chapters');
      }
    };

    fetchChapters();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lessonName || !video || !chapterId) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('lesson_name', lessonName);
    formData.append('video', video);
    formData.append('chapter', chapterId);

    try {
      await axios.post('http://localhost:8000/teacher/task/lesson/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/teacher/lesson/upload');
    } catch (err) {
      console.error(err);
      setError('Failed to add lesson');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        <div className={`max-w-2xl mx-auto rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Add New Lesson
            </h1>

            {error && (
              <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="lessonName"
                  className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Lesson Name
                </label>
                <input
                  id="lessonName"
                  type="text"
                  value={lessonName}
                  onChange={(e) => setLessonName(e.target.value)}
                  placeholder="Enter lesson name"
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'}`}
                />
              </div>

              <div>
                <label
                  htmlFor="video"
                  className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Video File
                </label>
                <div className={`flex items-center justify-center w-full rounded-lg border-2 border-dashed ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'} px-6 pt-5 pb-6`}>
                  <div className="space-y-1 text-center">
                    <svg
                      className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm">
                      <label
                        htmlFor="video"
                        className={`relative cursor-pointer rounded-md font-medium focus-within:outline-none ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                      >
                        <span>Upload a file</span>
                        <input
                          id="video"
                          name="video"
                          type="file"
                          accept="video/*"
                          onChange={(e) => setVideo(e.target.files[0])}
                          className="sr-only"
                        />
                      </label>
                      <p className={`pl-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>or drag and drop</p>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      MP4, MOV, or AVI up to 100MB
                    </p>
                  </div>
                </div>
                {video && (
                  <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Selected: {video.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="chapter"
                  className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Chapter
                </label>
                <select
                  id="chapter"
                  value={chapterId}
                  onChange={(e) => setChapterId(e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' : 'border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'}`}
                >
                  <option value="">Select a chapter</option>
                  {chapters.map((chap) => (
                    <option key={chap.id} value={chap.id}>
                      {chap.chapter_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Create Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;