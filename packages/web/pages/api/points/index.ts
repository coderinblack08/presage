import firebaseAdmin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { innerJoin } from "../../../lib/firebase/innerJoin";
import { snapshotToArray } from "../../../lib/firebase/snapshotToArray";
import { verifySessionCookie } from "../../../lib/firebase/verifySessionCookie";
import { Points } from "../../../types";

async function findPoints(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = await verifySessionCookie(req);
  const result = snapshotToArray(
    await admin.db.collection(`users/${uid}/points`).get()
  ) as Points[];
  const rewards = result.length
    ? snapshotToArray(
        await admin.db
          .collection("users")
          .where(
            firebaseAdmin.firestore.FieldPath.documentId(),
            "in",
            result.map((x) => x.id)
          )
          .get()
      )
    : [];
  res.json(innerJoin(result, rewards, { joinKey: "id", fieldName: "user" }));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await findPoints(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
