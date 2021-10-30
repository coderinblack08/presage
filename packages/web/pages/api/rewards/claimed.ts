import firebaseAdmin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { innerJoin } from "../../../lib/firebase/innerJoin";
import { snapshotToArray } from "../../../lib/firebase/snapshotToArray";
import { verifySessionCookie } from "../../../lib/firebase/verifySessionCookie";
import { ClaimedReward } from "../../../types";

async function findClaimedRewards(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = await verifySessionCookie(req);
  const result = snapshotToArray(
    await admin.db
      .collection(`users/${uid}/claimedRewards`)
      .orderBy("createdAt", "desc")
      .get()
  ) as ClaimedReward[];
  const rewards = result.length
    ? snapshotToArray(
        await admin.db
          .collection("rewards")
          .where(
            firebaseAdmin.firestore.FieldPath.documentId(),
            "in",
            result.map((x) => x.rewardId)
          )
          .get()
      )
    : [];
  res.json(
    innerJoin(result, rewards, { joinKey: "rewardId", fieldName: "reward" })
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await findClaimedRewards(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
