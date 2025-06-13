import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AdminCreateSubject() {
  const [subjectName, setSubjectName] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { courseId } = useParams();

  const token = localStorage.getItem("access_token");

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/adminuser/study/subject/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourseList(response.data);
      } catch (err) {
        setError("Failed to load courses. Please login as admin.");
      }
    };

    fetchCourses();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!subjectName.trim() || !courseList) {
      setError("Subject name and course are required.");
      return;
    }

    try {        
      await axios.post(
        "http://localhost:8000/adminuser/study/subject/",
        {
          subject_name: subjectName,
          course: courseList.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMsg("Subject created successfully!");
      setTimeout(() => {
        navigate(`/admin/course/${courseId}`);
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to create subject. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Subject</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">Subject Name</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Select Course</span>
            <h1>{courseList.course_name}</h1>
            {/* <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">-- Choose Course --</option>
              {courseList.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))}
            </select> */}
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Subject
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateSubject;
