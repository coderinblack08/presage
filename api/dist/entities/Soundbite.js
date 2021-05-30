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
exports.Soundbite = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Soundbite = class Soundbite extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Soundbite.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Soundbite.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], Soundbite.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", Object)
], Soundbite.prototype, "thumbnail", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Soundbite.prototype, "audio", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(60 * 5),
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Soundbite.prototype, "length", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.soundbites),
    __metadata("design:type", User_1.User)
], Soundbite.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", String)
], Soundbite.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", String)
], Soundbite.prototype, "updatedAt", void 0);
Soundbite = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Soundbite);
exports.Soundbite = Soundbite;
//# sourceMappingURL=Soundbite.js.map