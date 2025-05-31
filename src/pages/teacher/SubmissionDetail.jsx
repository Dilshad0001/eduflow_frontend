import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [error, setError] = useState("");
  const [newMark, setNewMark] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem("access_token"); // Adjust key if different

  useEffect(() => {
    if (!token) {
      setError("Unauthorized. Please login.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8000/teacher/submission/?submissionId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubmission(res.data);
        if (res.data.mark === null) {
          setNewMark(""); // allow mark input if null
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setError("Unauthorized access. Please login again.");
          navigate("/login");
        } else {
          setError("Submission not found");
        }
        console.error(err);
      });
  }, [id, token, navigate]);

  const handleMarkSave = async () => {
    if (!newMark.trim()) return;

    if (!token) {
      setError("Unauthorized. Please login.");
      navigate("/login");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.put(
        `http://localhost:8000/teacher/submission/?taskId=${id}`,
        { mark: newMark },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmission(response.data);
      setSuccess(true);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized access. Please login again.");
        navigate("/login");
      } else {
        setError("Failed to save mark.");
      }
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!submission) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submission Detail</h1>

      <div className="bg-white shadow rounded p-4 space-y-2">
        <p>
          <strong>Student:</strong> {submission.student}
        </p>
        <p>
          <strong>Assignment:</strong> {submission.assignment}
        </p>
        <p>
          <strong>Status:</strong> {submission.status}
        </p>

        <p>
          <strong>Mark:</strong>{" "}
          {submission.mark !== null ? (
            submission.mark
          ) : (
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                value={newMark}
                onChange={(e) => setNewMark(e.target.value)}
                placeholder="Enter mark"
                className="border px-3 py-1 rounded w-24"
              />
              <button
                onClick={handleMarkSave}
                disabled={saving}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </p>

        {success && <p className="text-green-600">Mark saved successfully!</p>}
        {error && <p className="text-red-500">{error}</p>}

        <p>
          <strong>Submitted At:</strong>{" "}
          {new Date(submission.submitted_at).toLocaleString()}
        </p>

        <p>
          <strong>File:</strong>{" "}
          {submission.file ? (
            <a
              href={submission.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View File
            </a>
          ) : (
            "No file"
          )}
        </p>
      </div>

      <Link
        to="/teacher/submission"
        className="mt-4 inline-block text-blue-600 underline"
      >
        ← Back to submissions
      </Link>
    </div>
  );
}
