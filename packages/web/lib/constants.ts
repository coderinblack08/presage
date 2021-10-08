export const isServer = () => typeof window === "undefined";
export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://joinpresage.com"
    : "http://localhost:3000";
