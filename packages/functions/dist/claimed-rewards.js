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
exports.decrementPoints = void 0;
const functions = __importStar(require("firebase-functions"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const admin_1 = require("./admin");
exports.decrementPoints = functions.firestore
    .document("users/{userId}/claimedRewards/{id}")
    .onCreate(async (snap, context) => {
    // security rules check if the user has enough points
    const userId = context.params.userId;
    const { rewardId } = snap.data();
    const reward = (await admin_1.admin.db.doc(`rewards/${rewardId}`).get()).data();
    let status = "Pending";
    if ((reward === null || reward === void 0 ? void 0 : reward.type) === "Message") {
        status = "Successful";
    }
    if (reward) {
        return admin_1.admin.db
            .doc(`users/${userId}/points/${reward.userId}`)
            .update({
            count: firebase_admin_1.default.firestore.FieldValue.increment(-reward.points),
        })
            .then(() => snap.ref.update({ status }));
    }
    return null;
});
//# sourceMappingURL=claimed-rewards.js.map