import API_BASE_URL from "../config";

export async function getNews() {
  const res = await fetch(`${API_BASE_URL}/news`);

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
}