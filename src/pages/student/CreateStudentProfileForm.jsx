
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Navigate, useNavigate } from 'react-router-dom';

// const CreateStudentProfileForm = () => {
//   const [fullName, setFullName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [courseId, setCourseId] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState(''); // 'success' or 'error'
//   const [loading, setLoading] = useState(false);
//   const [coursesLoading, setCoursesLoading] = useState(true);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     // Fetch list of courses
//     setCoursesLoading(true);
//     axios.get('http://127.0.0.1:8000/student/course/', {
//       // headers: {
//       //   Authorization: `Bearer ${token}`,
//       // },
//     })
//     .then(res => {
//       setCourses(res.data);
//       setCoursesLoading(false);
//     })
//     .catch(err => {
//       console.error(err);
//       setCoursesLoading(false);
//     });
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
    
//     try {
//       console.log("fullname", fullName);
      
//       const response = await axios.post('http://127.0.0.1:8000/student/personal/profile/', {
//         full_name: fullName,
//         phone_number: phoneNumber,
//         course: courseId,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       setMessage('Profile created successfully!');
//       setMessageType('success');
//       setFullName('');
//       setPhoneNumber('');
//       setCourseId('');
      
//       // Navigate after a short delay to show success message
//       setTimeout(() => {
//         navigate('/student/dashboard');
//       }, 1500);
      
//     } catch (error) {
//       setMessage('Error creating profile. Please try again.');
//       setMessageType('error');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Profile</h1>
//           <p className="text-gray-600 dark:text-gray-400">Complete your student profile to get started</p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
//           {/* Message */}
//           {message && (
//             <div className={`mb-6 p-4 rounded-lg border ${
//               messageType === 'success' 
//                 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200' 
//                 : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
//             }`}>
//               <div className="flex items-center">
//                 <svg className={`w-5 h-5 mr-3 ${
//                   messageType === 'success' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
//                 }`} fill="currentColor" viewBox="0 0 20 20">
//                   {messageType === 'success' ? (
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   ) : (
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   )}
//                 </svg>
//                 <p className="font-medium">{message}</p>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
//                   placeholder="Enter your full name"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
//                   placeholder="Enter your phone number"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Course Selection */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                 Select Course
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                 </div>
//                 <select
//                   value={courseId}
//                   onChange={(e) => setCourseId(e.target.value)}
//                   className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white appearance-none transition-colors duration-200"
//                   required
//                   disabled={coursesLoading}
//                 >
//                   <option value="" className="text-gray-500 dark:text-gray-400">
//                     {coursesLoading ? 'Loading courses...' : 'Choose a course'}
//                   </option>
//                   {courses.map((course) => (
//                     <option key={course.id} value={course.id} className="text-gray-900 dark:text-white">
//                       {course.course_name}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading || coursesLoading}
//               className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//                   Creating Profile...
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                   Create Profile
//                 </div>
//               )}
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Already have a profile? 
//               <button 
//                 onClick={() => navigate('/student/dashboard')}
//                 className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
//               >
//                 Go to Dashboard
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateStudentProfileForm;
















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateStudentProfileForm = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  // Motivational quotes to display
  const motivationalQuotes = [
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The expert in anything was once a beginner. - Helen Hayes",
    "Your education is a dress rehearsal for a life that is yours to lead. - Nora Ephron",
    "The beautiful thing about learning is that no one can take it away from you. - B.B. King",
    "Success is the sum of small efforts, repeated day in and day out. - Robert Collier"
  ];

  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    // Rotate through motivational quotes every 8 seconds
    const quoteInterval = setInterval(() => {
      const currentIndex = motivationalQuotes.indexOf(currentQuote);
      const nextIndex = (currentIndex + 1) % motivationalQuotes.length;
      setCurrentQuote(motivationalQuotes[nextIndex]);
    }, 8000);

    // Fetch list of courses
    setCoursesLoading(true);
    axios.get('http://127.0.0.1:8000/student/course/')
      .then(res => {
        setCourses(res.data);
        setCoursesLoading(false);
      })
      .catch(err => {
        console.error(err);
        setCoursesLoading(false);
      });

    return () => clearInterval(quoteInterval);
  }, [token, currentQuote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/student/personal/profile/', {
        full_name: fullName,
        phone_number: phoneNumber,
        course: courseId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setMessage('Profile created successfully!');
      setMessageType('success');
      setFullName('');
      setPhoneNumber('');
      setCourseId('');
      
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 1500);
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating profile. Please try again.');
      setMessageType('error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-4">
        <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Side - Motivational Section */}
          <div className="lg:w-1/2 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-800 dark:to-green-900 p-8 text-white flex flex-col">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Welcome to Your Learning Journey</h1>
              <p className="text-green-100 dark:text-green-200">Complete your profile to unlock your potential</p>
            </div>
            
            <div className="flex-1 flex items-center">
              <div className="bg-green-700/30 dark:bg-green-900/30 p-6 rounded-xl border border-green-500/20 dark:border-green-700/50">
                <svg className="w-12 h-12 mb-4 text-green-200 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-xl italic mb-2 text-green-50 dark:text-green-100">"Knowledge is power. Information is liberating."</p>
                <p className="text-green-200 dark:text-green-300">- Kofi Annan</p>
              </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-green-500/20 dark:border-green-700/30">
              <div className="transition-opacity duration-500 ease-in-out">
                <p className="text-green-100 dark:text-green-200 italic">{currentQuote}</p>
              </div>
            </div>
          </div>
          
          {/* Right Side - Form Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-200">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ">Complete Your Profile</h2>
              <p className="text-gray-600 dark:text-gray-900">Just a few details to personalize your learning experience</p>
            </div>

            {/* Message */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg border ${
                messageType === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
              }`}>
                <div className="flex items-center">
                  <svg className={`w-5 h-5 mr-3 ${
                    messageType === 'success' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                  }`} fill="currentColor" viewBox="0 0 20 20">
                    {messageType === 'success' ? (
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    )}
                  </svg>
                  <p className="font-medium">{message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-900 mb-2">
                    Full Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-900 mb-2">
                    Phone Number
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-900 mb-2">
                  Select Your Course
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white appearance-none transition-colors duration-200"
                    required
                    disabled={coursesLoading}
                  >
                    <option value="" className="text-gray-500 dark:text-gray-400">
                      {coursesLoading ? 'Loading courses...' : 'Select your course'}
                    </option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id} className="text-gray-900 dark:text-white">
                        {course.course_name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-900">Choose the course you're enrolled in</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || coursesLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Creating Profile...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Complete Registration
                    </div>
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center border-t border-gray-200 dark:border-gray-700 pt-6">
              <p className="text-sm text-gray-600 dark:text-gray-900">
                Already have a profile? 
                <button 
                  onClick={() => navigate('/student/dashboard')}
                  className="ml-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
                >
                  Go to Dashboard
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentProfileForm;