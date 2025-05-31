import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SubmissionsTeacher() {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [markInput, setMarkInput] = useState("");

  // Fetch submissions from backend
  const fetchSubmissions = async () => {
    try {
      const url = search
        ? `/http://localhost:8000/teacher/submission/?submission=${encodeURIComponent(search)}`
        : "/http://localhost:8000/teacher/submission/";
      const response = await axios.get(url);
      setSubmissions(response.data);
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Search submissions on form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSubmissions();
  };

  // Start editing mark for a submission
  const startEdit = (id, currentMark) => {
    setEditingId(id);
    setMarkInput(currentMark ?? "");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setMarkInput("");
  };

  // Save updated mark (PUT request)
  const saveMark = async (id) => {
    try {
      const response = await axios.put("/api/submissions/", {
        id,
        mark: markInput,
      });
      alert(response.data.message || "Mark updated");
      setEditingId(null);
      setMarkInput("");
      fetchSubmissions();
    } catch (error) {
      alert("Failed to update mark");
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assignment Submissions</h1>

      <form onSubmit={handleSearchSubmit} className="mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by student or task"
          className="border border-gray-300 rounded px-3 py-2 mr-2 w-80"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Student</th>
            <th className="py-2 px-4 border-b text-left">Task</th>
            <th className="py-2 px-4 border-b text-left">File</th>
            <th className="py-2 px-4 border-b text-left">Submitted At</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Mark</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 && (
            <tr>
              <td colSpan="7" className="py-4 text-center text-gray-500">
                No submissions found.
              </td>
            </tr>
          )}

          {submissions.map((sub) => (
            <tr key={sub.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{sub.student}</td>
              <td className="py-2 px-4 border-b">{sub.assignment}</td>
              <td className="py-2 px-4 border-b">
                {sub.file ? (
                  <a
                    href={sub.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View File
                  </a>
                ) : (
                  "No file"
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(sub.submitted_at).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">{sub.status}</td>
              <td className="py-2 px-4 border-b">
                {editingId === sub.id ? (
                  <input
                    type="number"
                    value={markInput}
                    onChange={(e) => setMarkInput(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-20"
                    min="0"
                  />
                ) : (
                  sub.mark ?? "-"
                )}
              </td>
              <td className="py-2 px-4 border-b space-x-2">
                {editingId === sub.id ? (
                  <>
                    <button
                      onClick={() => saveMark(sub.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEdit(sub.id, sub.mark)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit Mark
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
