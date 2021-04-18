import "dotenv/config";
import Parser from "rss-parser";
import axios from "axios";
import cheerio from "cheerio";
import { rss } from "./lib/rss";
import { supabase } from "./lib/supabase";
import { defaultPublishers } from "./lib/defaultPublishers";
const parser = new Parser<{
  guid?: string;
  pubDate?: string;
  contentSnippet?: string;
  isoDate?: string;
}>();

const main = async () => {
  await supabase.from("publishers").upsert(defaultPublishers);

  for (const x of Object.keys(rss)) {
    const feeds = await parser.parseURL(rss[x].top);
    for (const feed of feeds.items) {
      if (feed.guid!.startsWith("https://www.cnn.com/collections")) {
        continue;
      }

      const res = await axios.get(feed.guid!, {
        withCredentials: true,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        responseType: "text",
      });

      const $ = cheerio.load(res.data);
      const image = $('meta[property="og:image"]').attr("content");

      const data = {
        category: ["top"],
        publisher: x,
        title: feed.title,
        description: feed.contentSnippet,
        date: feed.pubDate || feed.isoDate,
        url: feed.guid || undefined,
        image,
      };

      await supabase.from("articles").upsert([data]);
    }
  }
};

main().catch((err) => console.error(err));
