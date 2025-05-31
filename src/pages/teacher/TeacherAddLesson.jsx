// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function TeacherAddLesson() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const chapterId = location.state?.chapterId;

//   const [lessonName, setLessonName] = useState("");
//   const [video, setVideo] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const token = localStorage.getItem("access_token");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!lessonName || !chapterId) {
//       setError("Lesson name and chapter are required.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("lesson_name", lessonName);
//     formData.append("chapter", chapterId);
//     if (video) {
//       formData.append("video", video);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/teacher/task/lesson/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setSuccess("Lesson added successfully.");
//       setLessonName("");
//       setVideo(null);
//       setTimeout(() => navigate(-1), 1500); // ⬅️ go back to previous page
//     } catch (err) {
//       console.error(err);
//       setError("Failed to add lesson.");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//       <h2 className="text-2xl font-bold mb-4">➕ Add New Lesson</h2>
//       <p className="text-gray-600 mb-4">Chapter ID: {chapterId}</p>

//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {success && <p className="text-green-600 mb-2">{success}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold mb-1 text-gray-700">
//             Lesson Name
//           </label>
//           <input
//             type="text"
//             value={lessonName}
//             onChange={(e) => setLessonName(e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
//             placeholder="Enter lesson name"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1 text-gray-700">
//             Upload Video (optional)
//           </label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setVideo(e.target.files[0])}
//             className="w-full"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//         >
//           Save Lesson
//         </button>
//       </form>
//     </div>
//   );
// }

// export default TeacherAddLesson;


// ===============================================



import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";

function TeacherAddLesson() {
  const location = useLocation();
  const navigate = useNavigate();
  const chapterId = location.state?.chapterId;

  const [lessonName, setLessonName] = useState("");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Added submission state

  const token = localStorage.getItem("access_token");

  // Redirect if chapterId is missing
  useEffect(() => {
    if (!chapterId) {
      setError("Chapter ID is missing. Please select a chapter first.");
      // Optionally navigate back or to a chapter selection page
      // navigate('/teacher/chapters');
    }
  }, [chapterId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true); // Set submitting state

    if (!lessonName || !chapterId) {
      setError("Lesson name and chapter are required.");
      setIsSubmitting(false);
      return;
    }

    if (!token) {
      setError("Unauthorized. Please log in.");
      navigate("/login");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("lesson_name", lessonName);
    formData.append("chapter", chapterId);
    if (video) {
      formData.append("video", video);
    }

    try {
      await axios.post(
        "http://localhost:8000/teacher/task/lesson/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("Lesson added successfully!");
      setLessonName("");
      setVideo(null);
      // Give user time to see success message before navigating
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      console.error("Failed to add lesson:", err);
      if (err.response?.status === 401) {
        setError("Session expired or unauthorized. Please log in again.");
        navigate("/login");
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail); // Use specific error from backend
      } else {
        setError("Failed to add lesson. Please try again.");
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-400 leading-tight">
          ➕ Add New Lesson
        </h2>

        {chapterId ? (
          <p className="text-gray-400 text-lg mb-6 text-center">
            Adding lesson to Chapter ID: <span className="font-semibold text-indigo-300">{chapterId}</span>
          </p>
        ) : (
          <p className="text-red-400 text-lg mb-6 text-center font-medium">
            Error: Chapter ID is missing. Please go back and select a chapter.
          </p>
        )}

        {error && (
          <div
            className="bg-red-900 border border-red-700 text-red-300 px-5 py-4 rounded-lg mb-6 shadow-md"
            role="alert"
          >
            <strong className="font-bold">Error:</strong> {error}
          </div>
        )}
        {success && (
          <div
            className="bg-green-900 border border-green-700 text-green-300 px-5 py-4 rounded-lg mb-6 shadow-md"
            role="alert"
          >
            <strong className="font-bold">Success:</strong> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lesson Name */}
          <div>
            <label htmlFor="lessonName" className="block mb-2 font-semibold text-gray-300 text-lg">
              Lesson Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lessonName"
              type="text"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-5 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 ease-in-out"
              placeholder="e.g., 'Introduction to React'"
              required
              disabled={!chapterId || isSubmitting} // Disable if no chapterId or submitting
            />
          </div>

          {/* Video Upload */}
          <div>
            <label htmlFor="videoUpload" className="block mb-2 font-semibold text-gray-300 text-lg">
              Upload Video (Optional)
            </label>
            <input
              id="videoUpload"
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:transition-colors file:duration-300 cursor-pointer"
              disabled={!chapterId || isSubmitting} // Disable if no chapterId or submitting
            />
            {video && (
              <p className="mt-3 text-sm text-gray-400">
                Selected file:{" "}
                <span className="font-medium text-indigo-300">{video.name}</span>{" "}
                <button
                  type="button"
                  onClick={() => setVideo(null)}
                  className="ml-3 text-red-400 hover:text-red-300 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  Remove
                </button>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className={`w-full sm:w-auto px-8 py-4 rounded-lg font-bold text-xl transition-all duration-300 ease-in-out shadow-xl transform ${
                !chapterId || isSubmitting
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800 text-white hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-75"
              }`}
              disabled={!chapterId || isSubmitting}
            >
              {isSubmitting ? "Saving Lesson..." : "Save Lesson"}
            </button>
          </div>
        </form>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 bg-gray-700 text-indigo-300 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherAddLesson;