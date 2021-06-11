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
const get_audio_duration_1 = require("get-audio-duration");
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const Like_1 = require("../../entity/Like");
const Presage_1 = require("../../entity/Presage");
const isAuth_1 = require("../../lib/isAuth");
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
exports.presageRouter.post("/", isAuth_1.isAuth(true), presageUpload, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield presageSchema_1.presageSchema.validate(req.body);
    }
    catch (error) {
        return next(new Error(error));
    }
    const { type, title, description, content } = req.body;
    const files = req.files;
    if (type === "audio" && !(files === null || files === void 0 ? void 0 : files.hasOwnProperty("audio"))) {
        return next(new Error("Please provide an audio file"));
    }
    const audio = fetchFileUrl_1.fetchFileUrl(files, "audio");
    const thumbnail = fetchFileUrl_1.fetchFileUrl(files, "thumbnail");
    const duration = type === "audio"
        ? Math.floor(yield get_audio_duration_1.getAudioDurationInSeconds(files["audio"][0].path))
        : null;
    const data = {
        type,
        title,
        description,
        content,
        audio,
        thumbnail,
        duration,
        userId: req.userId,
    };
    const presage = yield Presage_1.Presage.create(data).save();
    res.json(presage);
}));
exports.presageRouter.get("/", isAuth_1.isAuth(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10 } = req.query;
    const presages = yield typeorm_1.getConnection().query(`
    select p.*,
    ${req.userId
        ? `(case when 
        exists (
          select * from public.like l
          where l."userId" = $1 and l."presageId" = p.id
        ) 
        then true else false
       end) as liked,`
        : ""}
    json_build_object(
      'id', u.id,
      'username', u.username,
      'displayName', u."displayName",
      'profilePicture', u."profilePicture",
      'updatedAt', u."updatedAt",
      'createdAt', u."createdAt"
    ) as user
    from presage p
    left join public.user u on p."userId" = u.id
    order by p."createdAt" desc
    limit $2;
  `, [req.userId, limit]);
    res.json(presages);
}));
exports.presageRouter.get("/:id", isAuth_1.isAuth(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const presage = yield Presage_1.Presage.findOne(req.params.id, { relations: ["user"] });
    const like = yield Like_1.Like.findOne({
        where: { userId: req.userId, presageId: req.params.id },
    });
    res.json(Object.assign(Object.assign({}, presage), { liked: like !== undefined }));
}));
exports.presageRouter.post("/like", isAuth_1.isAuth(true), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const data = { presageId: id, userId: req.userId };
    const like = yield Like_1.Like.findOne({ where: data });
    try {
        yield typeorm_1.getConnection().transaction((tm) => __awaiter(void 0, void 0, void 0, function* () {
            if (like) {
                yield tm.delete(Like_1.Like, data);
            }
            else {
                yield tm.create(Like_1.Like, data).save();
            }
            const presage = yield tm.query(`
          update presage
          set points = points + $1
          where id = $2
          returning *;
        `, [like ? -1 : 1, id]);
            res.json(presage);
        }));
    }
    catch (error) {
        next(new Error(error));
    }
}));
//# sourceMappingURL=index.js.map