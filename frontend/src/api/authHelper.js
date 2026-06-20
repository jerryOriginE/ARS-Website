import API_BASE_URL from "../config";

export async function getProfile() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}