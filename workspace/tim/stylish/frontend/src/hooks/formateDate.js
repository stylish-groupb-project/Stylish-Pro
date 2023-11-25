export default function formatDate(date) {
    const originalDate = new Date(date);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Taipei",
    };
    const formattedDate = originalDate.toLocaleString("en-US", options);
    return formattedDate;
  }