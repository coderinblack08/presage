export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.joinpresage.com"
    : "http://localhost:4000";
