import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ChapterList from "./ChapterList"; // 👈 Import the ChapterList component

function SubjectDetail() {
  const { id } = useParams(); // subject id from URL
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/adminuser/study/subject/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubject(response.data);
      } catch (error) {
        console.error("Error fetching subject:", error);
        setSubject(null);
      }
      setLoading(false);
    };

    fetchSubject();
  }, [id, token]);

  if (loading) return <p>Loading subject detail...</p>;
  if (!subject) return <p>Subject not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-90% mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Subject Detail</h1>
          <p className="text-lg">Subject Name: {subject.subject_name}</p>
          <p className="text-gray-600">Course: {subject.course}</p>
        </div>

        {/* 👇 Add Chapter List */}
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">Chapters</h2>
          <ChapterList subjectId={subject.id} />
        </div>
      </div>
    </div>
  );
}

export default SubjectDetail;
