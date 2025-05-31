// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function StudentChapterList({ subjectId }) {
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchChapters = async () => {
//       if (!subjectId) return;

//       setLoading(true);
//       setError(null);

//       try {
//         console.log("subjectid==",subjectId);
        
//         const response = await axios.get(
//           `http://localhost:8000/student/chapter/?subjectId=${subjectId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setChapters(response.data);
//       } catch (err) {
//         console.error("Error fetching chapters:", err);
//         setError("Failed to load chapters");
//         setChapters([]);
//       }
//       setLoading(false);
//     };

//     fetchChapters();
//   }, [subjectId, token]);

//   if (loading) return <p className="text-gray-600">Loading chapters...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;
//   if (chapters.length === 0) return <p className="text-gray-500">No chapters found.</p>;

//   return (
//     <ul className="list-disc list-inside space-y-2">
//       {chapters.map((chapter) => (
//         <li key={chapter.id}>
//           <Link
//             to={`/student/chapter/${chapter.id}`}
//             className="text-lg text-blue-600 hover:underline"
//           >
//             {chapter.chapter_name}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default StudentChapterList;


// =================================================================






import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StudentChapterList({ subjectId }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchChapters = async () => {
      if (!subjectId) return;

      setLoading(true);
      setError(null);

      try {
        console.log("subjectid==", subjectId);
        
        const response = await axios.get(
          `http://localhost:8000/student/chapter/?subjectId=${subjectId}`,
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <p className="ml-3 text-gray-600 dark:text-gray-300 font-medium">Loading chapters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-4 rounded-md">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No chapters found</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Chapters will appear here once they're added to this subject.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chapters</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {chapters.length} chapter{chapters.length !== 1 ? 's' : ''} available
          </p>
        </div>
        
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {chapters.map((chapter, index) => (
            <li key={chapter.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
              <Link
                to={`/student/chapter/${chapter.id}`}
                className="flex items-center px-6 py-4 group"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-150">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{index + 1}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                    {chapter.chapter_name}
                  </h4>
                </div>
                
                <div className="flex-shrink-0 ml-4">
                  <svg 
                    className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-150" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentChapterList;