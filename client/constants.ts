export const IS_SERVER = typeof window === "undefined";
export const IS_CLIENT = !IS_SERVER;
export const IS_PROD = process.env.NODE_ENV === "production";
export const IS_DEV = process.env.NODE_ENV === "development";
export const BASE_URL = IS_DEV
  ? "http://localhost:3000"
  : "https://joinpresage.com";
export const API_URL = IS_DEV
  ? "http://localhost:4000"
  : "https://api.joinpresage.com";
