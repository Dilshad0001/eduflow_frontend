// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Navigate, useNavigate } from 'react-router-dom';

// const CraeteStudentProfileForm = () => {
//   const [fullName, setFullName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [courseId, setCourseId] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [message, setMessage] = useState('');
//   const navigate=useNavigate()

//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     // Fetch list of courses
//     axios.get('http://127.0.0.1:8000/student/course/', {
//     //   headers: {
//     //     // Authorization: `Bearer ${token}`,
//     //   },
//     })
//     .then(res => setCourses(res.data))
//     .catch(err => console.error(err));
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         console.log("fullname",fullName);
        
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
//       setFullName('');
//       setPhoneNumber('');
//       setCourseId('');
//       navigate('/student/dashboard')
//     } catch (error) {
//       setMessage('Error creating profile.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold mb-4 text-center">Create Student Profile</h2>
//       {message && <p className="mb-4 text-center text-red-500">{message}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold mb-1">Full Name</label>
//           <input
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Phone Number</label>
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Select Course</label>
//           <select
//             value={courseId}
//             onChange={(e) => setCourseId(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           >
//             <option value="">Choose a course</option>
//             {courses.map((course) => (
//               <option key={course.id} value={course.id}>
//                 {course.course_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Create Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CraeteStudentProfileForm;




// ===============================================================




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    // Fetch list of courses
    setCoursesLoading(true);
    axios.get('http://127.0.0.1:8000/student/course/', {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    .then(res => {
      setCourses(res.data);
      setCoursesLoading(false);
    })
    .catch(err => {
      console.error(err);
      setCoursesLoading(false);
    });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      console.log("fullname", fullName);
      
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
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 1500);
      
    } catch (error) {
      setMessage('Error creating profile. Please try again.');
      setMessageType('error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Complete your student profile to get started</p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
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
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Course Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Select Course
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
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white appearance-none transition-colors duration-200"
                  required
                  disabled={coursesLoading}
                >
                  <option value="" className="text-gray-500 dark:text-gray-400">
                    {coursesLoading ? 'Loading courses...' : 'Choose a course'}
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || coursesLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Creating Profile...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Profile
                </div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have a profile? 
              <button 
                onClick={() => navigate('/student/dashboard')}
                className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Go to Dashboard
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentProfileForm;