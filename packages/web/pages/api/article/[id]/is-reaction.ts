import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../../lib/firebase/admin";
import { snapshotToArray } from "../../../../lib/firebase/utils/snapshotToArray";
import { verifySessionCookie } from "../../../../lib/firebase/utils/verifySessionCookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const { id, type } = req.query;
  const { uid } = await verifySessionCookie(req);
  const [doc] = snapshotToArray(
    await admin.db
      .collection("reactions")
      .where("userId", "==", uid)
      .where("articleId", "==", id)
      .get()
  );
  res.status(200).send(doc && doc[type.toString()]);
}
