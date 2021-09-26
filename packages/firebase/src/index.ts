/* Most of the code in this folder is a port of swr-firestore */

import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";

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
