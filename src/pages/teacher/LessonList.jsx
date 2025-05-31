// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate

// const LessonList = () => {
//   const [lessons, setLessons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // ✅ initialize navigate

//   useEffect(() => {
//     const fetchLessons = async () => {
//       const token = localStorage.getItem('access_token');

//       if (!token) {
//         setError('User not logged in');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get('http://localhost:8000/teacher/task/lesson/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setLessons(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch lessons');
//         setLoading(false);
//       }
//     };

//     fetchLessons();
//   }, []);

//   if (loading) return <div className="p-4">Loading lessons...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Teacher Lessons</h1>
//         <button
//           onClick={() => navigate('/teacher/lesson/add')} // ✅ redirect
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Add Lesson
//         </button>
//       </div>

//       {lessons.length === 0 ? (
//         <p>No lessons found.</p>
//       ) : (
//         <div className="grid gap-4">
//           {lessons.map((lesson) => (
//             <div key={lesson.id} className="bg-white p-4 rounded shadow">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {lesson.lesson_name}
//               </h2>
//               <p className="text-gray-600">
//                 <strong>Chapter:</strong> {lesson.chapter}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Approved:</strong>{' '}
//                 {lesson.is_approved ? 'Yes' : 'No'}
//               </p>
//               {lesson.video && (
//                 <video
//                   className="mt-2 rounded"
//                   controls
//                   width="100%"
//                   src={lesson.video}
//                 >
//                   Your browser does not support the video tag.
//                 </video>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LessonList;












// ========================================









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LessonList = () => {
//   const [lessons, setLessons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLessons = async () => {
//       const token = localStorage.getItem('access_token');

//       if (!token) {
//         setError('User not logged in');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get('http://localhost:8000/teacher/task/lesson/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setLessons(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch lessons');
//         setLoading(false);
//       }
//     };

//     fetchLessons();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-500 text-lg font-medium">
//         Loading lessons...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold">
//         {error}
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <header className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">
//             Teacher Lessons
//           </h1>
//           <button
//             onClick={() => navigate('/teacher/lesson/add')}
//             className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             + Add Lesson
//           </button>
//         </header>

//         {lessons.length === 0 ? (
//           <p className="text-center text-gray-600 text-lg mt-20">
//             No lessons found.
//           </p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {lessons.map((lesson) => (
//               <div
//                 key={lesson.id}
//                 className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
//               >
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//                   {lesson.lesson_name}
//                 </h2>
//                 <p className="text-gray-700 mb-2">
//                   <span className="font-semibold">Chapter:</span> {lesson.chapter}
//                 </p>
//                 <p className="text-gray-700 mb-4">
//                   <span className="font-semibold">Approved:</span>{' '}
//                   <span
//                     className={
//                       lesson.is_approved ? 'text-green-600' : 'text-red-600'
//                     }
//                   >
//                     {lesson.is_approved ? 'Yes' : 'No'}
//                   </span>
//                 </p>
//                 {lesson.video && (
//                   <video
//                     className="w-full rounded-lg border border-gray-300"
//                     controls
//                     src={lesson.video}
//                   >
//                     Your browser does not support the video tag.
//                   </video>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LessonList;



// ===============================================




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setError('You are not logged in. Please log in to view lessons.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:8000/teacher/task/lesson/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLessons(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch lessons:", err);
        setError('Failed to fetch lessons. Please try again later.');
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center text-indigo-400 text-2xl font-semibold animate-pulse">
        Loading lessons...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center text-red-500 text-xl font-medium px-4 text-center">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0">
          <h1 className="text-4xl font-extrabold text-indigo-400 tracking-tight leading-tight">
            Your Lessons
          </h1>
          <button
            onClick={() => navigate('/teacher/lesson/add')}
            className="inline-flex items-center px-7 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
          >
            <svg
              className="w-5 h-5 mr-2 -ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add New Lesson
          </button>
        </header>

        {lessons.length === 0 ? (
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center mt-20 border border-gray-700">
            <p className="text-gray-400 text-xl font-medium">
              You haven't added any lessons yet. Click "Add New Lesson" to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => { /* Handle navigation to lesson details if needed */ }}
              >
                <h2 className="text-2xl font-bold text-indigo-300 mb-3 leading-snug">
                  {lesson.lesson_name}
                </h2>
                <div className="space-y-1 mb-4">
                  <p className="text-gray-300 text-lg">
                    <span className="font-semibold text-gray-400">Chapter:</span> {lesson.chapter}
                  </p>
                  <p className="text-gray-300 text-lg flex items-center">
                    <span className="font-semibold text-gray-400 mr-2">Approved:</span>
                    <span
                      className={`font-bold ${
                        lesson.is_approved ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {lesson.is_approved ? 'Yes' : 'No'}
                    </span>
                    {lesson.is_approved ? (
                      <svg
                        className="w-5 h-5 ml-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 ml-2 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </p>
                </div>
                {lesson.video && (
                  <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden border border-gray-600 shadow-inner"> {/* 16:9 Aspect Ratio */}
                    <video
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      controls
                      src={lesson.video}
                      title={lesson.lesson_name}
                      preload="metadata" // Optimized for faster loading
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonList;