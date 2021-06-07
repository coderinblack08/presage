"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = (req, res, next) => {
    if (!req.userId)
        throw new Error("Not authorized");
    next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map