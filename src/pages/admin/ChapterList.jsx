import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChapterList({ subjectId }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 👈 for navigation

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchChapters = async () => {
      if (!subjectId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8000/adminuser/study/chapter/?subjectId=${subjectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChapters(response.data);
      } catch (err) {
        console.error("Error fetching chapters:", err);
        setError("Failed to load chapters");
        setChapters([]);
      }
      setLoading(false);
    };

    fetchChapters();
  }, [subjectId, token]);

  if (loading) return <p className="text-gray-600">Loading chapters...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (chapters.length === 0) return <p className="text-gray-500">No chapters found.</p>;

  return (
    <ul className="list-disc list-inside space-y-2">
      {chapters.map((chapter) => (
        <li
          key={chapter.id}
          className="text-lg text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate(`/chapter/${chapter.id}`)} // 👈 Navigate on click
        >
          {chapter.chapter_name}
        </li>
      ))}
    </ul>
  );
}

export default ChapterList;
