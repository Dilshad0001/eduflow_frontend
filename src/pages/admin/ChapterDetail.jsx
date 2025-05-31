import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LessonList from "./LessonList"; // ✅ import the component

function ChapterDetail() {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/adminuser/study/chapter/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChapter(response.data);
      } catch (err) {
        console.error("Error fetching chapter:", err);
        setChapter(null);
      }
      setLoading(false);
    };

    fetchChapter();
  }, [id, token]);

  if (loading) return <p>Loading chapter...</p>;
  if (!chapter) return <p>Chapter not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 space-y-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Chapter Detail</h1>
        <p className="text-lg">Chapter Name: {chapter.chapter_name}</p>
        <p className="text-gray-600">Subject: {chapter.subject}</p>
      </div>

      {/* ✅ LessonList Component with chapterId */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Lessons in this Chapter</h2>
        <LessonList chapterId={id} />
      </div>
    </div>
  );
}

export default ChapterDetail;
