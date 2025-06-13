// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import LessonCylinder from './LessonCylinder';

// const ChapterCylinder = ({subjectId}) => {
//     const navigate = useNavigate();
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [activeCourseIndex, setActiveCourseIndex] = useState(0);
//     // const subjectId=2

//     useEffect(() => {
//         const fetchStudentSubjects = async () => {
//             setLoading(true);
//             setError('');

//             const token = localStorage.getItem("access_token");

//             if (!token) {
//                 setError("No authorization token found. Please login.");
//                 setLoading(false);
//                 navigate("/login");
//                 return;
//             }

//             try {
//                 const response = await axios.get(`http://localhost:8000/student/chapter/?subjectId=${subjectId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 console.log(response.data);
                

//                 const fetchedCourses = response.data.map(chapter => ({
//                     id: chapter.id,
//                     title: chapter.chapter_name,
//                     instructor: 'Various Instructors',
//                     department: chapter.course,
//                     progress: Math.floor(Math.random() * 40) + 50,
//                     lessonsCompleted: Math.floor(Math.random() * 15) + 5,
//                     totalLessons: 20,
//                     dueDate: 'Ongoing',
//                     status: 'medium'
//                 }));

//                 setCourses(fetchedCourses);
//             } catch (err) {
//                 console.error("Error fetching subjects for dashboard:", err);
//                 if (err.response && err.response.status === 401) {
//                     setError("Session expired or unauthorized. Please login again.");
//                     navigate("/login");
//                 } else if (err.response && err.response.status === 404) {
//                     setError("No subjects found. Please ensure your profile is complete.");
//                 } else {
//                     setError("Failed to fetch courses. Please try again later.");
//                 }
//                 setCourses([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStudentSubjects();
//     }, [navigate,subjectId]);
//     console.log("subject id=",subjectId);
    

//     const rotateCylinder = (direction) => {
//         if (courses.length === 0) return;

//         let newIndex = activeCourseIndex;
//         if (direction === 'next') {
//             newIndex = (activeCourseIndex + 1) % courses.length;
//         } else if (direction === 'prev') {
//             newIndex = (activeCourseIndex - 1 + courses.length) % courses.length;
//         }
//         setActiveCourseIndex(newIndex);
//     };

//     const handleCourseClick = (subjectId) => {
//         navigate(`/student/subject/${subjectId}`);
//     };

//     const getProgressColor = (progress) => {
//         if (progress < 60) return 'bg-red-500';
//         if (progress < 80) return 'bg-yellow-500';
//         return 'bg-green-500';
//     };

//     return (
//         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
//             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//             {loading ? (
//                 <p className="text-gray-600 py-10 text-center">Loading subjects...</p>
//             ) : courses.length > 0 ? (
//                 <div className="relative flex items-center justify-center h-50 perspective-1000">
//                     <button
//                         onClick={() => rotateCylinder('prev')}
//                         className="absolute left-0 z-10 p-2 bg-blue-800 text-white rounded-full opacity-70 hover:opacity-100 transition-opacity transform -translate-x-1/2 focus:outline-none"
//                         aria-label="Previous Subject"
//                     >
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
//                         </svg>
//                     </button>
//                     <button
//                         onClick={() => rotateCylinder('next')}
//                         className="absolute right-0 z-10 p-2 bg-blue-800 text-white rounded-full opacity-70 hover:opacity-100 transition-opacity transform translate-x-1/2 focus:outline-none"
//                         aria-label="Next Subject"
//                     >
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                         </svg>
//                     </button>

//                     <div className="flex items-center justify-center w-full h-full relative" style={{ perspective: '1000px' }}>
//                         {courses.map((course, index) => {
//                             const isCurrent = index === activeCourseIndex;
//                             const isPrev = index === (activeCourseIndex - 1 + courses.length) % courses.length;
//                             const isNext = index === (activeCourseIndex + 1) % courses.length;
//                             const isHidden = !isCurrent && !isPrev && !isNext;

//                             let transformClasses = '';
//                             let zIndex = 10;
//                             let opacity = 0.5;
//                             let scale = 0.8;
//                             let bgStyle = 'bg-gray-50';

//                             if (isCurrent) {
//                                 transformClasses = 'translateZ(0) rotateY(0deg) scale(1)';
//                                 zIndex = 30;
//                                 opacity = 1;
//                                 scale = 1;
//                                 bgStyle = 'bg-white border-blue-500 border-2';
//                             } else if (isPrev) {
//                                 transformClasses = 'translateZ(-170px) translateX(-120px) rotateY(20deg) scale(0.95)';
//                                 zIndex = 20;
//                                 opacity = 0.7;
//                                 scale = 0.95;
//                                 bgStyle = 'bg-gray-100 border-gray-300';
//                             } else if (isNext) {
//                                 transformClasses = 'translateZ(-170px) translateX(120px) rotateY(-20deg) scale(0.95)';
//                                 zIndex = 20;
//                                 opacity = 0.7;
//                                 scale = 0.95;
//                                 bgStyle = 'bg-gray-100 border-gray-300';
//                             } else {
//                                 transformClasses = 'translateZ(-600px) scale(0.5)';
//                                 zIndex = 5;
//                                 opacity = 0;
//                             }

//                             const cardWidth = 320;
//                             const cardHeight = 220;

//                             return (
//                                 <div
//                                     key={course.id}
//                                     className={`absolute p-5 rounded-lg border shadow-lg flex flex-col justify-between overflow-hidden transition-all duration-500 ease-in-out ${bgStyle} ${isHidden ? 'pointer-events-none' : ''}`}
//                                     style={{
//                                         width: `${cardWidth}px`,
//                                         height: `${cardHeight}px`,
//                                         transform: transformClasses,
//                                         zIndex: zIndex,
//                                         opacity: opacity,
//                                         transformStyle: 'preserve-3d',
//                                         backfaceVisibility: 'hidden',
//                                         left: '50%',
//                                         marginLeft: `-${cardWidth / 2}px`,
//                                         cursor: isCurrent ? 'default' : 'pointer'
//                                     }}
//                                     onClick={() => isCurrent ? handleCourseClick(course.id) : setActiveCourseIndex(index)}
//                                 >
//                                     <div>
//                                         <div className="text-lg font-bold text-gray-900 mb-1 leading-tight">{course.title}</div>
//                                         <div className="text-sm text-gray-700 font-medium">{course.department}</div>
//                                         <div className="text-xs text-gray-500 mt-0.5">Instructor: {course.instructor}</div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm text-gray-600 mb-1">Progress: {course.progress}%</div>
//                                         <div className="bg-gray-200 rounded-full h-2.5 mb-1 overflow-hidden">
//                                             <div className={`h-full rounded-full ${getProgressColor(course.progress)}`} style={{ width: `${course.progress}%` }}></div>
//                                         </div>
//                                         <div className="flex justify-between text-xs text-gray-600 mt-2">
//                                             <span>{course.lessonsCompleted}/{course.totalLessons} Lessons</span>
//                                             <span className="font-medium text-blue-700">Due: {course.dueDate}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                     <div className="text-center text-sm text-gray-600 mt-4">
//                         Click arrows or adjacent cards to rotate
//                     </div>
//                 </div>
//             ) : (
//                 <p className="text-gray-600 py-10 text-center">No subjects available.</p>
//             )}

//             {currentSubjectId && <LessonCylinder chapterId={currentSubjectId} />}
//             {!currentSubjectId && !loading && courses.length === 0 && (
//                 <p className="text-gray-600 text-center mt-4">Select a subject above to view its chapters.</p>
//             )}
            
//         </div>
//     );
// };

// export default ChapterCylinder;



// =======================================================================
// handleChapterClick







// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import LessonCylinder from './LessonCylinder';

// const ChapterCylinder = ({subjectId}) => { // subjectId is received as a prop
//     const navigate = useNavigate();
//     const [chapters, setChapters] = useState([]); // Renamed 'courses' to 'chapters' for clarity
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [activeChapterIndex, setActiveChapterIndex] = useState(0); // Renamed 'activeCourseIndex'

//     useEffect(() => {
//         const fetchStudentChapters = async () => { // Renamed function for clarity
//             setLoading(true);
//             setError('');

//             const token = localStorage.getItem("access_token");

//             if (!token) {
//                 setError("No authorization token found. Please login.");
//                 setLoading(false);
//                 navigate("/login");
//                 return;
//             }

//             // Ensure subjectId is available before making the API call
//             if (!subjectId) {
//                 setError("No subject selected. Please go back and select a subject.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await axios.get(`http://localhost:8000/student/chapter/?subjectId=${subjectId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 console.log("Chapters fetched:", response.data);
                
//                 const fetchedChapters = response.data.map(chapter => ({ // Mapped to chapters
//                     id: chapter.id,
//                     title: chapter.chapter_name,
//                     instructor: 'Various Instructors', // You might want to get this from the API if available
//                     department: chapter.course, // This might be subject name, adjust as per your API
//                     progress: Math.floor(Math.random() * 40) + 50,
//                     lessonsCompleted: Math.floor(Math.random() * 15) + 5,
//                     totalLessons: 20,
//                     dueDate: 'Ongoing',
//                     status: 'medium'
//                 }));

//                 setChapters(fetchedChapters); // Set chapters
//             } catch (err) {
//                 console.error("Error fetching chapters for dashboard:", err);
//                 if (err.response && err.response.status === 401) {
//                     setError("Session expired or unauthorized. Please login again.");
//                     navigate("/login");
//                 } else if (err.response && err.response.status === 404) {
//                     setError("No chapters found for this subject.");
//                 } else {
//                     setError("Failed to fetch chapters. Please try again later.");
//                 }
//                 setChapters([]); // Set chapters to empty array on error
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchStudentChapters();
//     }, [navigate, subjectId]); // Add subjectId to dependency array so it refetches when subjectId changes
    
//     console.log("Subject ID in ChapterCylinder:", subjectId);

//     const rotateCylinder = (direction) => {
//         if (chapters.length === 0) return;

//         let newIndex = activeChapterIndex;
//         if (direction === 'next') {
//             newIndex = (activeChapterIndex + 1) % chapters.length;
//         } else if (direction === 'prev') {
//             newIndex = (activeChapterIndex - 1 + chapters.length) % chapters.length;
//         }
//         setActiveChapterIndex(newIndex);
//     };

//     const handleChapterClick = (chapterId) => { // Changed function name
//         // You might want to navigate to a page specific to a chapter, 
//         // or this click could simply trigger the LessonCylinder to load.
//         // For now, it will just make the clicked chapter active.
//         navigate(`/student/chapter/${chapterId}`); // Example navigation if needed
//         console.log(`Chapter with ID ${chapterId} clicked!`);
//     };

//     const getProgressColor = (progress) => {
//         if (progress < 60) return 'bg-red-500';
//         if (progress < 80) return 'bg-yellow-500';
//         return 'bg-green-500';
//     };

//     // Determine the currently selected chapter ID
//     const currentChapterId = chapters.length > 0 ? chapters[activeChapterIndex].id : null;

//     return (
//         <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden mt-8"> {/* Added mt-8 for spacing */}
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Chapters</h2>
//             {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//             {loading ? (
//                 <p className="text-gray-600 py-10 text-center">Loading chapters...</p>
//             ) : chapters.length > 0 ? (
//                 <div className="relative flex items-center justify-center h-50 perspective-1000">
//                     <button
//                         onClick={() => rotateCylinder('prev')}
//                         className="absolute left-0 z-10 p-2 bg-blue-800 text-white rounded-full opacity-70 hover:opacity-100 transition-opacity transform -translate-x-1/2 focus:outline-none"
//                         aria-label="Previous Chapter"
//                     >
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
//                         </svg>
//                     </button>
//                     <button
//                         onClick={() => rotateCylinder('next')}
//                         className="absolute right-0 z-10 p-2 bg-blue-800 text-white rounded-full opacity-70 hover:opacity-100 transition-opacity transform translate-x-1/2 focus:outline-none"
//                         aria-label="Next Chapter"
//                     >
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                         </svg>
//                     </button>

//                     <div className="flex items-center justify-center w-full h-full relative" style={{ perspective: '1000px' }}>
//                         {chapters.map((chapter, index) => { // Mapped 'course' to 'chapter'
//                             const isCurrent = index === activeChapterIndex;
//                             const isPrev = index === (activeChapterIndex - 1 + chapters.length) % chapters.length;
//                             const isNext = index === (activeChapterIndex + 1) % chapters.length;
//                             const isHidden = !isCurrent && !isPrev && !isNext;

//                             let transformClasses = '';
//                             let zIndex = 10;
//                             let opacity = 0.5;
//                             let scale = 0.8;
//                             let bgStyle = 'bg-gray-50';

//                             if (isCurrent) {
//                                 transformClasses = 'translateZ(0) rotateY(0deg) scale(1)';
//                                 zIndex = 30;
//                                 opacity = 1;
//                                 scale = 1;
//                                 bgStyle = 'bg-white border-blue-500 border-2';
//                             } else if (isPrev) {
//                                 transformClasses = 'translateZ(-170px) translateX(-120px) rotateY(20deg) scale(0.95)';
//                                 zIndex = 20;
//                                 opacity = 0.7;
//                                 scale = 0.95;
//                                 bgStyle = 'bg-gray-100 border-gray-300';
//                             } else if (isNext) {
//                                 transformClasses = 'translateZ(-170px) translateX(120px) rotateY(-20deg) scale(0.95)';
//                                 zIndex = 20;
//                                 opacity = 0.7;
//                                 scale = 0.95;
//                                 bgStyle = 'bg-gray-100 border-gray-300';
//                             } else {
//                                 transformClasses = 'translateZ(-600px) scale(0.5)';
//                                 zIndex = 5;
//                                 opacity = 0;
//                             }

//                             const cardWidth = 320;
//                             const cardHeight = 220;

//                             return (
//                                 <div
//                                     key={chapter.id}
//                                     className={`absolute p-5 rounded-lg border shadow-lg flex flex-col justify-between overflow-hidden transition-all duration-500 ease-in-out ${bgStyle} ${isHidden ? 'pointer-events-none' : ''}`}
//                                     style={{
//                                         width: `${cardWidth}px`,
//                                         height: `${cardHeight}px`,
//                                         transform: transformClasses,
//                                         zIndex: zIndex,
//                                         opacity: opacity,
//                                         transformStyle: 'preserve-3d',
//                                         backfaceVisibility: 'hidden',
//                                         left: '50%',
//                                         marginLeft: `-${cardWidth / 2}px`,
//                                         cursor: isCurrent ? 'default' : 'pointer'
//                                     }}
//                                     onClick={() => isCurrent ? handleChapterClick(chapter.id) : setActiveChapterIndex(index)}
//                                 >
//                                     <div>
//                                         <div className="text-lg font-bold text-gray-900 mb-1 leading-tight">{chapter.title}</div>
//                                         <div className="text-sm text-gray-700 font-medium">{chapter.department}</div>
//                                         <div className="text-xs text-gray-500 mt-0.5">Instructor: {chapter.instructor}</div>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm text-gray-600 mb-1">Progress: {chapter.progress}%</div>
//                                         <div className="bg-gray-200 rounded-full h-2.5 mb-1 overflow-hidden">
//                                             <div className={`h-full rounded-full ${getProgressColor(chapter.progress)}`} style={{ width: `${chapter.progress}%` }}></div>
//                                         </div>
//                                         <div className="flex justify-between text-xs text-gray-600 mt-2">
//                                             <span>{chapter.lessonsCompleted}/{chapter.totalLessons} Lessons</span>
//                                             <span className="font-medium text-blue-700">Due: {chapter.dueDate}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                 </div>
//             ) : (
//                 <p className="text-gray-600 py-10 text-center">No chapters available for this subject.</p>
//             )}

//             {/* Pass currentChapterId to LessonCylinder */}
//             <div className="mt-20">
//                 {currentChapterId && <LessonCylinder chapterId={currentChapterId,chapters.chapter_name} />}
//                 {!currentChapterId && !loading && chapters.length === 0 && (
//                     <p className="text-gray-600 text-center mt-4">Select a chapter above to view its lessons.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChapterCylinder;




// ==============================================








import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LessonCylinder from './LessonCylinder';

const ChapterCylinder = ({subjectId,subjectName}) => { // subjectId is received as a prop
    const navigate = useNavigate();
    const [chapters, setChapters] = useState([]); // Renamed 'courses' to 'chapters' for clarity
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeChapterIndex, setActiveChapterIndex] = useState(0); // Renamed 'activeCourseIndex'

    useEffect(() => {
        const fetchStudentChapters = async () => { // Renamed function for clarity
            setLoading(true);
            setError('');

            const token = localStorage.getItem("access_token");

            if (!token) {
                setError("No authorization token found. Please login.");
                setLoading(false);
                navigate("/login");
                return;
            }

            // Ensure subjectId is available before making the API call
            if (!subjectId) {
                setError("No subject selected. Please go back and select a subject.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/student/chapter/?subjectId=${subjectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Chapters fetched:", response.data);
                
                const fetchedChapters = response.data.map(chapter => ({ // Mapped to chapters
                    id: chapter.id,
                    title: chapter.chapter_name, // This is your chapter name
                    instructor: 'Various Instructors', // You might want to get this from the API if available
                    department: chapter.course, // This might be subject name, adjust as per your API
                    progress: Math.floor(Math.random() * 40) + 50,
                    lessonsCompleted: Math.floor(Math.random() * 15) + 5,
                    totalLessons: 20,
                    dueDate: 'Ongoing',
                    status: 'medium'
                }));

                setChapters(fetchedChapters); // Set chapters
            } catch (err) {
                console.error("Error fetching chapters for dashboard:", err);
                if (err.response && err.response.status === 401) {
                    setError("Session expired or unauthorized. Please login again.");
                    navigate("/login");
                } else if (err.response && err.response.status === 404) {
                    setError("No chapters found for this subject.");
                } else {
                    setError("Failed to fetch chapters. Please try again later.");
                }
                setChapters([]); // Set chapters to empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchStudentChapters();
    }, [navigate, subjectId]); // Add subjectId to dependency array so it refetches when subjectId changes
    
    console.log("Subject ID in ChapterCylinder:", subjectId);

    const rotateCylinder = (direction) => {
        if (chapters.length === 0) return;

        let newIndex = activeChapterIndex;
        if (direction === 'next') {
            newIndex = (activeChapterIndex + 1) % chapters.length;
        } else if (direction === 'prev') {
            newIndex = (activeChapterIndex - 1 + chapters.length) % chapters.length;
        }
        setActiveChapterIndex(newIndex);
    };

    const handleChapterClick = (chapterId) => { // Changed function name
        // You might want to navigate to a page specific to a chapter, 
        // or this click could simply trigger the LessonCylinder to load.
        // For now, it will just make the clicked chapter active.
        navigate(`/student/chapter/${chapterId}`); // Example navigation if needed
        console.log(`Chapter with ID ${chapterId} clicked!`);
    };

    const getProgressColor = (progress) => {
        if (progress < 60) return 'bg-red-500';
        if (progress < 80) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    // Determine the currently selected chapter ID and name
    const currentChapter = chapters.length > 0 ? chapters[activeChapterIndex] : null;
    const currentChapterId = currentChapter ? currentChapter.id : null;
    const currentChapterName = currentChapter ? currentChapter.title : null; // Get the title as chapter name

    return (
        <div className="bg-white border border-white rounded-xl p-6 shadow-sm relative overflow-hidden mt-8"> {/* Added mt-8 for spacing */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Chapters of {subjectName}</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {loading ? (
                <p className="text-gray-600 py-10 text-center">Loading chapters...</p>
            ) : chapters.length > 0 ? (
                <div className="relative flex items-center justify-center h-50 perspective-1000">
                    <button
                        onClick={() => rotateCylinder('prev')}
                        className="absolute left-0 z-10 p-2 bg-blue-800 text-white rounded-full opacity-70 hover:opacity-100 transition-opacity transform -translate-x-1/2 focus:outline-none"
                        aria-label="Previous Chapter"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button
                        onClick={() => rotateCylinder('next')}
                        className="absolute right-0 z-10 p-2 bg-blue-800 text-white rounded-full opacity-70 hover:opacity-100 transition-opacity transform translate-x-1/2 focus:outline-none"
                        aria-label="Next Chapter"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>

                    <div className="flex items-center justify-center w-full h-full relative rounded-full " style={{ perspective: '1000px' }}>
                        {chapters.map((chapter, index) => { // Mapped 'course' to 'chapter'
                            const isCurrent = index === activeChapterIndex;
                            const isPrev = index === (activeChapterIndex - 1 + chapters.length) % chapters.length;
                            const isNext = index === (activeChapterIndex + 1) % chapters.length;
                            const isHidden = !isCurrent && !isPrev && !isNext;

                            let transformClasses = '';
                            let zIndex = 10;
                            let opacity = 0.5;
                            let scale = 0.8;
                            let bgStyle = 'bg-gray-50';

                            if (isCurrent) {
                                transformClasses = 'translateZ(0) rotateY(0deg) scale(1)';
                                zIndex = 30;
                                opacity = 1;
                                scale = 1;
                                bgStyle = 'bg-white border-blue-500 border-2';
                            } else if (isPrev) {
                                transformClasses = 'translateZ(-170px) translateX(-120px) rotateY(20deg) scale(0.95)';
                                zIndex = 20;
                                opacity = 0.7;
                                scale = 0.95;
                                bgStyle = 'bg-gray-100 border-gray-300';
                            } else if (isNext) {
                                transformClasses = 'translateZ(-170px) translateX(120px) rotateY(-20deg) scale(0.95)';
                                zIndex = 20;
                                opacity = 0.7;
                                scale = 0.95;
                                bgStyle = 'bg-gray-100 border-gray-300';
                            } else {
                                transformClasses = 'translateZ(-600px) scale(0.5)';
                                zIndex = 5;
                                opacity = 0;
                            }

                            const cardWidth = 320;
                            const cardHeight = 220;

                            return (
                                <div
                                    key={chapter.id}
                                    className={`absolute p-5 rounded-lg border shadow-lg flex flex-col justify-between overflow-hidden transition-all duration-500 ease-in-out ${bgStyle} ${isHidden ? 'pointer-events-none' : ''}`}
                                    style={{
                                        width: `${cardWidth}px`,
                                        height: `${cardHeight}px`,
                                        transform: transformClasses,
                                        zIndex: zIndex,
                                        opacity: opacity,
                                        transformStyle: 'preserve-3d',
                                        backfaceVisibility: 'hidden',
                                        left: '50%',
                                        marginLeft: `-${cardWidth / 2}px`,
                                        cursor: isCurrent ? 'default' : 'pointer'
                                    }}
                                    onClick={() => isCurrent ? handleChapterClick(chapter.id) : setActiveChapterIndex(index)}
                                >
                                    <div>
                                        <div className="text-lg font-bold text-gray-900 mb-1 leading-tight">{chapter.title}</div>
                                        <div className="text-sm text-gray-700 font-medium">{chapter.department}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">Instructor: {chapter.instructor}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Progress: {chapter.progress}%</div>
                                        <div className="bg-gray-200 rounded-full h-2.5 mb-1 overflow-hidden">
                                            <div className={`h-full rounded-full ${getProgressColor(chapter.progress)}`} style={{ width: `${chapter.progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-600 mt-2">
                                            <span>{chapter.lessonsCompleted}/{chapter.totalLessons} Lessons</span>
                                            <span className="font-medium text-blue-700">Due: {chapter.dueDate}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            ) : (
                <p className="text-gray-600 py-10 text-center">No chapters available for this subject.</p>
            )}

            {/* Pass currentChapterId and currentChapterName to LessonCylinder */}
            <div className="mt-20">
                {currentChapterId && currentChapterName && <LessonCylinder chapterId={currentChapterId} chapterName={currentChapterName} />}
                {!currentChapterId && !loading && chapters.length === 0 && (
                    <p className="text-gray-600 text-center mt-4">Select a chapter above to view its lessons.</p>
                )}
            </div>
        </div>
    );
};

export default ChapterCylinder;