"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundbiteResolver = void 0;
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Soundbite_1 = require("../../entities/Soundbite");
const Upvote_1 = require("../../entities/Upvote");
const createBaseResolver_1 = require("../../lib/createBaseResolver");
const isAuth_1 = require("../../middleware/isAuth");
const SoundbiteArgs_1 = require("./SoundbiteArgs");
const uploadFile_1 = require("./uploadFile");
let SoundbiteResolver = class SoundbiteResolver extends createBaseResolver_1.createBaseResolver("Soundbite", Soundbite_1.Soundbite, { relations: ["user"] }) {
    voteStatus({ id }, { req, upvoteLoader }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user)
                return null;
            const upvote = yield upvoteLoader.load({
                soundbiteId: id,
                userId: req.user.id,
            });
            return upvote ? upvote.value : null;
        });
    }
    createSoundbite(data, audio, thumbnail, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const audioPath = yield uploadFile_1.uploadFile(audio);
            const thumbnailPath = thumbnail ? yield uploadFile_1.uploadFile(thumbnail) : null;
            const soundbite = yield Soundbite_1.Soundbite.create(Object.assign(Object.assign({}, data), { user: req.user, audio: `http://localhost:4000/uploads/${audioPath}`, thumbnail: thumbnail
                    ? `http://localhost:4000/uploads/${thumbnailPath}`
                    : null })).save();
            return soundbite;
        });
    }
    vote(soundbiteId, value, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpvote = value !== -1;
            const realValue = isUpvote ? 1 : -1;
            const userId = req.user.id;
            const conn = typeorm_1.getConnection();
            const upvote = yield Upvote_1.Upvote.findOne({ where: { soundbiteId, userId } });
            if (upvote && upvote.value !== realValue) {
                yield conn.transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
          update upvote
          set value = $1
          where "soundbiteId" = $2 and "userId" = $3;
        `, [realValue, soundbiteId, userId]);
                    yield tm.query(`
          update soundbite
          set points = points + $1
          where id = $2;
        `, [2 * realValue, soundbiteId]);
                }));
            }
            else if (!upvote) {
                yield conn.transaction((tm) => __awaiter(this, void 0, void 0, function* () {
                    yield tm.query(`
          insert into upvote ("userId", "soundbiteId", value)
          values ($1, $2, $3);
        `, [userId, soundbiteId, realValue]);
                    yield tm.query(`
          update soundbite
          set points = points + $1
          where id = $2;
        `, [realValue, soundbiteId]);
                }));
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => type_graphql_1.Int, { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Soundbite_1.Soundbite, Object]),
    __metadata("design:returntype", Promise)
], SoundbiteResolver.prototype, "voteStatus", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Soundbite_1.Soundbite),
    __param(0, type_graphql_1.Arg("data", () => SoundbiteArgs_1.SoundbiteArgs)),
    __param(1, type_graphql_1.Arg("audio", () => graphql_upload_1.GraphQLUpload)),
    __param(2, type_graphql_1.Arg("thumbnail", () => graphql_upload_1.GraphQLUpload, { nullable: true })),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SoundbiteArgs_1.SoundbiteArgs, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SoundbiteResolver.prototype, "createSoundbite", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("soundbiteId")),
    __param(1, type_graphql_1.Arg("value", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], SoundbiteResolver.prototype, "vote", null);
SoundbiteResolver = __decorate([
    type_graphql_1.Resolver(() => Soundbite_1.Soundbite)
], SoundbiteResolver);
exports.SoundbiteResolver = SoundbiteResolver;
//# sourceMappingURL=index.js.map