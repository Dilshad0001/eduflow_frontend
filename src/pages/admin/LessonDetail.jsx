import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/adminuser/study/lesson/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLesson(response.data);
      } catch (err) {
        console.error("Error fetching lesson:", err);
        setLesson(null);
      }
      setLoading(false);
    };

    fetchLesson();
  }, [id, token]);

  if (loading) return <p>Loading lesson...</p>;
  if (!lesson) return <p>Lesson not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">{lesson.lesson_name}</h1>
        <p className="text-gray-600 mb-2">Chapter: {lesson.chapter}</p>
        <p className="text-gray-600 mb-4">Approved: {lesson.is_approved ? "Yes" : "No"}</p>
        {lesson.video && (
          <video
            src={lesson.video}
            controls
            className="mt-2 w-full max-w-md rounded"
          />
        )}
        <p className="mt-4 text-gray-700">{lesson.description}</p>
      </div>
    </div>
  );
}

export default LessonDetail;
