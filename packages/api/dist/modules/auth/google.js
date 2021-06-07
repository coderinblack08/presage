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
exports.authRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const random_username_generator_1 = __importDefault(require("random-username-generator"));
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
        if (user) {
            yield prisma_1.prisma.user.update({ where: { id: user.id }, data });
        }
        else {
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
//# sourceMappingURL=google.js.map