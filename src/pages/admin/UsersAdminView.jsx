import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UsersListAdminView() {
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No authorization token found. Please login.");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/adminuser/userlist/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data.users);
    //   setBlockedUsers(response.data.blocked_users);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized access. Please login again.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
      } else {
        setError("Failed to fetch users.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin User Management</h1>

      {loading && <p className="text-gray-600">Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Active Users</h2>
            {users.length === 0 ? (
              <p className="text-gray-600">No active users found.</p>
            ) : (
              <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                    <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
                    <th className="px-4 py-2 border border-gray-300 text-left">Role</th>
                    <th className="px-4 py-2 border border-gray-300 text-left">Blocked</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.role === 1
                          ? "Teacher"
                          : user.role === 2
                          ? "Student"
                          : "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.is_blocked ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  );
}
