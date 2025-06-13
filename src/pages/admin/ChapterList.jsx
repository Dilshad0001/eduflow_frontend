// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function ChapterList({ subjectId }) {
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // 👈 for navigation

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchChapters = async () => {
//       if (!subjectId) return;

//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(
//           `http://localhost:8000/adminuser/study/chapter/?subjectId=${subjectId}`,
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
//           onClick={() => navigate(`/chapter/${chapter.id}`)} // 👈 Navigate on click
//         >
//           {chapter.chapter_name}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default ChapterList;


// ================================================











// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { BookOpen, Users, Clock, ChevronRight, AlertCircle, FileText, Play } from "lucide-react";

// function ChapterList({ subjectId }) {
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("access_token");
//   // const role= 


//   useEffect(() => {
//     console.log(subjectId);
    
//     const fetchChapters = async () => {
//       if (!subjectId) return;

//       setLoading(true);
//       setError(null);

//       try {
//         console.log("user=",token.user);
        
//         const response = await axios.get(
//           `http://localhost:8000/adminuser/study/chapter/?subjectId=${subjectId}`,
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


//   return (
//     <div className="w-full">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
//           <div className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">Total Chapters</p>
//                 <p className="text-2xl font-bold text-gray-900">{chapters.length}</p>
//               </div>
//               <div className="p-3 bg-gray-100 rounded-lg">
//                 <FileText className="w-6 h-6 text-gray-700" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
//           <div className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">Total Lessons</p>
//                 <p className="text-2xl font-bold text-gray-900">{chapters.length * 5}</p>
//               </div>
//               <div className="p-3 bg-gray-100 rounded-lg">
//                 <Play className="w-6 h-6 text-gray-700" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
//           <div className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 mb-1">Completion</p>
//                 <p className="text-2xl font-bold text-gray-900">78%</p>
//               </div>
//               <div className="p-3 bg-gray-100 rounded-lg">
//                 <Clock className="w-6 h-6 text-gray-700" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Card */}
//       <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
//         <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-lg">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <h2 className="text-xl font-semibold text-gray-900">Chapter Dashboard</h2>
//             </div>
//             <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
//               {chapters.length} {chapters.length === 1 ? 'Chapter' : 'Chapters'}
//             </div>
//           </div>
//         </div>

//         <div className="p-0">
//           {chapters.length === 0 ? (
//             <div className="p-12 text-center text-gray-600">
//               <svg className="mx-auto mb-4 w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <h3 className="text-xl font-medium mb-2">No chapters found</h3>
//               <p>No chapters have been added to this subject yet</p>
//             </div>
//           ) : (
//             <div>
//               {chapters.map((chapter, index) => (
//                 <div
//                   key={chapter.id}
//                   className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 border-b border-gray-200 transition-all duration-200 last:border-b-0 cursor-pointer group"
//                   onClick={() => navigate(`/admin/chapter/${chapter.id}`)}
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="relative">
//                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-purple-500/30 transition-shadow duration-300">
//                         {index + 1}
//                       </div>
//                       {/* Progress indicator */}
//                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
//                         <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 truncate">
//                         {chapter.chapter_name}
//                       </h3>
//                       <div className="flex items-center space-x-4 text-sm text-gray-500">
//                         <span className="flex items-center space-x-1">
//                           <Play className="w-3 h-3" />
//                           <span>5 lessons</span>
//                         </span>
//                         <span className="flex items-center space-x-1">
//                           <Clock className="w-3 h-3" />
//                           <span>2h 30m</span>
//                         </span>
//                         <span className="flex items-center space-x-1">
//                           <Users className="w-3 h-3" />
//                           <span>245 students</span>
//                         </span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center space-x-3">
//                     {/* Progress bar */}
//                     <div className="hidden md:flex items-center space-x-2">
//                       <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div 
//                           className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
//                           style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-xs text-gray-500 font-medium">
//                         {Math.floor(Math.random() * 40) + 60}%
//                       </span>
//                     </div>
                    
//                     {/* Status badge */}
//                     <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
//                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//                       <span>Active</span>
//                     </div>
                    
//                     <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
//                   </div>
//                 </div>
//               ))}
              
//               {/* Summary footer */}
//               <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span className="text-sm font-medium">
//                       {chapters.length} {chapters.length === 1 ? 'Chapter' : 'Chapters'} Available
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-4 text-sm text-gray-500">
//                     <span>{chapters.length * 5} Total Lessons</span>
//                     <span>•</span>
//                     <span>~{Math.floor(chapters.length * 2.5)}h Content</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChapterList;










// ==================================================





// Add Chapter


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Clock, ChevronRight, AlertCircle, FileText, Play, PlusCircle } from "lucide-react"; // Added PlusCircle

function ChapterList({ subjectId }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  // const role=

  useEffect(() => {
    console.log(subjectId);

    const fetchChapters = async () => {
      if (!subjectId) return;

      setLoading(true);
      setError(null);

      try {
        console.log("user=", token.user); // This line might cause an error if token.user is undefined
        // It's generally better to decode the token to get user info, or fetch user info separately
        // For now, I'll assume `token` itself is what you need for the header.

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
  }, [subjectId, token]); // Added token to the dependency array as it's used in fetchChapters

  const handleAddChapterClick = () => {
    // Navigate to the add chapter page. Replace '/admin/add-chapter' with your actual route.
    navigate(`/admin/add-chapter/${subjectId}`); 
  };

  if (loading) return <p className="text-center mt-8 text-lg text-gray-700">Loading chapters...</p>;
  if (error) return (
    <div className="p-6 text-center text-red-500 flex items-center justify-center space-x-2">
      <AlertCircle className="w-5 h-5" />
      <p>{error}</p>
    </div>
  );

  return (
    <div className="w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Chapters</p>
                <p className="text-2xl font-bold text-gray-900">{chapters.length}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <FileText className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Lessons</p>
                <p className="text-2xl font-bold text-gray-900">{chapters.length * 5}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Play className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Completion</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Clock className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-900">Chapter Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4"> {/* Added a div to hold both elements */}
              <button
                onClick={handleAddChapterClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Chapter
              </button>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {chapters.length} {chapters.length === 1 ? 'Chapter' : 'Chapters'}
              </div>
            </div>
          </div>
        </div>

        <div className="p-0">
          {chapters.length === 0 && !error ? (
            <div className="p-12 text-center text-gray-600">
              <svg className="mx-auto mb-4 w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-medium mb-2">No chapters found</h3>
              <p>No chapters have been added to this subject yet.</p>
              <button
                onClick={handleAddChapterClick}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Chapter
              </button>
            </div>
          ) : (
            <div>
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 border-b border-gray-200 transition-all duration-200 last:border-b-0 cursor-pointer group"
                  onClick={() => navigate(`/admin/chapter/${chapter.id}`)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-purple-500/30 transition-shadow duration-300">
                        {index + 1}
                      </div>
                      {/* Progress indicator */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 truncate">
                        {chapter.chapter_name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Play className="w-3 h-3" />
                          <span>5 lessons</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>2h 30m</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>245 students</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Progress bar */}
                    <div className="hidden md:flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {Math.floor(Math.random() * 40) + 60}%
                      </span>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Active</span>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                  </div>
                </div>
              ))}

              {/* Summary footer */}
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">
                      {chapters.length} {chapters.length === 1 ? 'Chapter' : 'Chapters'} Available
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{chapters.length * 5} Total Lessons</span>
                    <span>•</span>
                    <span>~{Math.floor(chapters.length * 2.5)}h Content</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChapterList;