import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { snapshotToArray } from "../../../lib/firebase/utils/snapshotToArray";

async function findComments(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;
  const result = await admin.db
    .collection(path.toString())
    .orderBy("createdAt", "desc")
    .get();
  console.log(result);
  res.json(snapshotToArray(result));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await findComments(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
