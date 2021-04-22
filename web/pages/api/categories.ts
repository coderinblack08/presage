import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit = 5, offset = 0 } = req.query;
  try {
    const result = await supabase
      .from("categories")
      .select("*")
      .range(
        parseInt(offset as string),
        parseInt(offset as string) + parseInt(limit as string)
      )
      .order("articles", { ascending: false });

    res.status(200).json(result.data);
    return;
  } catch {}
  res.status(500).send("Bad request");
};
