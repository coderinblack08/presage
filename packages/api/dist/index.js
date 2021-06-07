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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const google_1 = require("./modules/auth/google");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./lib/constants");
const helmet_1 = __importDefault(require("helmet"));
const prisma_1 = require("./lib/prisma");
const post_1 = require("./modules/post");
const cors_1 = __importDefault(require("cors"));
const createTokens_1 = require("./modules/auth/createTokens");
const jsonwebtoken_1 = require("jsonwebtoken");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient();
    const app = express_1.default();
    app.use(helmet_1.default());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(cors_1.default({
        origin: "*",
        maxAge: !constants_1.isDev() ? 86400 : undefined,
        exposedHeaders: [
            "access-token",
            "refresh-token",
            "content-type",
            "content-length",
        ],
    }));
    app.use(express_session_1.default({
        name: "qid",
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: !constants_1.isDev(),
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    passport_1.default.serializeUser((user, done) => {
        done(null, user.accessToken);
    });
    app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = req.headers["access-token"];
        if (!accessToken || typeof accessToken !== "string")
            return next();
        try {
            const data = (jsonwebtoken_1.verify(accessToken, process.env.ACCESS_TOKEN_SECRET));
            req.userId = data.userId;
            return next();
        }
        catch (_a) { }
        const refreshToken = req.headers["refresh-token"];
        if (!refreshToken || typeof refreshToken !== "string")
            return next();
        let data;
        try {
            data = (jsonwebtoken_1.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET));
        }
        catch (_b) {
            return next();
        }
        const user = yield prisma_1.prisma.user.findFirst({ where: { id: data.userId } });
        if (!user || user.tokenVersion !== data.tokenVersion) {
            return next();
        }
        const tokens = createTokens_1.createTokens(user);
        res.setHeader("refresh-token", tokens.refreshToken);
        res.setHeader("access-token", tokens.accessToken);
        req.userId = data.userId;
        next();
    }));
    app.use("/api/auth", google_1.authRouter);
    app.use("/api/posts", post_1.postRouter);
    app.get("/api/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield prisma_1.prisma.user.findFirst({ where: { id: req.userId } })); }));
    app.listen(4000, () => console.log("Server started at port 4000"));
});
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$disconnect();
}));
//# sourceMappingURL=index.js.map