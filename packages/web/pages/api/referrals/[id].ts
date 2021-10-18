import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { snapshotToArray } from "../../../lib/firebase/snapshotToArray";
import { verifySessionCookie } from "../../../lib/firebase/verifySessionCookie";

async function getReferral(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = await verifySessionCookie(req);
  const { id } = req.query;
  const [result] = snapshotToArray(
    await admin.db
      .collection("referrals")
      .where("articleId", "==", id.toString())
      .where("userId", "==", uid)
      .get()
  );
  res.json(result);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getReferral(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
