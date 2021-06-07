"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokens = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createTokens = (user) => {
    const refreshToken = jsonwebtoken_1.sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "14d",
    });
    const accessToken = jsonwebtoken_1.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15min",
    });
    return { refreshToken, accessToken };
};
exports.createTokens = createTokens;
//# sourceMappingURL=createTokens.js.map