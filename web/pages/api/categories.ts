import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit = "5", page = "0" } = req.query;
  try {
    if (typeof limit === "string" && typeof page === "string") {
      const skip = parseInt(limit);
      const offset = parseInt(page) * skip;
      const result = await supabase
        .from("categories")
        .select("*")
        // .range(offset, offset + skip - 1)
        .order("articles", { ascending: false });

      res.status(200).json(result.data);
    } else {
      res.status(500).send("Invalid query");
    }
    return;
  } catch {}
  res.status(500).send("Bad request");
};
