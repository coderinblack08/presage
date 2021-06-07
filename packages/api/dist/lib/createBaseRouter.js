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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseRouter = void 0;
const express_1 = require("express");
function createBaseRouter(entity) {
    const router = express_1.Router();
    router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { limit = 10 } = req.query;
        const presages = yield entity.findMany({
            take: parseInt(limit === null || limit === void 0 ? void 0 : limit.toString()),
            include: {
                user: true,
            },
        });
        res.json(presages);
    }));
    router.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const presage = yield entity.findFirst({
            where: { id: req.params.id },
            include: {
                user: true,
            },
        });
        res.json(presage);
    }));
}
exports.createBaseRouter = createBaseRouter;
//# sourceMappingURL=createBaseRouter.js.map