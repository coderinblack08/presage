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
const prisma_1 = require("../../lib/prisma");
const fileTypeValidation = (type, field, file, cb) => {
    const types = {
        image: /(gif|jpe?g|tiff?|png|webp|bmp)/,
        audio: /(wav|m4a|mp(3|4)|webm|mpeg)/,
    };
    if (file.fieldname === field) {
        if (file.mimetype.startsWith(type) && types[type].test(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error(`File type for ${field} is not supported`));
        }
    }
};
exports.presageRouter = express_1.Router();
const upload = multer_1.default({
    dest: path_1.join(__dirname, "../../../uploads"),
    limits: { fileSize: 5e6 },
    fileFilter(_, file, cb) {
        fileTypeValidation("image", "thumbnail", file, cb);
        fileTypeValidation("audio", "audio", file, cb);
    },
});
const presageUpload = upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "audio", maxCount: 1 },
]);
exports.presageRouter.post("/", presageUpload, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    if (files.audio.length === 0) {
        return next(new Error("Please provide an audio file"));
    }
    const audio = `http://localhost:4000/uploads/${files.audio[0].filename}`;
    const thumbnail = files.thumbnail.length
        ? `http://localhost:4000/uploads/${files.thumbnail[0].filename}`
        : null;
    const presage = yield prisma_1.prisma.presage.create({
        data: {
            audio,
            thumbnail,
            title: req.body.title,
            description: req.body.description,
            user: {
                connect: { id: req.userId },
            },
        },
    });
    res.json(presage);
}));
//# sourceMappingURL=index.js.map