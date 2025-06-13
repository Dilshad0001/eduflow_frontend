// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function TeachersList() {
//   const [teachers, setTeachers] = useState([]);
//   const [keyword, setKeyword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem('access_token'); // Assume token is stored here

//   const fetchTeachers = async (search = '') => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/adminuser/teacher/?teacher=${search}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setTeachers(response.data);
//     } catch (error) {
//       console.error('Error fetching teachers:', error);
//       setTeachers([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchTeachers(keyword);
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
//         <h1 className="text-2xl font-bold mb-4">Teacher List</h1>

//         <form onSubmit={handleSearch} className="mb-6 flex gap-2">
//           <input
//             type="text"
//             placeholder="Search by name..."
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
//           <div className="text-center py-10">Loading teachers...</div>
//         ) : (
//           <table className="min-w-full border border-gray-300 rounded-lg">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="py-2 px-4 text-left">#</th>
//                 <th className="py-2 px-4 text-left">Teacher Name</th>
//                 <th className="py-2 px-4 text-left">Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {teachers.length === 0 ? (
//                 <tr>
//                   <td colSpan="3" className="text-center py-4 text-gray-500">
//                     No teachers found
//                   </td>
//                 </tr>
//               ) : (
//                 teachers.map((teacher, index) => (
//                   <tr key={teacher.id} className="border-t">
//                     <td className="py-2 px-4">{index + 1}</td>
//                     <td className="py-2 px-4">{teacher.teacher_name}</td>
//                     <td className="py-2 px-4">{teacher.user.email}</td>
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

// export default TeachersList;



// ======================================================



import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  GraduationCap,
  Search,
  RefreshCw,
  User,
  Mail,
} from 'lucide-react';

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('access_token');

  const fetchTeachers = async (search = '') => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/adminuser/teacher/?teacher=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTeachers(keyword);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Teacher Management</h1>
                <p className="text-sm text-gray-500">View and search all registered teachers</p>
              </div>
            </div>
            <button
              onClick={() => fetchTeachers(keyword)}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Teachers</dt>
                    <dd className="text-lg font-medium text-gray-900">{teachers.length}</dd>
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
                    <dd className="text-lg font-medium text-gray-900">{teachers.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white shadow-sm rounded-lg mb-6 border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by teacher name..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Search
                </button>
              </div>
              <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                Showing {teachers.length} teachers
              </div>
            </form>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-12 text-center">
              <RefreshCw className="mx-auto h-8 w-8 text-gray-400 animate-spin" />
              <p className="mt-2 text-sm text-gray-500">Loading teachers...</p>
            </div>
          </div>
        )}

        {/* Teachers Table */}
        {!loading && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            {teachers.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No teachers found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {keyword
                    ? "Try adjusting your search criteria."
                    : "No teachers have been registered yet."
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
                        Teacher Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teachers.map((teacher, index) => (
                      <tr key={teacher.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{teacher.teacher_name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            {teacher.user.email}
                          </div>
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

export default TeachersList;
