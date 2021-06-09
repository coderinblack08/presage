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
exports.presageRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const yup = __importStar(require("yup"));
const isAuth_1 = require("../../lib/isAuth");
const prisma_1 = require("../../lib/prisma");
const fileTypeValidation_1 = require("./fileTypeValidation");
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
    var _a, _b;
    console.log(req.body);
    const nullType = yup.string().nullable().oneOf([null, undefined]);
    const presageSchema = yup.object().shape({
        type: yup.string().oneOf(["audio", "text"]).required(),
        title: yup.string().when("type", {
            is: "audio",
            then: yup.string().max(100).required(),
            otherwise: nullType,
        }),
        description: yup.string().when("type", {
            is: "audio",
            then: yup.string().max(500).nullable(),
            otherwise: nullType,
        }),
        content: yup.string().when("type", {
            is: "text",
            then: yup.string().max(500).required(),
            otherwise: nullType,
        }),
    });
    try {
        yield presageSchema.validate(req.body);
    }
    catch (error) {
        return next(new Error(error));
    }
    const { type, title, description, content } = req.body;
    const files = req.files;
    if (type === "audio" && !("audio" in files)) {
        return next(new Error("Please provide an audio file"));
    }
    const audio = ((_a = files === null || files === void 0 ? void 0 : files.audio) === null || _a === void 0 ? void 0 : _a.length)
        ? `http://localhost:4000/uploads/${files.audio[0].filename}`
        : null;
    const thumbnail = ((_b = files === null || files === void 0 ? void 0 : files.thumbnail) === null || _b === void 0 ? void 0 : _b.length)
        ? `http://localhost:4000/uploads/${files.thumbnail[0].filename}`
        : null;
    const presage = yield prisma_1.prisma.presage.create({
        data: {
            audio,
            thumbnail,
            type,
            title,
            content,
            description,
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
    json_build_object(
      'id', u.id,
      'username', u.username,
      'profilePicture', u."profilePicture",
      'displayName', u."displayName",
      'updatedAt', u."updatedAt",
      'createdAt', u."createdAt"
    ) as user
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