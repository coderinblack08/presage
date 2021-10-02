import { FirebaseOptions, initializeApp } from "firebase/app";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  where,
} from "firebase/firestore";
import { collectionCache } from "../firebase";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export const initFirebaseApp = (options: FirebaseOptions) => {
  const app = initializeApp(options);

  const db = getFirestore();
  connectFirestoreEmulator(db, "localhost", 8080);

  const auth = getAuth();
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });

  const storage = getStorage();
  connectStorageEmulator(storage, "localhost", 9199);

  return app;
};

collectionCache.addQuery("my-journals", ([uid]) => [
  where("userId", "==", uid),
]);

initFirebaseApp(firebaseConfig);
