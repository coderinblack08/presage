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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseResolver = void 0;
const type_graphql_1 = require("type-graphql");
const createBaseResolver = (suffix, entity) => {
    let BaseResolver = class BaseResolver {
        get(id) {
            return entity.findOne(id);
        }
        paginate(limit, offset) {
            return entity.find({ skip: offset, take: limit });
        }
    };
    __decorate([
        type_graphql_1.Query(() => entity, { name: `get${suffix}` }),
        __param(0, type_graphql_1.Arg("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], BaseResolver.prototype, "get", null);
    __decorate([
        type_graphql_1.Query(() => [entity], {
            name: `paginate${suffix}s`,
            complexity: ({ args }) => args.limit,
        }),
        __param(0, type_graphql_1.Arg("limit")),
        __param(1, type_graphql_1.Arg("offset", { defaultValue: 0 })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", void 0)
    ], BaseResolver.prototype, "paginate", null);
    BaseResolver = __decorate([
        type_graphql_1.Resolver({ isAbstract: true })
    ], BaseResolver);
    return BaseResolver;
};
exports.createBaseResolver = createBaseResolver;
//# sourceMappingURL=createBaseResolver.js.map