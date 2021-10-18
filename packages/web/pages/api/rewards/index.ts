import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { snapshotToArray } from "../../../lib/firebase/snapshotToArray";
import { verifySessionCookie } from "../../../lib/firebase/verifySessionCookie";

async function findRewards(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = await verifySessionCookie(req);
  const result = await admin.db
    .collection("rewards")
    .where("userId", "==", uid)
    .get();
  res.json(snapshotToArray(result));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await findRewards(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
