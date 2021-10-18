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
exports.updateReactionCount = exports.incrementReactionCount = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const functions = __importStar(require("firebase-functions"));
const admin_1 = require("./admin");
exports.incrementReactionCount = functions.firestore
    .document("/reactions/{reactionId}")
    .onCreate((snap) => {
    const updates = {};
    const data = snap.data();
    if (data.liked) {
        updates.likeCount = firebase_admin_1.default.firestore.FieldValue.increment(1);
    }
    if (data.shared) {
        updates.shareCount = firebase_admin_1.default.firestore.FieldValue.increment(1);
    }
    if (data.bookmarked) {
        updates.bookmarkCount = firebase_admin_1.default.firestore.FieldValue.increment(1);
    }
    return admin_1.admin.db.doc(`/articles/${data.articleId}`).update(updates);
});
exports.updateReactionCount = functions.firestore
    .document("/reactions/{reactionId}")
    .onUpdate((changes) => {
    const updates = {};
    const before = changes.before.data();
    const after = changes.after.data();
    const keyDict = {
        like: "liked",
        bookmark: "bookmarked",
        share: "shared",
    };
    for (const key of ["bookmark", "like", "share"]) {
        if (before[keyDict[key]] && after[keyDict[key]] === false) {
            updates[`${key}Count`] =
                firebase_admin_1.default.firestore.FieldValue.increment(-1);
        }
        if ((before[keyDict[key]] === false ||
            before[keyDict[key]] === undefined) &&
            after[keyDict[key]]) {
            updates[`${key}Count`] =
                firebase_admin_1.default.firestore.FieldValue.increment(1);
        }
    }
    console.log(before, after);
    return admin_1.admin.db.doc(`/articles/${after.articleId}`).update(updates);
});
//# sourceMappingURL=reactions.js.map