// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const StudentProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // initialize navigation

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/student/personal/profile/', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//         },
//       })
//       .then((res) => {
//         if (Array.isArray(res.data) && res.data.length > 0) {
//           setProfile(res.data[0]);
//         } else {
//           setError('Profile not found');
//           navigate("/student/createprofile");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError('Error fetching profile');
//         setLoading(false);
        
//       });
//   }, []);

//   const handleUpdateClick = () => {
//     navigate('/student/profile/update');
//   };

//   if (loading) return <div className="p-4">Loading...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <h1 className="text-3xl font-bold text-center mb-10">Student Profile</h1>
//       <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
//         <div className="mb-4">
//           <strong className="block text-gray-700">Full Name:</strong>
//           <span>{profile.full_name}</span>
//         </div>
//         <div className="mb-4">
//           <strong className="block text-gray-700">Phone Number:</strong>
//           <span>{profile.phone_number}</span>
//         </div>
//         <div className="mb-4">
//           <strong className="block text-gray-700">Course:</strong>
//           <span>{profile.course}</span>
//         </div>
//         <button
//           onClick={handleUpdateClick}
//           className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//         >
//           Update Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;


// ======================================================================





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // initialize navigation

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/student/personal/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProfile(res.data[0]);
        } else {
          setError('Profile not found');
          navigate("/student/createprofile");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching profile');
        setLoading(false);
        
      });
  }, []);

  const handleUpdateClick = () => {
    navigate('/student/profile/update');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-600 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Loading Profile</h3>
              <p className="text-slate-600 dark:text-slate-400">Please wait while we fetch your information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Error Loading Profile</h3>
            <p className="text-slate-600 dark:text-slate-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent">
                  Student Profile
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mt-1">
                  View and manage your personal information
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/50 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">{profile.full_name}</h2>
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-medium">Student</span>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
            </div>

            {/* Profile Details */}
            <div className="p-8 space-y-6">
              {/* Full Name */}
              <div className="group">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                      <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Full Name</p>
                      <p className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">{profile.full_name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="group">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Phone Number</p>
                      <p className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">{profile.phone_number}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course */}
              <div className="group">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Course</p>
                      <p className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">{profile.course}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Profile Button */}
              <div className="pt-4">
                <button
                  onClick={handleUpdateClick}
                  className="group w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="text-lg">Update Profile</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          </div>

          {/* Additional Info Card */}
          <div className="mt-8 bg-slate-100/50 dark:bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Profile Information</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Keep your profile information up to date to ensure smooth communication and course management. 
                  You can update your details anytime by clicking the update button above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;