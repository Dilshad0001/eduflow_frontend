// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import ChapterList from "../admin/ChapterList";
// import StudentChapterList from "./StudentChapterList";
// // import ChapterList from "./ChapterList"; // 👈 Import the ChapterList component

// function StudentSubjectDetail() {
// //   const { subjectId } = useParams(); // subject id from URL
//   const [subject, setSubject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("access_token");
//   const subjectId=2

//   useEffect(() => {
//     const fetchSubject = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/student/subject/?subjectId=${subjectId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log(response.data);
        
//         setSubject(response.data);
//       } catch (error) {
//         console.error("Error fetching subject:", error);
//         setSubject(null);
//       }
//       setLoading(false);
//     };

//     fetchSubject();
//   }, [subjectId, token]);

//   if (loading) return <p>Loading subject detail...</p>;
//   if (!subject) return <p>Subject not found.</p>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold mb-2">Subject Detail</h1>
//           <p className="text-lg">Subject Name: {subject.subject_name}</p>
//           <p className="text-gray-600">Course: {subject.course}</p>
//         </div>

//         {/* 👇 Add Chapter List */}
//         <div>
//           <h2 className="text-xl font-semibold mt-6 mb-2">Chapters</h2>
//           <StudentChapterList subjectId={subject.id} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudentSubjectDetail;


// ===========================================================





import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ChapterList from "../admin/ChapterList";
import StudentChapterList from "./StudentChapterList";

function StudentSubjectDetail() {
  const { subjectId } = useParams(); // subject id from URL
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");
  // const subjectId = 2;

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/student/subject/?subjectId=${subjectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setSubject(response.data);
      } catch (error) {
        console.error("Error fetching subject:", error);
        setSubject(null);
      }
      setLoading(false);
    };

    fetchSubject();
  }, [subjectId, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400 mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400 dark:border-t-blue-300 mx-auto"></div>
          </div>
          <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 animate-pulse">
            Loading subject details...
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Subject Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The requested subject could not be loaded. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-500/20 dark:to-indigo-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Dashboard
                </a>
              </li>
              <li className="text-slate-400 dark:text-slate-500">/</li>
              <li>
                <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Subjects
                </a>
              </li>
              <li className="text-slate-400 dark:text-slate-500">/</li>
              <li className="text-slate-800 dark:text-slate-200 font-medium">{subject.subject_name}</li>
            </ol>
          </nav>

          {/* Subject Header Card */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50 mb-8 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    {subject.subject_name}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-1-8h1m-1 4h1" />
                      </svg>
                      {subject.course}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      Subject ID: {subjectId}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-all duration-200 group">
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-all duration-200 group">
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden">
          {/* Section Header */}
          <div className="px-8 py-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Course Chapters
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Explore all chapters and lessons in this subject
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-all duration-200">
                  Filter
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  View Progress
                </button>
              </div>
            </div>
          </div>

          {/* Chapters Content */}
          <div className="p-8">
            <StudentChapterList subjectId={subjectId} />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group">
          <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default StudentSubjectDetail;