export default () => ({
  client: "http://localhost:3000",
  port: process.env.PORT || 4000,
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
});
