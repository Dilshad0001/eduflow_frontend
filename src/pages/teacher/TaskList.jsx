// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';  // import useNavigate

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [keyword, setKeyword] = useState('');
//   const [error, setError] = useState('');
//   const token = localStorage.getItem('access_token');
//   const navigate = useNavigate();  // initialize navigate

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async (query = '') => {
//     try {
//       const res = await axios.get('http://localhost:8000/teacher/task/question', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: { task: query },  // send search query as param
//       });
//       setTasks(res.data);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch tasks');
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchTasks(keyword);
//   };

//   const handleAddTask = () => {
//     navigate('/teacher/task/add');  // redirect on button click
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-5xl mx-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">Assignment Tasks</h1>
//           <button
//             onClick={handleAddTask}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//           >
//             Add Task
//           </button>
//         </div>

//         <form onSubmit={handleSearch} className="mb-4 flex">
//           <input
//             type="text"
//             placeholder="Search by task name or student name"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="border rounded-l px-4 py-2 w-full"
//           />
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r">
//             Search
//           </button>
//         </form>

//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         <div className="bg-white rounded shadow p-4">
//           {tasks.length === 0 ? (
//             <p>No tasks found.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full table-auto">
//                 <thead className="bg-gray-200 text-gray-700 text-left">
//                   <tr>
//                     <th className="p-2">#</th>
//                     <th className="p-2">Task Name</th>
//                     <th className="p-2">Students</th>
//                     <th className="p-2">Description</th>
//                     <th className="p-2">Uploaded At</th>
//                     <th className="p-2">Deadline</th>
//                     <th className="p-2">File</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tasks.map((task, index) => (
//                     <tr key={task.id} className="border-t">
//                       <td className="p-2">{index + 1}</td>
//                       <td className="p-2 font-medium">{task.task_name}</td>
//                       <td className="p-2">
//                         <ul className="list-disc list-inside">
//                           {task.students.map((s, idx) => (
//                             <li key={idx}>{s.full_name}</li>
//                           ))}
//                         </ul>
//                       </td>
//                       <td className="p-2">{task.description}</td>
//                       <td className="p-2">{task.uploaded_at}</td>
//                       <td className="p-2">{new Date(task.submission_deadline).toLocaleString()}</td>
//                       <td className="p-2">
//                         {task.task_file ? (
//                           <a
//                             href={task.task_file}
//                             className="text-blue-600 underline"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             Download
//                           </a>
//                         ) : (
//                           'No file'
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskList;



// ================================================================



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [keyword, setKeyword] = useState('');
//   const [error, setError] = useState('');
//   const token = localStorage.getItem('access_token');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async (query = '') => {
//     try {
//       const res = await axios.get('http://localhost:8000/teacher/task/question', {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { task: query },
//       });
//       setTasks(res.data);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch tasks');
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchTasks(keyword);
//   };

//   const handleAddTask = () => {
//     navigate('/teacher/task/add');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//           <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight drop-shadow-sm">
//             Assignment Tasks
//           </h1>
//           <button
//             onClick={handleAddTask}
//             className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//             Add Task
//           </button>
//         </div>

//         {/* Search Form */}
//         <form onSubmit={handleSearch} className="flex max-w-xl mx-auto mb-8 shadow-sm rounded-lg overflow-hidden">
//           <input
//             type="text"
//             placeholder="Search by task or student name"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="flex-grow px-5 py-3 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-l-lg"
//           />
//           <button
//             type="submit"
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-semibold rounded-r-lg transition"
//           >
//             Search
//           </button>
//         </form>

//         {/* Error Message */}
//         {error && (
//           <p className="text-center text-red-600 font-medium mb-6 animate-pulse">{error}</p>
//         )}

//         {/* Tasks Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {tasks.length === 0 ? (
//             <p className="text-center text-gray-600 py-16 text-lg font-medium">
//               No tasks found.
//             </p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full table-auto border-collapse text-gray-800">
//                 <thead className="bg-indigo-100 text-indigo-700 font-semibold uppercase text-sm tracking-wide">
//                   <tr>
//                     <th className="p-4 border-b border-indigo-200 text-center">#</th>
//                     <th className="p-4 border-b border-indigo-200 text-left">Task Name</th>
//                     <th className="p-4 border-b border-indigo-200 text-left">Students</th>
//                     <th className="p-4 border-b border-indigo-200 text-left">Description</th>
//                     <th className="p-4 border-b border-indigo-200 text-center">Uploaded At</th>
//                     <th className="p-4 border-b border-indigo-200 text-center">Deadline</th>
//                     <th className="p-4 border-b border-indigo-200 text-center">File</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tasks.map((task, index) => (
//                     <tr
//                       key={task.id}
//                       className="border-b hover:bg-indigo-50 transition-colors cursor-pointer"
//                       title="Click to view details"
//                       onClick={() => navigate(`/teacher/task/${task.id}`)}
//                     >
//                       <td className="p-4 text-center">{index + 1}</td>
//                       <td className="p-4 font-semibold">{task.task_name}</td>
//                       <td className="p-4">
//                         <ul className="list-disc list-inside max-h-24 overflow-auto text-sm text-gray-700">
//                           {task.students.map((s, idx) => (
//                             <li key={idx} className="truncate max-w-xs" title={s.full_name}>
//                               {s.full_name}
//                             </li>
//                           ))}
//                         </ul>
//                       </td>
//                       <td className="p-4 text-gray-700 text-sm max-w-sm truncate" title={task.description}>
//                         {task.description || '—'}
//                       </td>
//                       <td className="p-4 text-center text-sm text-gray-600 whitespace-nowrap">
//                         {new Date(task.uploaded_at).toLocaleDateString()}
//                       </td>
//                       <td className="p-4 text-center text-sm text-red-600 font-medium whitespace-nowrap">
//                         {new Date(task.submission_deadline).toLocaleString()}
//                       </td>
//                       <td className="p-4 text-center">
//                         {task.task_file ? (
//                           <a
//                             href={task.task_file}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
//                             onClick={(e) => e.stopPropagation()} // Prevent row click
//                           >
//                             Download
//                           </a>
//                         ) : (
//                           <span className="text-gray-400 italic">No file</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskList;




// ========================================================




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  const getStatusColor = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(diff / (1000 * 3600 * 24));

    if (daysLeft < 0) return 'text-red-500';
    if (daysLeft <= 3) return 'text-yellow-500';
    return 'text-green-500';
  };

  if (loading && tasks.length === 0)
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <p className="text-indigo-400 text-2xl font-semibold animate-pulse">
          Loading tasks...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h1 className="text-4xl font-extrabold text-indigo-400 tracking-tight drop-shadow-md">
            Assignment Tasks
          </h1>
          <button
            onClick={handleAddTask}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex max-w-xl mx-auto mb-8 shadow-sm rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search by task or student name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-grow px-5 py-3 border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-l-lg"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-semibold rounded-r-lg transition duration-300"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClearSearch}
            className="ml-2 bg-gray-700 hover:bg-gray-600 text-white px-3 rounded"
          >
            Clear
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 font-medium mb-6 animate-pulse">{error}</p>
        )}

        {/* Tasks Table */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 py-16 text-lg font-medium">
              No tasks found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse text-gray-200">
                <thead className="bg-gray-700 text-indigo-300 font-semibold uppercase text-sm tracking-wide">
                  <tr>
                    <th className="p-4 border-b border-gray-600 text-center">#</th>
                    <th className="p-4 border-b border-gray-600 text-left">Task Name</th>
                    <th className="p-4 border-b border-gray-600 text-left">Students</th>
                    <th className="p-4 border-b border-gray-600 text-left">Description</th>
                    <th className="p-4 border-b border-gray-600 text-center">Uploaded At</th>
                    <th className="p-4 border-b border-gray-600 text-center">Deadline</th>
                    <th className="p-4 border-b border-gray-600 text-center">File</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr
                      key={task.id}
                      className="border-b hover:bg-gray-700 transition-colors cursor-pointer"
                      title="Click to view details"
                      onClick={() => navigate(`/teacher/task/${task.id}`)}
                    >
                      <td className="p-4 text-center">{index + 1}</td>
                      <td className="p-4 font-semibold">{task.task_name}</td>
                      <td className="p-4">
                        <ul className="list-disc list-inside max-h-24 overflow-auto text-sm text-gray-500">
                          {task.students.map((s, idx) => (
                            <li key={idx} className="truncate max-w-xs" title={s.full_name}>
                              {s.full_name}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-4 text-gray-500 text-sm max-w-sm truncate" title={task.description}>
                        {task.description || '—'}
                      </td>
                      <td className="p-4 text-center text-sm text-gray-500 whitespace-nowrap">
                        {new Date(task.uploaded_at).toLocaleDateString()}
                      </td>
                      <td className={`p-4 text-center text-sm font-medium whitespace-nowrap ${getStatusColor(task.submission_deadline)}`}>
                        {new Date(task.submission_deadline).toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        {task.task_file ? (
                          <a
                            href={task.task_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 font-semibold underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Download
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">No file</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;