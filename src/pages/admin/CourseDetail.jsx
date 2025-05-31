import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SubjectList from "./SubjectList";  // Adjust path as necessary

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/adminuser/study/course/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course detail:", error);
        setCourse(null);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        {loading ? (
          <div>Loading course detail...</div>
        ) : course ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Course Detail</h1>
            <p className="text-lg">Course Name: {course.course_name}</p>
            <h2 className="text-xl font-semibold mt-6">Subjects</h2>
            <SubjectList courseId={id} />
          </>
        ) : (
          <p className="text-red-600">Course not found.</p>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
