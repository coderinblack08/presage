export const isDev = () => process.env.NODE_ENV === "development";
export const BASE_URL = isDev()
  ? "http://localhost:3000"
  : "https://joinpresage.com";
export const API_URL = isDev()
  ? "http://localhost:4000"
  : "https://api.joinpresage.com";
