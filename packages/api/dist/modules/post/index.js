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
const isAuth_1 = require("../../lib/isAuth");
const prisma_1 = require("../../lib/prisma");
exports.postRouter = express_1.Router();
exports.postRouter.post("/", isAuth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const post = yield prisma_1.prisma.post.create({
        data: {
            user: {
                connect: { id: req.userId },
            },
            content,
        },
    });
    res.json(post);
}));
exports.postRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10 } = req.query;
    const posts = yield prisma_1.prisma.post.findMany({
        take: parseInt(limit === null || limit === void 0 ? void 0 : limit.toString()),
        include: {
            user: true,
        },
    });
    res.json(posts);
}));
exports.postRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prisma_1.prisma.post.findFirst({
        where: { id: req.params.id },
        include: {
            user: true,
        },
    });
    res.json(post);
}));
//# sourceMappingURL=index.js.map