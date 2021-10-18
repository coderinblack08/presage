import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import Router from "next/router";
import { User } from "../../types";
import { generateUsername } from "./generateUsername";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
provider.addScope("https://www.googleapis.com/auth/userinfo.email");

export const login = async () => {
  const auth = getAuth();
  const firestore = getFirestore();
  const { user } = await signInWithPopup(auth, provider);
  const newUser = user.metadata.creationTime === user.metadata.lastSignInTime;
  if (newUser) {
    const username = generateUsername();
    await setDoc(doc(firestore, "users", user.uid), {
      displayName: user.displayName,
      profilePicture: user.photoURL,
      username,
      createdAt: serverTimestamp(),
    } as User);
    await setDoc(doc(firestore, "emails", user.uid), { email: user.email });
    await setDoc(doc(firestore, "usernames", username), { uid: user.uid });
  }
  const token = await getAuth().currentUser?.getIdToken();
  if (token) {
    await axios.post("/api/login", {}, { headers: { Authorization: token } });
  }
  Router.push("/dashboard");
};
