import type { NextApiRequest, NextApiResponse } from "next";
import pg from "pg-promise";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit = 5, publisher, category, section } = req.query;

  const db = pg()(process.env.CONNECTION_STRING);
  db.connect();

  try {
    const result = await db.any(
      `
      select a.*
      from publishers p
      join lateral (
        select 
          b.*,
          c.name as publisher_name,
          c.profile_picture as publisher_profile_picture,
          (-(now()::DATE - date::DATE) * 0.75 + priority + likes * 0.1) as rank
        from articles b
        inner join publishers c on name = publisher
        where publisher = p.name ${
          category ? "and ${category} = any(category)" : ""
        } ${section ? "and ${section} = section" : ""}
        order by -(now()::DATE - date::DATE) * 0.75 + priority + likes * 0.1 desc
        limit ${limit}
      ) as a on a.publisher = p.name
      ${publisher ? "where p.name = ${publisher}" : ""}
      order by a.rank desc;
      `,
      { limit, publisher, category, section }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }

  await db.$pool.end();
};
