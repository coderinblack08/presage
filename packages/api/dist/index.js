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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const posix_1 = require("path/posix");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const constants_1 = require("./lib/constants");
const isAuth_1 = require("./lib/isAuth");
const prisma_1 = require("./lib/prisma");
const google_1 = require("./modules/auth/google");
const presage_1 = require("./modules/presage");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        database: "presagedb",
        entities: [posix_1.join(__dirname, "./entity/*")],
        migrations: [posix_1.join(__dirname, "./migrations/*")],
        logging: constants_1.isDev(),
        synchronize: constants_1.isDev(),
    });
    yield conn.runMigrations();
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
    app.use("/uploads", express_1.default.static(posix_1.join(__dirname, "../uploads")));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    passport_1.default.serializeUser((user, done) => {
        done(null, user.accessToken);
    });
    app.use("/api/auth", google_1.authRouter);
    app.use("/api/presage", presage_1.presageRouter);
    app.get("/api/me", isAuth_1.isAuth(), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(req.userId ? yield User_1.User.findOne(req.userId) : null); }));
    app.listen(4000, () => console.log("Server started at port 4000"));
});
main()
    .catch(console.error)
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$disconnect();
}));
process.on("SIGINT", () => process.exit());
//# sourceMappingURL=index.js.map