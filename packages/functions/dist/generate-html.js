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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtml = void 0;
const axios_1 = __importDefault(require("axios"));
const functions = __importStar(require("firebase-functions"));
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
const baseURL = process.env.NODE_ENV === "production"
    ? "https://joinpresage.com"
    : "http://localhost:3000";
exports.generateHtml = functions.firestore
    .document("articles/{articleId}")
    .onUpdate(async (change) => {
    var _a, _b;
    const ej1 = (_a = change.before.data()) === null || _a === void 0 ? void 0 : _a.editorJSON;
    const ej2 = (_b = change.after.data()) === null || _b === void 0 ? void 0 : _b.editorJSON;
    console.log(ej1, ej2, lodash_isequal_1.default(ej1, ej2));
    if (lodash_isequal_1.default(ej1, ej2) || !ej2) {
        return null;
    }
    const html = (await axios_1.default.post(`${baseURL}/api/generate-html`, {
        editorJSON: ej2,
    })).data;
    console.log(html);
    return change.after.ref.set({
        editorHTML: html,
    }, { merge: true });
});
//# sourceMappingURL=generate-html.js.map