export const isDev = () => process.env.NODE_ENV === "development";
export const BASE_URL = isDev()
  ? "http://localhost:3000"
  : "https://joinpresage.com";
export const API_URL = isDev()
  ? "http://localhost:4000"
  : "https://api.joinpresage.com";
export const UMAMI_URL = isDev()
  ? "http://localhost:4000"
  : "https://analytics.joinpresage.com";
export const UMAMI_CONFIG = isDev()
  ? {
      website: "2a301202-2b75-4dd6-b0aa-06e2aa2cbbd5",
      language: "en-US",
    }
  : {};
