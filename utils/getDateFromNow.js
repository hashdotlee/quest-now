export default function getDayFromNow(date) {
  if (!date) return "";
  const now = new Date();
  const diff = now - new Date(date);
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const month = Math.floor(day / 30);
  const year = Math.floor(month / 12);
  if (day < 1) {
    return "Today";
  }
  if (day < 2) {
    return "Yesterday";
  }
  if (day < 7) {
    return `${day} days ago`;
  }
  if (year < 1) {
    return `${month} months ago`;
  }
  return `${year} years ago`;
}
