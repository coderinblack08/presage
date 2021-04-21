import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit = 5 } = req.query;
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();

  try {
    const result = await client.query(
      `
      select p.name,
      array_agg(json_build_object(
        'id', a.id,
        'category', a.category,
        'title', a.title,
        'publisher_name', p.name,
        'publisher_profile_picture', p.profile_picture,
        'description', a.description,
        'date', a.date,
        'url', a.url,
        'image', a.image
      ))
      from publishers p
      join lateral (
        select id, publisher, category, a.description, title, date, url, image
        from articles a
        where publisher = p.name
        order by -(now()::DATE - date::DATE) + priority desc
        limit $1
      ) a on a.publisher = p.name
      group by p.name;
      `,
      [limit]
    );
    res
      .status(200)
      .json(result.rows.map((x) => ({ name: x.name, articles: x.array_agg })));
  } catch (error) {
    res.status(500).send(error);
  }

  await client.end();
};
