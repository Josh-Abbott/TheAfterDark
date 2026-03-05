// ESPN API requires date in YYYYMMDD format
function formatDateForESPN(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}
export { formatDateForESPN };

// ESPN sets unranked teams to 99, need to convert back to null for frontend
function normalizeRank(rank?: number) {
  if (!rank || rank === 99) return null;
  return rank;
}
export { normalizeRank };