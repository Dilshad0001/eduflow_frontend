const BASE_URL = "http://localhost:8000"; // Adjust if needed

// const BASE_URL = "http://localhost:8000"; // Adjust if needed

export async function getCourses() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No access token found. Please log in.");
  }

  const res = await fetch(`${BASE_URL}/adminuser/study/course/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch courses");

  return await res.json();
}
