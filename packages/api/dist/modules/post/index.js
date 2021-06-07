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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../../lib/prisma");
exports.postRouter = express_1.Router();
exports.postRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.user)
        return next(new Error("not authorized"));
    const { content } = req.body;
    const post = yield prisma_1.prisma.post.create({
        data: {
            user: {
                connect: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
            },
            content,
        },
    });
    res.json(post);
}));
//# sourceMappingURL=index.js.map