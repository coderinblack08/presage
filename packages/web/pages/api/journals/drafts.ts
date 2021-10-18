import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { snapshotToArray } from "../../../lib/firebase/snapshotToArray";
import { verifySessionCookie } from "../../../lib/firebase/verifySessionCookie";

export default async function drafts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { uid } = await verifySessionCookie(req);
    const drafts = await admin.db
      .collection("articles")
      .where("userId", "==", uid)
      .where("journalId", "==", req.query.journalId)
      .select("id", "title", "createdAt")
      .get();
    res.json(snapshotToArray(drafts));
  } catch (error) {
    res.status(401).json(error);
  }
}
