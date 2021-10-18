import to from "await-to-js";
import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../lib/firebase/admin";
import { verifySessionCookie } from "../../lib/firebase/verifySessionCookie";
import { User } from "../../types";

async function getUser(uid: string) {
  const user = await admin.db.collection("users").doc(uid).get();
  return { ...(user.data() as User), uid };
}

export default async function account(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const [error, token] = await to(verifySessionCookie(req));
      if (error || !token) {
        return res.status(200).json(null);
      }
      res.json(await getUser(token.uid));
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
