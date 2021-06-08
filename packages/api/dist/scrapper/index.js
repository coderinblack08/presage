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
exports.generatePresages = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const rss_1 = require("./rss");
const parser = new rss_parser_1.default();
const parsers = {
    cnn: (url) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield axios_1.default.get(url, {
            withCredentials: true,
            headers: { "X-Requested-With": "XMLHttpRequest" },
            responseType: "text",
        });
        const $ = cheerio_1.default.load(result.data);
        const contents = $(".zn-body__paragraph:not(.zn-body__footer)").text();
        return contents;
    }),
    fox: (url) => { },
};
const generatePresages = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const outlet of Object.keys(rss_1.newsFeeds)) {
        if (outlet !== "cnn")
            continue;
        const feeds = rss_1.newsFeeds[outlet];
        yield Promise.all(feeds.map((feed) => __awaiter(void 0, void 0, void 0, function* () {
            const rss = yield parser.parseURL(feed);
            let items = rss.items.map(({ link, guid, title, pubDate }) => ({
                url: link || guid,
                title,
                date: pubDate,
            }));
            items = Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                item.content = yield parsers[outlet](item.url);
            })));
        })));
    }
});
exports.generatePresages = generatePresages;
//# sourceMappingURL=index.js.map