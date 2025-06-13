import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminCreateCourse() {
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!courseName.trim()) {
      setError("Course name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/adminuser/study/course/",
        { course_name: courseName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMsg("Course created successfully!");
      setTimeout(() => {
        navigate("/admin/courses"); // redirect to course list
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Failed to create course. Make sure you are authorized.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Course</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Course Name</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateCourse;
