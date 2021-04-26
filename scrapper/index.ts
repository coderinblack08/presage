import axios from "axios";
import cheerio from "cheerio";
import cors from "cors";
import "dotenv/config";
import express from "express";
import cron from "node-cron";
import { Client } from "pg";
import { defaultPublishers } from "./lib/defaultPublishers";
import { parser } from "./lib/parser";
import { rss } from "./lib/rss";
import { supabase } from "./lib/supabase";

const getCategories = (
  source: string,
  feed: any,
  $: cheerio.Root | undefined
): string[] => {
  switch (source) {
    case "Fox News":
      if ($) {
        const tags = $('meta[name="classification-tags"]').attr("content");
        return tags ? tags.split(",") : [];
      }
      return [];

    case "ABC":
      return feed.categories;

    default:
      return [];
  }
};

const blacklist = ["https://www.cnn.com/collections"];

const main = async () => {
  console.time("main");
  console.log("⛽️ Request received, scrapping articles");
  await supabase.from("publishers").upsert(defaultPublishers);
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();

  for (const x of Object.keys(rss)) {
    for (const section of ["top", "us"] as const) {
      const feeds = await parser.parseURL(rss[x][section]);
      let i = 0;
      for (const feed of feeds.items) {
        let blacklisted = false;
        blacklist.forEach((link) => {
          if (feed.guid!.startsWith(link)) {
            blacklisted = true;
          }
        });

        if (blacklisted) {
          continue;
        }

        const { data: alreadyExists } = await supabase
          .from("articles")
          .select("*", { count: "exact" })
          .filter("title", "eq", feed.title);

        if (alreadyExists && alreadyExists.length === 0) {
          let image: string = "";
          let $;

          if (x !== "ABC") {
            const res = await axios.get(feed.guid!, {
              withCredentials: true,
              headers: { "X-Requested-With": "XMLHttpRequest" },
              responseType: "text",
            });

            $ = cheerio.load(res.data);
            image = $('meta[property="og:image"]').attr("content") || "";
          }

          if (x === "ABC") {
            const rawRss = await axios.get(rss[x].top);
            $ = cheerio.load(rawRss.data);
            const items = $("item");
            image = (items.children()[i] as any).attribs.url;
          }

          const data = {
            category: getCategories(x, feed, $),
            section,
            publisher: x,
            title: feed.title,
            description: feed.contentSnippet,
            date: feed.pubDate || feed.isoDate,
            url: feed.guid || undefined,
            priority: (feeds.items.length - i) / feeds.items.length,
            image,
          };

          await supabase.from("articles").upsert([data]);
          for (const category of data.category) {
            await client.query(
              `
              insert into categories (name, articles)
              values ($1, 1)
              on conflict (name)
              do update set articles = categories.articles + 1;
            `,
              [category]
            );
          }
          i++;
        }
      }
    }
  }

  console.log("✨ Success, articles saved");
  console.timeEnd("main");
  await client.end();
};

const app = express();
app.use(cors({ origin: "*" }));

app.post("/webhook", async (_, res, next) => {
  try {
    await main();
    res.status(200).send();
  } catch (error) {
    next(new Error(error));
  }
});

app.listen(4000, () =>
  console.log("🚀🌙 Listening on port http://localhost:4000")
);

main();
if (process.env.NODE_ENV !== "production") {
  cron.schedule("*/10 * * * *", () => main());
}
