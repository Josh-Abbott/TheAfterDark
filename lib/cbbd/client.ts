import { parquetReadObjects } from "hyparquet";

const BASE_URL = "https://www.cbbdata.com/api/";

export async function fetchCBD(path: string, options?: RequestInit) {
  const separator = path.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${path}${separator}key=${process.env.CBD_API_KEY}`;

  const res = await fetch(url, {
    next: { revalidate: 900 },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`CBD fetch failed! ${res.status}: ${text}`);
  }

  const arrayBuffer = await res.arrayBuffer();

  const rows = await parquetReadObjects({
    file: arrayBuffer,
  });

  return rows;
}