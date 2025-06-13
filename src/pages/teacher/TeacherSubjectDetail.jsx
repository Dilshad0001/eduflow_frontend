import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TeacherChapterList from "./TeacherChapterList";

function TeacherSubjectDetail() {
  const { subjectId } = useParams(); // subject id from URL
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/teacher/subject/?subjectId=${subjectId}`, {
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
  }, [subjectId, token]);

  if (loading) return <p>Loading subject detail...</p>;
  if (!subject) return <p>Subject not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 w-full -mt-10">
      <div className="max-w-70% mx-auto bg-white p-10 rounded-xl shadow space-y-6 ">
        <div>
          <p className="text-lg">Chapters of {subject.subject_name}</p>
        </div>

        {/* 👇 Add Chapter List */}
        <div>
          <TeacherChapterList subjectId={subject.id} />
        </div>
      </div>
    </div>
  );
}

export default TeacherSubjectDetail;
