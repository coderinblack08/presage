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
exports.presageRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const get_audio_duration_1 = require("get-audio-duration");
const isAuth_1 = require("../../lib/isAuth");
const prisma_1 = require("../../lib/prisma");
const fetchFileUrl_1 = require("./fetchFileUrl");
const fileTypeValidation_1 = require("./fileTypeValidation");
const presageSchema_1 = require("./presageSchema");
exports.presageRouter = express_1.Router();
const upload = multer_1.default({
    dest: path_1.join(__dirname, "../../../uploads"),
    limits: { fileSize: 5e6 },
    fileFilter(_, file, cb) {
        fileTypeValidation_1.fileTypeValidation("image", "thumbnail", file, cb);
        fileTypeValidation_1.fileTypeValidation("audio", "audio", file, cb);
    },
});
const presageUpload = upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "audio", maxCount: 1 },
]);
exports.presageRouter.post("/", isAuth_1.isAuth, presageUpload, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield presageSchema_1.presageSchema.validate(req.body);
    }
    catch (error) {
        return next(new Error(error));
    }
    const { type, title, description, content, parentId } = req.body;
    const files = req.files;
    if (type === "audio" && !("audio" in files)) {
        return next(new Error("Please provide an audio file"));
    }
    const audio = fetchFileUrl_1.fetchFileUrl(files, "audio");
    const thumbnail = fetchFileUrl_1.fetchFileUrl(files, "thumbnail");
    const duration = type === "audio"
        ? yield get_audio_duration_1.getAudioDurationInSeconds(files["audio"][0].path)
        : null;
    const presage = yield prisma_1.prisma.presage.create({
        data: {
            audio,
            thumbnail,
            type,
            title,
            content,
            description,
            duration,
            parent: {
                connect: { id: parentId },
            },
            user: {
                connect: { id: req.userId },
            },
        },
    });
    res.json(presage);
}));
exports.presageRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10 } = req.query;
    const presages = yield prisma_1.prisma.$queryRaw `
    select p.*,
    (case when 
      exists (
        select * from "Like" l
        where l."userId" = ${req.userId} and l."presageId" = p.id
      ) 
      then true else false
    end) as liked,
    to_jsonb(u) as user
    from "Presage" p
    left join "User" u on p."userId" = u.id
    order by p."createdAt" desc
    limit ${limit};
  `;
    res.json(presages);
}));
exports.presageRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const presage = yield prisma_1.prisma.presage.findFirst({
        where: { id: req.params.id },
        include: {
            user: true,
        },
    });
    const like = yield prisma_1.prisma.like.findFirst({
        where: { userId: req.userId, presageId: req.params.id },
    });
    res.json(Object.assign(Object.assign({}, presage), { liked: like !== null }));
}));
exports.presageRouter.post("/like", isAuth_1.isAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const like = yield prisma_1.prisma.like.findFirst({
        where: { userId: req.userId, presageId: id },
    });
    try {
        const [, presage] = yield prisma_1.prisma.$transaction([
            like
                ? prisma_1.prisma.like.delete({
                    where: { presageId_userId: { presageId: id, userId: req.userId } },
                })
                : prisma_1.prisma.like.create({
                    data: {
                        presage: { connect: { id } },
                        user: { connect: { id: req.userId } },
                    },
                }),
            prisma_1.prisma.$executeRaw `update "Presage" set likes = likes + ${like ? -1 : 1} where id = ${id} returning *;`,
        ]);
        res.json(presage);
    }
    catch (error) {
        next(new Error(error));
    }
}));
//# sourceMappingURL=index.js.map