

import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

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
        const res = await axiosInstance.get("teacher/studentlist/", {
          // headers: { Authorization: `Bearer ${token}` },
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
      await axiosInstance.post("teacher/task/question/", formData, {
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