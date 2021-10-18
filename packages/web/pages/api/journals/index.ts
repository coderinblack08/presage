import to from "await-to-js";
import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { snapshotToArray } from "../../../lib/firebase/snapshotToArray";
import { verifySessionCookie } from "../../../lib/firebase/verifySessionCookie";

async function findJournals(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { uid } = await verifySessionCookie(req);
    const [error, data] = await to(
      admin.db.collection("journals").where("userId", "==", uid).get()
    );
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(snapshotToArray(data));
  } catch (error) {
    res.status(401).json(error);
  }
}

export default async function journals(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await findJournals(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
