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
exports.UpvoteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Soundbite_1 = require("../../entities/Soundbite");
const Upvote_1 = require("../../entities/Upvote");
let UpvoteResolver = class UpvoteResolver {
    deleteUpvote(soundbiteId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Upvote_1.Upvote.delete({ soundbiteId, userId: req.user.id });
            yield typeorm_1.getConnection().manager.decrement(Soundbite_1.Soundbite, { id: soundbiteId }, "upvoteCount", 1);
            return true;
        });
    }
    createUpvote(soundbiteId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = typeorm_1.getConnection();
                yield connection.query(`
        insert into public.upvote("soundbiteId", "userId")
        values ($1, $2)
        returning *;
      `, [soundbiteId, req.user.id]);
                yield connection.manager.increment(Soundbite_1.Soundbite, { id: soundbiteId }, "upvoteCount", 1);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("soundbiteId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UpvoteResolver.prototype, "deleteUpvote", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("soundbiteId")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UpvoteResolver.prototype, "createUpvote", null);
UpvoteResolver = __decorate([
    type_graphql_1.Resolver()
], UpvoteResolver);
exports.UpvoteResolver = UpvoteResolver;
//# sourceMappingURL=index.js.map