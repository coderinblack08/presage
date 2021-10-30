import { NextApiRequest, NextApiResponse } from "next";
import * as firebaseAdmin from "firebase-admin";
import { admin } from "../../../lib/firebase/admin";
import { snapshotToArray } from "../../../lib/firebase/snapshotToArray";
import { innerJoin } from "../../../lib/firebase/innerJoin";

async function findComments(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;
  const comments = snapshotToArray(
    await admin.db
      .collection(path.toString())
      .orderBy("createdAt", "desc")
      .get()
  );
  const users = comments.length
    ? snapshotToArray(
        await admin.db
          .collection("users")
          .where(
            firebaseAdmin.firestore.FieldPath.documentId(),
            "in",
            comments.map((x) => x.userId)
          )
          .get()
      )
    : [];
  res.json(
    innerJoin(comments, users, { joinKey: "userId", fieldName: "user" })
  );
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
