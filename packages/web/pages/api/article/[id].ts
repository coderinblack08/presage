import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/firebase/admin";
import { Article, Journal } from "../../../types";

export async function getArticle(id: string, join = true) {
  const article = await admin.db.collection("articles").doc(id).get();
  const result = article.data() as Article;
  const journal = (
    await admin.db.collection("journals").doc(result.journalId).get()
  ).data() as Journal;
  const data = { ...result, journal, id: article.id };
  if (join) {
    const user = (
      await admin.db.collection("users").doc(result.userId).get()
    ).data();
    return { ...data, user };
  }
  return data;
}

export default async function draft(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  if (typeof req.query.id !== "string") {
    return res.status(422).json({ message: "Draft id is required" });
  }
  const result = await getArticle(req.query.id as string);
  console.log(result);
  res.json(result);
}
