import { where } from "firebase/firestore";
import { collectionCache, initFirebaseApp } from "../firebase";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

collectionCache.addQuery("my-journals", ([uid]) => [
  where("userId", "==", uid),
]);

initFirebaseApp(firebaseConfig);
