import { useEffect, useState } from 'react';
import { getCourses } from '../services/api';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(data => setCourses(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <ul className="space-y-2">
        {courses.map(course => (
          <li key={course.id} className="bg-gray-100 p-4 rounded shadow">
            {course.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
