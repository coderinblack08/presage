import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { snapshotToArray } from "../../../lib/firebase/snapshotToArray";

async function findRewardsFromAuthor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await admin.db
    .collection("rewards")
    .where("userId", "==", req.query.author.toString())
    .orderBy("points", "asc")
    .get();
  res.json(snapshotToArray(result));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await findRewardsFromAuthor(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
