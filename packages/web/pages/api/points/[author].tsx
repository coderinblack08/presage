import to from "await-to-js";
import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { verifySessionCookie } from "../../../lib/firebase/verifySessionCookie";

async function findPoints(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { uid } = await verifySessionCookie(req);
    const [error, points] = await to(
      admin.db
        .collection("users")
        .doc(uid)
        .collection("points")
        .doc(req.query.author.toString())
        .get()
    );
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(points?.data());
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
      await findPoints(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
