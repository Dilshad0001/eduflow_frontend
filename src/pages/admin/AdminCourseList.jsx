import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminCourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access_token"); // token stored here

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/adminuser/study/course/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Courses List</h1>

        {loading ? (
          <div className="text-center py-10">Loading courses...</div>
        ) : (
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Course Name</th>
              </tr>
            </thead>
<tbody>
  {courses.length === 0 ? (
    <tr>
      <td colSpan="2" className="text-center py-4 text-gray-500">
        No courses found
      </td>
    </tr>
  ) : (
    courses.map((course, index) => (
      <tr key={course.id} className="border-t">
        <td className="py-2 px-4">{index + 1}</td>
        <td className="py-2 px-4 text-blue-600 hover:underline">
          <Link to={`/course/${course.id}`}>{course.course_name}</Link>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>
        )}
      </div>
    </div>
  );
}

export default AdminCourseList;


