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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upvote = void 0;
const typeorm_1 = require("typeorm");
const Soundbite_1 = require("./Soundbite");
const User_1 = require("./User");
let Upvote = class Upvote extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Upvote.prototype, "value", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Upvote.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.upvotes),
    __metadata("design:type", User_1.User)
], Upvote.prototype, "user", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Upvote.prototype, "soundbiteId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Soundbite_1.Soundbite, (soundbite) => soundbite.upvotes),
    __metadata("design:type", Soundbite_1.Soundbite)
], Upvote.prototype, "soundbite", void 0);
Upvote = __decorate([
    typeorm_1.Entity()
], Upvote);
exports.Upvote = Upvote;
//# sourceMappingURL=Upvote.js.map