export default () => ({
  port: process.env.PORT || 4000,
  isDev: () => process.env.NODE_ENV === "development",
  isProd: () => process.env.NODE_ENV === "production",
  isTest: () => process.env.NODE_ENV === "test",
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
});
