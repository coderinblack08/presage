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
const fs_1 = require("fs");
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const uuid_1 = require("uuid");
const get_audio_duration_1 = require("get-audio-duration");
const constants_1 = require("../../constants");
const Soundbite_1 = require("../../entities/Soundbite");
const createBaseResolver_1 = require("../../lib/createBaseResolver");
const SoundbiteArgs_1 = require("./SoundbiteArgs");
let SoundbiteResolver = class SoundbiteResolver extends createBaseResolver_1.createBaseResolver("Soundbite", Soundbite_1.Soundbite) {
    createSoundbite(data, audio, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const audioPath = `${audio.filename}-${uuid_1.v4()}`;
            if (!constants_1.__prod__) {
                yield new Promise((resolve, reject) => audio
                    .createReadStream()
                    .pipe(fs_1.createWriteStream(`${__dirname}/../../../uploads/${audioPath}`))
                    .on("finish", () => resolve(true))
                    .on("error", () => reject(false)));
            }
            const length = yield get_audio_duration_1.getAudioDurationInSeconds(audio.createReadStream());
            const soundbite = yield Soundbite_1.Soundbite.create(Object.assign(Object.assign({}, data), { length, user: req.user, audio: `http://localhost:4000/uploads/${audioPath}` })).save();
            return soundbite;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Soundbite_1.Soundbite),
    __param(0, type_graphql_1.Arg("data", () => SoundbiteArgs_1.SoundbiteArgs)),
    __param(1, type_graphql_1.Arg("audio", () => graphql_upload_1.GraphQLUpload)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SoundbiteArgs_1.SoundbiteArgs, Object, Object]),
    __metadata("design:returntype", Promise)
], SoundbiteResolver.prototype, "createSoundbite", null);
SoundbiteResolver = __decorate([
    type_graphql_1.Resolver()
], SoundbiteResolver);
exports.SoundbiteResolver = SoundbiteResolver;
//# sourceMappingURL=index.js.map