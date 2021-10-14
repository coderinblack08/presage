import * as functions from "firebase-functions";
import firebaseAdmin from "firebase-admin";

export const replyCounter = functions.firestore
  .document("{path=**}/comments/{commentId}")
  .onCreate((snapshot, context) => {
    const parentRef = snapshot.ref.parent.parent;
    if (parentRef?.path.includes("comments")) {
      return parentRef.update({
        replyCount: firebaseAdmin.firestore.FieldValue.increment(1),
      });
    }
    return null;
  });
