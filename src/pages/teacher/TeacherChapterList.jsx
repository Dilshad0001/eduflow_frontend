// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function TeacherChapterList({ subjectId }) {
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // 👈 for navigation

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     console.log(subjectId);
    
//     const fetchChapters = async () => {
//       if (!subjectId) return;

//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(
//           `http://localhost:8000/teacher/chapter/?subjectId=${subjectId}`,
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
//         <li
//           key={chapter.id}
//           className="text-lg text-blue-600 hover:underline cursor-pointer"
//           onClick={() => navigate(`/teacher/chapter/${chapter.id}`)} // 👈 Navigate on click
//         >
//           {chapter.chapter_name}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default TeacherChapterList;



// =====================================================================





import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeacherChapterList({ subjectId }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    console.log(subjectId);
    
    const fetchChapters = async () => {
      if (!subjectId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8000/teacher/chapter/?subjectId=${subjectId}`,
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
      <div className="space-y-4">
        {/* Loading skeleton */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gradient-to-r from-black/80 to-gray-900/80 rounded-xl p-6 border border-gray-800/50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800/70 to-black/70 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-900/70 to-black/70 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center">
          <p className="text-gray-400 font-medium animate-pulse">Loading chapters...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-600/30 to-red-900/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-600/50">
          <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Chapters</h3>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-800/40 to-black/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-700/50">
          <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No Chapters Available</h3>
        <p className="text-gray-500">No chapters have been added to this subject yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          className="group relative bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/60 hover:border-purple-500/70 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
          onClick={() => navigate(`/teacher/chapter/${chapter.id}`)}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/15 via-blue-600/15 to-indigo-600/15 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          <div className="relative p-6 flex items-center space-x-4">
            {/* Chapter icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-600/40 transition-shadow duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            
            {/* Chapter content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-100 group-hover:text-purple-200 transition-colors duration-300 truncate">
                {chapter.chapter_name}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                Click to view lessons
              </p>
            </div>
            
            {/* Arrow icon */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 flex items-center justify-center text-gray-600 group-hover:text-purple-400 transform group-hover:translate-x-1 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Chapter number indicator */}
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full flex items-center justify-center border border-indigo-600/50">
              <span className="text-xs font-bold text-indigo-200">{index + 1}</span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Summary info */}
      <div className="mt-8 p-4 bg-gradient-to-r from-emerald-600/15 to-teal-600/15 rounded-xl border border-emerald-600/30">
        <div className="flex items-center justify-center space-x-2 text-emerald-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">
            {chapters.length} {chapters.length === 1 ? 'Chapter' : 'Chapters'} Available
          </span>
        </div>
      </div>
    </div>
  );
}

export default TeacherChapterList;