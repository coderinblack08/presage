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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const google_1 = require("./modules/auth/google");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./lib/constants");
const helmet_1 = __importDefault(require("helmet"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient();
    const app = express_1.default();
    app.use(helmet_1.default());
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
    passport_1.default.serializeUser((user, done) => done(null, user.id));
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () { return done(null, id); }));
    app.use("/api/auth", google_1.authRouter);
    app.listen(4000, () => console.log("Server started at port 3000"));
});
main().catch((e) => console.error(e));
//# sourceMappingURL=index.js.map