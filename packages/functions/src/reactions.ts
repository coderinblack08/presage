import firebaseAdmin from "firebase-admin";
import * as functions from "firebase-functions";
import { admin } from "./admin";

export const incrementReactionCount = functions.firestore
  .document("/reactions/{reactionId}")
  .onCreate((snap) => {
    const updates: Record<string, FirebaseFirestore.FieldValue> = {};
    const data = snap.data();

    if (data.liked) {
      updates.likeCount = firebaseAdmin.firestore.FieldValue.increment(1);
    }

    if (data.bookmarked) {
      updates.bookmarkCount = firebaseAdmin.firestore.FieldValue.increment(1);
    }

    return admin.db.doc(`/articles/${data.articleId}`).update(updates);
  });

export const updateReactionCount = functions.firestore
  .document("/reactions/{reactionId}")
  .onUpdate((changes) => {
    const updates: Record<string, FirebaseFirestore.FieldValue> = {};
    const before = changes.before.data();
    const after = changes.after.data();

    const keyDict: Record<string, string> = {
      like: "liked",
      bookmark: "bookmarked",
    };

    for (const key of ["bookmark", "like"]) {
      if (before[keyDict[key]] && after[keyDict[key]] === false) {
        updates[`${key}Count`] =
          firebaseAdmin.firestore.FieldValue.increment(-1);
      }

      if (
        (before[keyDict[key]] === false ||
          before[keyDict[key]] === undefined) &&
        after[keyDict[key]]
      ) {
        updates[`${key}Count`] =
          firebaseAdmin.firestore.FieldValue.increment(1);
      }
    }

    console.log(before, after);

    return admin.db.doc(`/articles/${after.articleId}`).update(updates);
  });
