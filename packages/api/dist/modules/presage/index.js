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
const mm = __importStar(require("music-metadata"));
const path_1 = require("path");
const posix_1 = __importDefault(require("path/posix"));
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Like_1 = require("../../entity/Like");
const Presage_1 = require("../../entity/Presage");
const isAuth_1 = require("../../lib/isAuth");
const fileTypeValidation_1 = require("./fileTypeValidation");
const presageSchema_1 = require("./presageSchema");
exports.presageRouter = express_1.Router();
const upload = multer_1.default({
    dest: path_1.join(__dirname, "../../../uploads"),
    fileFilter: (_, file, cb) => {
        fileTypeValidation_1.fileTypeValidation("audio", "audio", file, cb);
        fileTypeValidation_1.fileTypeValidation("image", "thumbnail", file, cb);
    },
});
function getSingleFile(files, field) {
    if (files && field in files) {
        return files[field][0];
    }
    return null;
}
exports.presageRouter.post("/", isAuth_1.isAuth(true), upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield presageSchema_1.presageSchema.validate(req.body);
    }
    catch (error) {
        return next(new Error(error));
    }
    const { type, title, description, content, parentId } = req.body;
    let duration = null;
    try {
        const audioFile = getSingleFile(req.files, "audio");
        const metadata = audioFile
            ? yield mm.parseFile(audioFile.path, {
                duration: true,
            })
            : null;
        duration = (metadata === null || metadata === void 0 ? void 0 : metadata.format.duration)
            ? Math.floor(metadata.format.duration) || null
            : null;
    }
    catch (error) {
        console.error(error.message);
    }
    function fileURL(field) {
        const file = getSingleFile(req.files, field);
        return file
            ? `http://localhost:4000/uploads/${posix_1.default.basename(file.path)}`
            : null;
    }
    const parent = parentId ? yield Presage_1.Presage.findOne(parentId) : null;
    const id = uuid_1.v4();
    const data = {
        id,
        type,
        title,
        description,
        content,
        audio: fileURL("audio"),
        thumbnail: fileURL("thumbnail"),
        duration,
        userId: req.userId,
        path: parent ? [...parent.path, id] : [id],
    };
    const presage = yield Presage_1.Presage.create(data).save();
    res.json(presage);
}));
exports.presageRouter.get("/", isAuth_1.isAuth(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10 } = req.query;
    const params = [limit];
    if (req.userId)
        params.push(req.userId);
    const presages = yield typeorm_1.getConnection().query(`
    select p.*,
    ${req.userId
        ? `(case when 
        exists (
          select * from public.like l
          where l."userId" = $2 and l."presageId" = p.id
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
    where array_length(p.path, 1) = 1
    order by p."createdAt" desc
    limit $1;
  `, params);
    res.json(presages);
}));
exports.presageRouter.get("/:id", isAuth_1.isAuth(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = [req.params.id];
    if (req.userId)
        params.push(req.userId);
    let data = yield typeorm_1.getConnection().query(`
    select 
    p.*,
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
    where path && array[$1];
  `, params);
    const tree = Object.assign(Object.assign({}, data[0]), { children: [] });
    data = data.sort((a, b) => a.path.length - b.path.length);
    for (const node of data.slice(1)) {
        const depth = node.path.length - 2;
        let treeNode = tree;
        for (let k = 0; k < depth; k++) {
            treeNode = treeNode.children.find((x) => x.id === node.path[k + 1]);
        }
        treeNode.children.push(Object.assign(Object.assign({}, node), { children: [] }));
    }
    res.json({ tree });
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