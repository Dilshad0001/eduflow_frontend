// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function CreateTask() {
//   const [taskName, setTaskName] = useState("");
//   const [description, setDescription] = useState("");
//   const [submissionDeadline, setSubmissionDeadline] = useState("");
//   const [taskFile, setTaskFile] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [blockedStudents, setBlockedStudents] = useState([]);
//   const [allStudents, setAllStudents] = useState([]);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("access_token");

//   // Fetch all students to populate selects
//   useEffect(() => {
//     async function fetchStudents() {
//       try {
//         const res = await axios.get("http://localhost:8000/teacher/studentlist/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAllStudents(res.data);
//       } catch (err) {
//         setError("Failed to fetch students");
//       }
//     }
//     fetchStudents();
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!taskName || !submissionDeadline) {
//       setError("Please fill all required fields");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("task_name", taskName);
//     formData.append("description", description);
//     formData.append("submission_deadline", submissionDeadline);
//     if (taskFile) formData.append("task_file", taskFile);
//     students.forEach((id) => formData.append("students", id));
//     blockedStudents.forEach((id) => formData.append("blocked_students", id));

//     try {
//       await axios.post("http://localhost:8000/teacher/task/question/", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Task created successfully");
//       // Reset form if needed
//       setTaskName("");
//       setDescription("");
//       setSubmissionDeadline("");
//       setTaskFile(null);
//       setStudents([]);
//       setBlockedStudents([]);
//     } catch (err) {
//       setError("Failed to create task");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">Create New Assignment Task</h2>
//       {error && <p className="text-red-600 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-semibold">Task Name *</label>
//           <input
//             type="text"
//             value={taskName}
//             onChange={(e) => setTaskName(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//             rows="4"
//           ></textarea>
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Submission Deadline *</label>
//           <input
//             type="datetime-local"
//             value={submissionDeadline}
//             onChange={(e) => setSubmissionDeadline(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Task File (optional)</label>
//           <input
//             type="file"
//             onChange={(e) => setTaskFile(e.target.files[0])}
//             className="w-full"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Assign Students</label>
//           <select
//             multiple
//             value={students}
//             onChange={(e) =>
//               setStudents(
//                 Array.from(e.target.selectedOptions, (option) => option.value)
//               )
//             }
//             className="w-full border rounded px-3 py-2"
//           >
//             {allStudents.map((student) => (
//               <option key={student.id} value={student.id}>
//                 {student.full_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Blocked Students</label>
//           <select
//             multiple
//             value={blockedStudents}
//             onChange={(e) =>
//               setBlockedStudents(
//                 Array.from(e.target.selectedOptions, (option) => option.value)
//               )
//             }
//             className="w-full border rounded px-3 py-2"
//           >
//             {allStudents.map((student) => (
//               <option key={student.id} value={student.id}>
//                 {student.full_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Create Task
//         </button>
//       </form>
//     </div>
//   );
// }



// =======================================================================









// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function CreateTask() {
//   const [taskName, setTaskName] = useState("");
//   const [description, setDescription] = useState("");
//   const [submissionDeadline, setSubmissionDeadline] = useState("");
//   const [taskFile, setTaskFile] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [blockedStudents, setBlockedStudents] = useState([]);
//   const [allStudents, setAllStudents] = useState([]);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     async function fetchStudents() {
//       try {
//         const res = await axios.get("http://localhost:8000/teacher/studentlist/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAllStudents(res.data);
//       } catch (err) {
//         setError("Failed to fetch students");
//       }
//     }
//     fetchStudents();
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!taskName || !submissionDeadline) {
//       setError("Please fill all required fields");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("task_name", taskName);
//     formData.append("description", description);
//     formData.append("submission_deadline", submissionDeadline);
//     if (taskFile) formData.append("task_file", taskFile);
//     students.forEach((id) => formData.append("students", id));
//     blockedStudents.forEach((id) => formData.append("blocked_students", id));

//     try {
//       await axios.post("http://localhost:8000/teacher/task/question/", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Task created successfully");
//       setTaskName("");
//       setDescription("");
//       setSubmissionDeadline("");
//       setTaskFile(null);
//       setStudents([]);
//       setBlockedStudents([]);
//       setError("");
//     } catch (err) {
//       setError("Failed to create task");
//     }
//   };

//   // Helper to render selected students as tags
//   const renderSelectedStudents = (selectedIds, clearFn) => {
//     return (
//       <div className="flex flex-wrap gap-2 mt-2">
//         {selectedIds.length === 0 && <p className="text-gray-400">No students selected</p>}
//         {selectedIds.map((id) => {
//           const student = allStudents.find((s) => s.id === id);
//           if (!student) return null;
//           return (
//             <span
//               key={id}
//               className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
//             >
//               {student.full_name}
//               <button
//                 type="button"
//                 onClick={() => clearFn(id)}
//                 className="ml-1 hover:text-red-500 font-bold focus:outline-none"
//                 aria-label={`Remove ${student.full_name}`}
//               >
//                 &times;
//               </button>
//             </span>
//           );
//         })}
//       </div>
//     );
//   };

//   // Remove student from selected list
//   const removeStudent = (id, listSetter) => {
//     listSetter((prev) => prev.filter((sid) => sid !== id));
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700">
//         Create New Assignment Task
//       </h2>
//       {error && (
//         <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//           {error}
//         </p>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Task Name */}
//         <div>
//           <label htmlFor="taskName" className="block mb-2 font-semibold text-gray-700">
//             Task Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             id="taskName"
//             type="text"
//             placeholder="Enter the task name"
//             value={taskName}
//             onChange={(e) => setTaskName(e.target.value)}
//             className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="description" className="block mb-2 font-semibold text-gray-700">
//             Description
//           </label>
//           <textarea
//             id="description"
//             placeholder="Write a detailed description (optional)"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             rows="5"
//           />
//         </div>

//         {/* Submission Deadline */}
//         <div>
//           <label htmlFor="deadline" className="block mb-2 font-semibold text-gray-700">
//             Submission Deadline <span className="text-red-500">*</span>
//           </label>
//           <input
//             id="deadline"
//             type="datetime-local"
//             value={submissionDeadline}
//             onChange={(e) => setSubmissionDeadline(e.target.value)}
//             className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             required
//           />
//         </div>

//         {/* Task File */}
//         <div>
//           <label htmlFor="taskFile" className="block mb-2 font-semibold text-gray-700">
//             Task File (optional)
//           </label>
//           <input
//             id="taskFile"
//             type="file"
//             onChange={(e) => setTaskFile(e.target.files[0])}
//             className="w-full text-gray-700"
//             accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
//           />
//           {taskFile && (
//             <p className="mt-2 text-sm text-gray-600">
//               Selected file:{" "}
//               <span className="font-medium text-blue-700">{taskFile.name}</span>{" "}
//               <button
//                 type="button"
//                 onClick={() => setTaskFile(null)}
//                 className="ml-2 text-red-500 hover:underline focus:outline-none"
//               >
//                 Remove
//               </button>
//             </p>
//           )}
//         </div>

//         {/* Assign Students */}
//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">Assign Students</label>
//           <select
//             multiple
//             value={students}
//             onChange={(e) =>
//               setStudents(Array.from(e.target.selectedOptions, (option) => option.value))
//             }
//             className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             size={Math.min(6, allStudents.length || 6)}
//           >
//             {allStudents.map((student) => (
//               <option key={student.id} value={student.id}>
//                 {student.full_name}
//               </option>
//             ))}
//           </select>
//           {renderSelectedStudents(students, (id) => removeStudent(id, setStudents))}
//           {students.length > 0 && (
//             <button
//               type="button"
//               onClick={() => setStudents([])}
//               className="mt-2 text-sm text-red-500 hover:underline focus:outline-none"
//             >
//               Clear All Assigned Students
//             </button>
//           )}
//         </div>

//         {/* Blocked Students */}
//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">Blocked Students</label>
//           <select
//             multiple
//             value={blockedStudents}
//             onChange={(e) =>
//               setBlockedStudents(Array.from(e.target.selectedOptions, (option) => option.value))
//             }
//             className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             size={Math.min(6, allStudents.length || 6)}
//           >
//             {allStudents.map((student) => (
//               <option key={student.id} value={student.id}>
//                 {student.full_name}
//               </option>
//             ))}
//           </select>
//           {renderSelectedStudents(blockedStudents, (id) => removeStudent(id, setBlockedStudents))}
//           {blockedStudents.length > 0 && (
//             <button
//               type="button"
//               onClick={() => setBlockedStudents([])}
//               className="mt-2 text-sm text-red-500 hover:underline focus:outline-none"
//             >
//               Clear All Blocked Students
//             </button>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg focus:outline-none"
//           >
//             Create Task
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


// =============================================================



import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  const [taskFile, setTaskFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [blockedStudents, setBlockedStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await axios.get("http://localhost:8000/teacher/studentlist/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllStudents(res.data);
      } catch (err) {
        setError("Failed to fetch students. Please try again.");
      }
    }
    fetchStudents();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!taskName || !submissionDeadline) {
      setError("Please fill all required fields (Task Name and Submission Deadline).");
      return;
    }

    const formData = new FormData();
    formData.append("task_name", taskName);
    formData.append("description", description);
    formData.append("submission_deadline", submissionDeadline);
    if (taskFile) formData.append("task_file", taskFile);
    students.forEach((id) => formData.append("students", id));
    blockedStudents.forEach((id) => formData.append("blocked_students", id));

    try {
      await axios.post("http://localhost:8000/teacher/task/question/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Task created successfully!");
      setTaskName("");
      setDescription("");
      setSubmissionDeadline("");
      setTaskFile(null);
      setStudents([]);
      setBlockedStudents([]);
    } catch (err) {
      setError("Failed to create task. Please check your input and try again.");
    }
  };

  // Helper to render selected students as tags
  const renderSelectedStudents = (selectedIds, clearFn) => {
    if (selectedIds.length === 0) {
      return <p className="text-gray-500 text-sm italic mt-2">No students selected.</p>;
    }
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {selectedIds.map((id) => {
          const student = allStudents.find((s) => s.id === id);
          if (!student) return null;
          return (
            <span
              key={id}
              className="flex items-center bg-indigo-700 text-indigo-100 text-sm px-3 py-1 rounded-full shadow-md group"
            >
              {student.full_name}
              <button
                type="button"
                onClick={() => clearFn(id)}
                className="ml-2 text-indigo-300 hover:text-red-300 transition-colors duration-200 font-bold focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                aria-label={`Remove ${student.full_name}`}
              >
                &times;
              </button>
            </span>
          );
        })}
      </div>
    );
  };

  // Remove student from selected list
  const removeStudent = (id, listSetter) => {
    listSetter((prev) => prev.filter((sid) => sid !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-indigo-400 leading-tight">
          Create New Assignment Task
        </h2>
        {error && (
          <div
            className="bg-red-900 border border-red-700 text-red-300 px-5 py-4 rounded-lg mb-6 shadow-md"
            role="alert"
          >
            <strong className="font-bold">Error:</strong> {error}
          </div>
        )}
        {successMessage && (
          <div
            className="bg-green-900 border border-green-700 text-green-300 px-5 py-4 rounded-lg mb-6 shadow-md"
            role="alert"
          >
            <strong className="font-bold">Success:</strong> {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Task Name */}
          <div>
            <label htmlFor="taskName" className="block mb-2 font-semibold text-gray-300 text-lg">
              Task Name <span className="text-red-500">*</span>
            </label>
            <input
              id="taskName"
              type="text"
              placeholder="e.g., 'React Hooks Fundamentals'"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-5 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-2 font-semibold text-gray-300 text-lg">
              Description (Optional)
            </label>
            <textarea
              id="description"
              placeholder="Provide a detailed description of the task requirements and objectives."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-5 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
              rows="6"
            />
          </div>

          {/* Submission Deadline */}
          <div>
            <label htmlFor="deadline" className="block mb-2 font-semibold text-gray-300 text-lg">
              Submission Deadline <span className="text-red-500">*</span>
            </label>
            <input
              id="deadline"
              type="datetime-local"
              value={submissionDeadline}
              onChange={(e) => setSubmissionDeadline(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-5 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
              required
            />
          </div>

          {/* Task File */}
          <div>
            <label htmlFor="taskFile" className="block mb-2 font-semibold text-gray-300 text-lg">
              Attach Task File (Optional)
            </label>
            <input
              id="taskFile"
              type="file"
              onChange={(e) => setTaskFile(e.target.files[0])}
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:transition-colors file:duration-300 cursor-pointer"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
            />
            {taskFile && (
              <p className="mt-3 text-sm text-gray-400">
                Selected file:{" "}
                <span className="font-medium text-indigo-300">{taskFile.name}</span>{" "}
                <button
                  type="button"
                  onClick={() => setTaskFile(null)}
                  className="ml-3 text-red-400 hover:text-red-300 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md transition-colors duration-200"
                >
                  Remove
                </button>
              </p>
            )}
          </div>

          {/* Assign Students */}
          <div>
            <label htmlFor="assignStudents" className="block mb-2 font-semibold text-gray-300 text-lg">
              Assign Students
            </label>
            <select
              id="assignStudents"
              multiple
              value={students}
              onChange={(e) =>
                setStudents(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-5 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out custom-scroll"
              size={Math.min(8, allStudents.length || 8)}
            >
              {allStudents.length === 0 && <option disabled>No students available</option>}
              {allStudents.map((student) => (
                <option key={student.id} value={student.id} className="py-2">
                  {student.full_name}
                </option>
              ))}
            </select>
            {renderSelectedStudents(students, (id) => removeStudent(id, setStudents))}
            {students.length > 0 && (
              <button
                type="button"
                onClick={() => setStudents([])}
                className="mt-3 text-sm text-red-400 hover:text-red-300 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md transition-colors duration-200"
              >
                Clear All Assigned Students
              </button>
            )}
          </div>

          {/* Blocked Students */}
          <div>
            <label htmlFor="blockedStudents" className="block mb-2 font-semibold text-gray-300 text-lg">
              Block Students (Optional)
            </label>
            <select
              id="blockedStudents"
              multiple
              value={blockedStudents}
              onChange={(e) =>
                setBlockedStudents(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-5 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out custom-scroll"
              size={Math.min(8, allStudents.length || 8)}
            >
              {allStudents.length === 0 && <option disabled>No students available</option>}
              {allStudents.map((student) => (
                <option key={student.id} value={student.id} className="py-2">
                  {student.full_name}
                </option>
              ))}
            </select>
            {renderSelectedStudents(blockedStudents, (id) => removeStudent(id, setBlockedStudents))}
            {blockedStudents.length > 0 && (
              <button
                type="button"
                onClick={() => setBlockedStudents([])}
                className="mt-3 text-sm text-red-400 hover:text-red-300 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md transition-colors duration-200"
              >
                Clear All Blocked Students
              </button>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-xl hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 ease-in-out shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-75"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}