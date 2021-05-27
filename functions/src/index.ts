import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const serviceAccount = require("../secrets/presage-2e270-firebase-adminsdk-pfqi7-d7e785b5a9.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const userTrigger = functions.firestore
  .document("/users/{user}")
  .onWrite((change, context) => {
    const data = change.after.data();
    admin.firestore().collection("usernames").doc(data?.username).set({
      uid: data?.uid,
    });
  });
