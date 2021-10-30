import * as functions from "firebase-functions";
import firebaseAdmin from "firebase-admin";
import { admin } from "./admin";

export const decrementPoints = functions.firestore
  .document("users/{userId}/claimedRewards/{id}")
  .onCreate(async (snap, context) => {
    // security rules check if the user has enough points
    const userId = context.params.userId;
    const { rewardId } = snap.data();
    const reward = (await admin.db.doc(`rewards/${rewardId}`).get()).data();
    let status = "Pending";
    if (reward?.type === "Message") {
      status = "Successful";
    }
    if (reward) {
      return admin.db
        .doc(`users/${userId}/points/${reward.userId}`)
        .update({
          count: firebaseAdmin.firestore.FieldValue.increment(-reward.points),
        })
        .then(() => snap.ref.update({ status }));
    }
    return null;
  });
