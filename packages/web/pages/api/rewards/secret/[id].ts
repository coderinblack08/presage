import to from "await-to-js";
import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../../lib/firebase/admin";
import { verifySessionCookie } from "../../../../lib/firebase/verifySessionCookie";
import { ClaimedRewardStatus } from "../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [error, token] = await to(verifySessionCookie(req));
  if (error) {
    return res.status(401).json({ error: error.message });
  }
  const hasClaimed = await admin.db
    .collection(`users/${token?.uid}/claimedRewards`)
    .where("rewardId", "==", req.query.id)
    .where("status", "!=", ClaimedRewardStatus.Failed)
    .get();
  if (hasClaimed.empty) {
    return res
      .status(401)
      .json({ error: "You don't have access to this reward" });
  }
  const secret = await admin.db
    .doc(`rewards/${req.query.id}/secret/message`)
    .get();
  if (!secret.exists) {
    return res.status(404).json({ error: "Secret not found" });
  }
  return res.status(200).json(secret.data());
}
