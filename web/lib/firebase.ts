import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

export const initFirebaseApp = (options: FirebaseOptions, emulate = false) => {
  const app = initializeApp(options);

  if (emulate) {
    const db = getFirestore();
    connectFirestoreEmulator(db, "localhost", 8080);

    const auth = getAuth();
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });

    const storage = getStorage();
    connectStorageEmulator(storage, "localhost", 9199);
  }

  return app;
};

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

if (getApps().length === 0) {
  initFirebaseApp(firebaseConfig);
}

export const firebase = {
  db: getFirestore(),
  auth: getAuth(),
  storage: getStorage(),
};
