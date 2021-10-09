import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { Article } from "../../../types";

async function getDraft(id: string) {
  const article = await admin.db.collection("articles").doc(id).get();
  const result = article.data() as Article;

  const journal = (
    await admin.db.collection("journals").doc(result.journalId).get()
  ).data();

  return { ...result, journal, id: article.id };
}

export default async function draft(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  if (typeof req.query.id !== "string") {
    return res.status(422).json({ message: "Draft id is required" });
  }
  const result = await getDraft(req.query.id as string);
  console.log(result);
  res.json(result);
}
