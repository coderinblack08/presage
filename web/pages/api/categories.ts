import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit = 5, offset = 0 } = req.query;
  if (typeof limit === "number" && typeof offset === "number") {
    const result = await supabase
      .from("categories")
      .select("*")
      .range(offset, offset + limit)
      .order("articles", { ascending: false });
    res.status(200).json(result.data);
  }
};
