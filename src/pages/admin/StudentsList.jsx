// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function StudentsList() {
//   const [students, setStudents] = useState([]);
//   const [keyword, setKeyword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const fetchStudents = async (search = '') => {
//     setLoading(true);
//     try {

//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       setError("No authorization token found. Please login.");
//       setLoading(false);
//       navigate("/login");
//       return;
//     }

//       const response = await axios.get("http://localhost:8000/adminuser/student/",{
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },

//       });
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchStudents(keyword);
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
//         <h1 className="text-2xl font-bold mb-4">Student List</h1>

//         <form onSubmit={handleSearch} className="mb-6 flex gap-2">
//           <input
//             type="text"
//             placeholder="Search by full name..."
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Search
//           </button>
//         </form>

//         {loading ? (
//           <div className="text-center py-10">Loading students...</div>
//         ) : (
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="py-2 px-4 text-left">#</th>
//                 <th className="py-2 px-4 text-left">Full Name</th>
//                 <th className="py-2 px-4 text-left">Phone</th>
//                 <th className="py-2 px-4 text-left">Course</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="text-center py-4 text-gray-500">
//                     No students found
//                   </td>
//                 </tr>
//               ) : (
//                 students.map((student, index) => (
//                   <tr key={student.id} className="border-t">
//                     <td className="py-2 px-4">{index + 1}</td>
//                     <td className="py-2 px-4">{student.full_name}</td>
//                     <td className="py-2 px-4">{student.phone_number}</td>
//                     <td className="py-2 px-4">{student.course}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StudentsList;



// ====================================================









import { useEffect, useState } from 'react';
import { Users, GraduationCap, Search, RefreshCw, Phone, BookOpen, User } from "lucide-react";

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate navigation behavior
  const navigate = (path) => {
    console.log(`Navigation to: ${path}`);
    // In a real app, this would use react-router-dom's useNavigate
    alert(`Would navigate to: ${path}`);
  };

  const fetchStudents = async (search = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("No authorization token found. Please login.");
        setLoading(false);
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:8000/adminuser/student/", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized access. Please login again.");
          navigate("/login");
          return;
        }
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError("Failed to fetch students.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = () => {
    fetchStudents(keyword);
  };

  // Filter students based on search keyword
  const filteredStudents = students.filter(student =>
    student.full_name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                <p className="text-sm text-gray-500">View and search all registered students</p>
              </div>
            </div>
            <button
              onClick={() => fetchStudents(keyword)}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                    <dd className="text-lg font-medium text-gray-900">{students.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Unique Courses</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {new Set(students.map(student => student.course)).size}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Search className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Search Results</dt>
                    <dd className="text-lg font-medium text-gray-900">{filteredStudents.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white shadow-sm rounded-lg mb-6 border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by full name..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors duration-200"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Search
                </button>
              </div>
              
              <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                Showing {filteredStudents.length} of {students.length} students
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <User className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-12 text-center">
              <RefreshCw className="mx-auto h-8 w-8 text-gray-400 animate-spin" />
              <p className="mt-2 text-sm text-gray-500">Loading students...</p>
            </div>
          </div>
        )}

        {/* Students Table */}
        {!loading && !error && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            {filteredStudents.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {keyword 
                    ? "Try adjusting your search criteria."
                    : "No students have been registered yet."
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student, index) => (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-green-600" />
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{student.full_name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            {student.phone_number}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {student.course}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentsList;