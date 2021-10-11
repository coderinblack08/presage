import { NextApiRequest, NextApiResponse } from "next";
import { getArticle } from "../article/[id]";

export default async function draft(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  if (typeof req.query.id !== "string") {
    return res.status(422).json({ message: "Draft id is required" });
  }
  const result = await getArticle(req.query.id as string, false);
  console.log(result);
  res.json(result);
}
