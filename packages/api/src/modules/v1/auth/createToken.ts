import { sign } from "jsonwebtoken";

export const createToken = (user: any) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};
