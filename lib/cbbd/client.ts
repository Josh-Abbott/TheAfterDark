const BASE_URL = "https://api.collegebasketballdata.com";

export async function fetchCBBD(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.CFBD_API_KEY}`, // Bearer needed here
    },
    next: { revalidate: 86400 }, // cache for a day (stats rarely change)
    ...options,
  });

  if (!res.ok) {
    throw new Error("CBBD fetch failed!");
  }

  return res.json();
}