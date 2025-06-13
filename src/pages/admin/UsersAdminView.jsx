// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function UsersListAdminView() {
//   const [users, setUsers] = useState([]);
//   const [blockedUsers, setBlockedUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   // Fetch users from backend
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);

//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       setError("No authorization token found. Please login.");
//       setLoading(false);
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         "http://localhost:8000/adminuser/userlist/",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setUsers(response.data.users);
//     //   setBlockedUsers(response.data.blocked_users);
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         setError("Unauthorized access. Please login again.");
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         navigate("/login");
//       } else {
//         setError("Failed to fetch users.");
//       }
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin User Management</h1>

//       {loading && <p className="text-gray-600">Loading users...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {!loading && !error && (
//         <>
//           <section className="mb-10">
//             <h2 className="text-xl font-semibold mb-4">Active Users</h2>
//             {users.length === 0 ? (
//               <p className="text-gray-600">No active users found.</p>
//             ) : (
//               <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
//                     <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
//                     <th className="px-4 py-2 border border-gray-300 text-left">Role</th>
//                     <th className="px-4 py-2 border border-gray-300 text-left">Blocked</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <tr key={user.id} className="hover:bg-gray-50">
//                       <td className="border border-gray-300 px-4 py-2">{user.id}</td>
//                       <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         {user.role === 1
//                           ? "Teacher"
//                           : user.role === 2
//                           ? "Student"
//                           : "N/A"}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         {user.is_blocked ? "Yes" : "No"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </section>
//         </>
//       )}
//     </div>
//   );
// }



// ===================================




import React, { useState, useEffect } from "react";
import { Users, Shield, UserCheck, UserX, Search, Filter, RefreshCw } from "lucide-react";

export default function UsersListAdminView() {
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Simulate navigation behavior
  const navigate = (path) => {
    console.log(`Navigation to: ${path}`);
    // In a real app, this would use react-router-dom's useNavigate
    alert(`Would navigate to: ${path}`);
  };

  // Simulate token check - replace with actual localStorage in your real app
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("access_token"); // Replace with: localStorage.getItem("access_token");
    if (!token) {
      setError("No authorization token found. Please login.");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      // Using fetch instead of axios since axios isn't available
      const response = await fetch("http://localhost:8000/adminuser/userlist/", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized access. Please login again.");
          // In real app: localStorage.removeItem("access_token");
          // In real app: localStorage.removeItem("refresh_token");
          navigate("/login");
          return;
        }
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users);
      // setBlockedUsers(data.blocked_users);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || 
      (roleFilter === "teacher" && user.role === 1) ||
      (roleFilter === "student" && user.role === 2);
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    if (role === 1) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Shield className="w-3 h-3 mr-1" />
          Teacher
        </span>
      );
    } else if (role === 2) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <UserCheck className="w-3 h-3 mr-1" />
          Student
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        N/A
      </span>
    );
  };

  const getStatusBadge = (isBlocked) => {
    if (isBlocked) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <UserX className="w-3 h-3 mr-1" />
          Blocked
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <UserCheck className="w-3 h-3 mr-1" />
        Active
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-500">Manage and monitor all system users</p>
              </div>
            </div>
            <button
              onClick={fetchUsers}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd className="text-lg font-medium text-gray-900">{users.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserCheck className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {users.filter(user => !user.is_blocked).length}
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
                  <UserX className="h-6 w-6 text-red-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Blocked Users</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {users.filter(user => user.is_blocked).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow-sm rounded-lg mb-6 border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition-colors duration-200"
                  >
                    <option value="all">All Roles</option>
                    <option value="teacher">Teachers</option>
                    <option value="student">Students</option>
                  </select>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <UserX className="h-5 w-5 text-red-400" />
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
              <p className="mt-2 text-sm text-gray-500">Loading users...</p>
            </div>
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            {filteredUsers.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || roleFilter !== "all" 
                    ? "Try adjusting your search or filter criteria."
                    : "No users have been registered yet."
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-mono">
                            #{user.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRoleBadge(user.role)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(user.is_blocked)}
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