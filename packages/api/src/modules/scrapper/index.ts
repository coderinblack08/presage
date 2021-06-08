import Parser from "rss-parser";
import axios from "axios";
import cheerio from "cheerio";
import { newsFeeds } from "./rss";
import { prisma } from "../../lib/prisma";
const parser = new Parser();

const parsers = {
  cnn: async (url: string) => {
    const result = await axios.get(url, {
      withCredentials: true,
      headers: { "X-Requested-With": "XMLHttpRequest" },
      responseType: "text",
    });

    const $ = cheerio.load(result.data);
    const contents = $(".zn-body__paragraph:not(.zn-body__footer)").text();

    return contents;
  },
  fox: (url: string) => {},
};

export const generatePresages = async () => {
  for (const outlet of Object.keys(newsFeeds) as ("cnn" | "fox")[]) {
    if (outlet !== "cnn") continue;
    const feeds = newsFeeds[outlet];
    await Promise.all(
      feeds.map(async (feed) => {
        const rss = await parser.parseURL(feed);
        let items: any = rss.items.map(({ link, guid, title, pubDate }) => ({
          url: link || guid,
          title,
          date: pubDate,
        }));

        items = Promise.all(
          items.map(async (item: any) => {
            item.content = await parsers[outlet](item.url);
          })
        );

        // await prisma.presage.create({
        //   data: {},
        // });
      })
    );
  }
};
