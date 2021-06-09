"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const random_username_generator_1 = __importDefault(require("random-username-generator"));
const yup = __importStar(require("yup"));
const prisma_1 = require("../../lib/prisma");
const createTokens_1 = require("./createTokens");
exports.authRouter = express_1.Router();
const strategy = new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
}, (_, __, { id, displayName, photos, emails }, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = emails ? emails[0].value : null;
        const photo = photos ? photos[0].value : null;
        let user = yield prisma_1.prisma.user.findFirst({ where: { googleId: id } });
        const data = {
            username: random_username_generator_1.default.generate(),
            displayName: displayName,
            googleId: id,
            email: email,
            profilePicture: photo,
        };
        if (!user) {
            user = yield prisma_1.prisma.user.create({ data });
        }
        return done(null, createTokens_1.createTokens(user));
    }
    catch (error) {
        return done(error, undefined);
    }
}));
passport_1.default.use(strategy);
exports.authRouter.get("/google", passport_1.default.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: false,
}));
exports.authRouter.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
}), (req, res) => {
    res.redirect(`${process.env.AUTH_REDIRECT_URL}/?access_token=${req.user.accessToken}&refresh_token=${req.user.refreshToken}`);
});
exports.authRouter.get("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.prisma.user.findFirst({ where: { username: req.params.username } }));
}));
exports.authRouter.patch("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, displayName, bio } = req.body;
    const userSchema = yup.object().shape({
        username: yup
            .string()
            .strip()
            .max(16)
            .matches(/^\w+$/, "Alphanumeric values only")
            .nullable(),
        displayName: yup.string().trim().max(50).nullable(),
        bio: yup.string().max(100).nullable(),
    });
    try {
        yield userSchema.validate(req.body);
    }
    catch (error) {
        next(new Error(error));
    }
    const user = yield prisma_1.prisma.user.update({
        where: { id: req.userId },
        data: {
            username: username || undefined,
            displayName: displayName || undefined,
            bio: bio || undefined,
        },
    });
    res.json(user);
}));
//# sourceMappingURL=google.js.map