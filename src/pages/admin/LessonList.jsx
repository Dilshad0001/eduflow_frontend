import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LessonList({ chapterId }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate(); // ✅ navigation hook

  useEffect(() => {
    const fetchLessons = async () => {
      if (!chapterId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8000/adminuser/study/lesson/?chapterId=${chapterId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLessons(response.data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
        setError("Failed to load lessons");
        setLessons([]);
      }

      setLoading(false);
    };

    fetchLessons();
  }, [chapterId]);

  if (loading) return <p className="text-gray-600">Loading lessons...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (lessons.length === 0) return <p className="text-gray-500">No lessons found.</p>;

  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="border p-4 rounded-lg bg-white shadow cursor-pointer hover:bg-gray-100 transition"
          onClick={() => navigate(`/lesson/${lesson.id}`)} // ✅ navigate on click
        >
          <h2 className="text-xl font-semibold text-gray-800">{lesson.lesson_name}</h2>
          <p className="text-sm text-gray-600">Chapter: {lesson.chapter}</p>
          <p className="text-sm text-gray-600">Approved: {lesson.is_approved ? "Yes" : "No"}</p>
          {lesson.video && (
            <video
              src={lesson.video}
              controls
              className="mt-2 w-full max-w-md rounded"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default LessonList;
