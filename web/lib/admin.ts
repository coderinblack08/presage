import { v4 as uuid } from "uuid";
import firebaseAdmin from "firebase-admin";

if (process.env.NODE_ENV === "development") {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
}

const firebase = firebaseAdmin.initializeApp(
  {
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      privateKey: (process.env.FIREBASE_ADMIN_KEY || "").replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    }),
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    serviceAccountId: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    databaseAuthVariableOverride: { uid: "server" },
  },
  uuid()
);

export const admin = {
  auth: firebase.auth(),
  db: firebase.firestore(),
};

admin.db.settings({ ignoreUndefinedProperties: true });
