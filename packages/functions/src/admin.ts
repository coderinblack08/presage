import firebaseAdmin from "firebase-admin";

if (process.env.NODE_ENV === "development") {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
}

const firebase = firebaseAdmin.initializeApp();

export const admin = {
  auth: firebase.auth(),
  db: firebase.firestore(),
};

admin.db.settings({ ignoreUndefinedProperties: true });
