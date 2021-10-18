import to from "await-to-js";
import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../../lib/firebase/admin";
import { snapshotToArray } from "../../../../lib/firebase/snapshotToArray";
import { verifySessionCookie } from "../../../../lib/firebase/verifySessionCookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const { id, type } = req.query;
  const [error, token] = await to(verifySessionCookie(req));

  if (error) {
    return res.status(200).send(false);
  }

  const [doc] = snapshotToArray(
    await admin.db
      .collection("reactions")
      .where("userId", "==", token?.uid)
      .where("articleId", "==", id)
      .get()
  );
  res.status(200).send(doc && doc[type.toString()] === true);
}
