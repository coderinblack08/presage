"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
if (process.env.NODE_ENV === "development") {
    process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
    process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
}
const firebase = firebase_admin_1.default.initializeApp();
exports.admin = {
    auth: firebase.auth(),
    db: firebase.firestore(),
};
exports.admin.db.settings({ ignoreUndefinedProperties: true });
//# sourceMappingURL=admin.js.map