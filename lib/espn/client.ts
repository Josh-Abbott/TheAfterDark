const BASE_URL = "https://site.api.espn.com/apis/site/v2/sports";

export async function fetchESPN(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}/${path}`, {
    next: { revalidate: 300 },
    ...options,
  });

  if (!res.ok) {
    throw new Error("ESPN fetch failed!");
  }

  return res.json();
}