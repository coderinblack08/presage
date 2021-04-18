"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const defaultPublishers_1 = require("./lib/defaultPublishers");
const parser_1 = require("./lib/parser");
const rss_1 = require("./lib/rss");
const supabase_1 = require("./lib/supabase");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.time("main");
    console.log("⛽️ Request received, scrapping articles");
    yield supabase_1.supabase.from("publishers").upsert(defaultPublishers_1.defaultPublishers);
    for (const x of Object.keys(rss_1.rss)) {
        const feeds = yield parser_1.parser.parseURL(rss_1.rss[x].top);
        for (const feed of feeds.items) {
            if (feed.guid.startsWith("https://www.cnn.com/collections")) {
                continue;
            }
            const { data: alreadyExists } = yield supabase_1.supabase
                .from("articles")
                .select("*", { count: "exact" })
                .filter("title", "eq", feed.title);
            if (alreadyExists && alreadyExists.length === 0) {
                const res = yield axios_1.default.get(feed.guid, {
                    withCredentials: true,
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                    responseType: "text",
                });
                const $ = cheerio_1.default.load(res.data);
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
                yield supabase_1.supabase.from("articles").upsert([data]);
            }
        }
    }
    console.log("✨ Success, articles saved");
    console.timeEnd("main");
});
const app = express_1.default();
app.use(cors_1.default({ origin: "*" }));
app.post("/webhook", (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield main();
        res.status(200).send();
    }
    catch (error) {
        next(new Error(error));
    }
}));
app.listen(4000, () => console.log("🚀🌙 Listening on port http://localhost:4000"));
node_cron_1.default.schedule("*/10 * * * *", () => main());
//# sourceMappingURL=index.js.map