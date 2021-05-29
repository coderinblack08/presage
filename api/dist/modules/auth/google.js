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
const random_username_generator_1 = __importDefault(require("random-username-generator"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const User_1 = require("../../entities/User");
exports.authRouter = express_1.Router();
const strategy = new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
}, (_, __, { id, displayName, photos, emails }, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield User_1.User.findOne({ where: { googleId: id } })) || User_1.User.create();
        const email = emails ? emails[0].value : null;
        const photo = photos ? photos[0].value : null;
        if (!user.id) {
            user.username = random_username_generator_1.default.generate();
            user.displayName = displayName;
            user.googleId = id;
            user.email = email;
            user.profilePicture = photo;
        }
        yield user.save();
        return done(null, { id: user.id });
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
    session: true,
}));
exports.authRouter.get("/google/callback", passport_1.default.authenticate("google", {
    successReturnToOrRedirect: "http://localhost:3000",
    session: true,
}));
//# sourceMappingURL=google.js.map