// ESPN API requires date in YYYYMMDD format
export function formatDateForESPN(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

export function formatDateMD(dateString: string) {
  if (!dateString) return ""

  const date = new Date(dateString)

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  })
}

export function formatDateMDHM(dateString: string) {
  if (!dateString) return ""

  const date = new Date(dateString)

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}