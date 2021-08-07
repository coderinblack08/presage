export const isDev = () => process.env.NODE_ENV !== "production";
export const CLIENT_URL = isDev()
  ? "http://localhost:3000"
  : "https://joinpresage.com";
export const SECONDS_IN_HOUR = 1000 * 60 * 60;
export const PICTURES = [
  "magenta-purple",
  "orange",
  "plum-fuchsia",
  "purple-orange-sky",
  "rosy-pink",
  "yellow-lime",
];
export const getRandomPicture = () =>
  `${CLIENT_URL}/profile-picture/${
    PICTURES[Math.floor(Math.random() * PICTURES.length)]
  }.jpeg`;
