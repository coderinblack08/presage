import to from "await-to-js";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../lib/firebase/admin";

export const expiresIn = 5 * 24 * 60 * 60 * 1000;

async function authenticateAccount(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.headers.authorization);
  const [error, token] = await to(
    admin.auth.verifyIdToken(req.headers.authorization as string)
  );
  if (error) {
    return res.status(401).json({ message: "Your JWT is invalid", error });
  }
  if (!token) {
    return res.status(401).json({ message: "Could not decode your ID token" });
  }
  if (new Date().getTime() / 1000 - token?.auth_time > 5 * 60) {
    return res.status(401).json({
      message: "A more recent login is required. Try again",
    });
  }
  const [error2, cookie] = await to(
    admin.auth.createSessionCookie(req.headers.authorization as string, {
      expiresIn,
    })
  );
  if (error2) {
    return res
      .status(401)
      .json({ message: "Failed to create session cookie", error2 });
  }
  res.setHeader(
    "Set-Cookie",
    serialize("jid", cookie as string, {
      path: "/",
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
  );
  res.status(200).end();
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      await authenticateAccount(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
