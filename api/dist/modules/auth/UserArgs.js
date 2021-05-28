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
exports.UserArgs = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
let UserArgs = class UserArgs {
};
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsOptional(),
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserArgs.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(2, 50),
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserArgs.prototype, "username", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(2, 50),
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserArgs.prototype, "displayName", void 0);
UserArgs = __decorate([
    type_graphql_1.InputType()
], UserArgs);
exports.UserArgs = UserArgs;
//# sourceMappingURL=UserArgs.js.map