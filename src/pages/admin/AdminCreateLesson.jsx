
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminCreateLesson() {
  const location = useLocation();
  const navigate = useNavigate();
  const { chapterId } = useParams();

  const [lessonName, setLessonName] = useState("");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!chapterId) {
      setError("Chapter ID is missing. Please select a chapter first.");
    }
  }, [chapterId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

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
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      console.error("Failed to add lesson:", err);
      if (err.response?.status === 401) {
        setError("Session expired or unauthorized. Please log in again.");
        navigate("/login");
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Failed to add lesson. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 leading-tight">
          New Lesson Creation ✨
        </h2>

        {chapterId ? (
          <p className="text-gray-600 text-lg mb-6 text-center">
            Adding lesson to Chapter ID:{" "}
            <span className="font-semibold text-blue-600">{chapterId}</span>
          </p>
        ) : (
          <p className="text-red-500 text-lg mb-6 text-center font-medium">
            Error: Chapter ID is missing. Please go back and select a chapter.
          </p>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-300 text-red-800 px-5 py-4 rounded-lg mb-6 shadow-sm"
            role="alert"
          >
            <strong className="font-bold">Error:</strong> {error}
          </div>
        )}
        {success && (
          <div
            className="bg-green-100 border border-green-300 text-green-800 px-5 py-4 rounded-lg mb-6 shadow-sm"
            role="alert"
          >
            <strong className="font-bold">Success:</strong> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Lesson Name */}
          <div>
            <label
              htmlFor="lessonName"
              className="block mb-2 font-semibold text-gray-700 text-lg"
            >
              Lesson Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lessonName"
              type="text"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-sm"
              placeholder="e.g., 'Introduction to React'"
              required
              disabled={!chapterId || isSubmitting}
            />
          </div>

          {/* Video Upload */}
          <div>
            <label
              htmlFor="videoUpload"
              className="block mb-2 font-semibold text-gray-700 text-lg"
            >
              Upload Video (Optional)
            </label>
            <input
              id="videoUpload"
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:transition-colors file:duration-300 cursor-pointer"
              disabled={!chapterId || isSubmitting}
            />
            {video && (
              <p className="mt-3 text-sm text-gray-600">
                Selected file:{" "}
                <span className="font-medium text-blue-600">{video.name}</span>{" "}
                <button
                  type="button"
                  onClick={() => setVideo(null)}
                  className="ml-3 text-red-500 hover:text-red-600 hover:underline focus:outline-none focus:ring-2 focus:ring-red-400 rounded-md transition-colors duration-200"
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
              className={`w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-xl transition-all duration-300 ease-in-out shadow-lg transform ${
                !chapterId || isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-75"
              }`}
              disabled={!chapterId || isSubmitting}
            >
              {isSubmitting ? "Saving Lesson..." : "Save Lesson"}
            </button>
          </div>
        </form>

        {/* Back Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-7 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 border border-gray-300 shadow-sm"
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

export default AdminCreateLesson;