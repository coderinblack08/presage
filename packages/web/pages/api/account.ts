import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../lib/firebase/admin";
import { verifySessionCookie } from "../../lib/firebase/utils/verifySessionCookie";
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
      try {
        const { uid } = await verifySessionCookie(req);
        res.json(await getUser(uid));
      } catch (error) {
        res.status(401).json(error);
      }
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
