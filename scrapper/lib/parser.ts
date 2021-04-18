import Parser from "rss-parser";

export const parser = new Parser<{
  guid?: string;
  pubDate?: string;
  contentSnippet?: string;
  isoDate?: string;
}>();
