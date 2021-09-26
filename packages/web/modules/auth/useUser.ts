import { getAuth } from "@firebase/auth";
import { doc, getDoc, getFirestore } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { User } from "../../types";

export const useUser = () => {
  const [user, loading, error] = useAuthState(getAuth());
  const firestore = getFirestore();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      getDoc(doc(firestore, `users/${user.uid}`))
        .then((userDoc) => setUserInfo(userDoc.data() as User))
        .catch((e) => console.error(e));
    } else {
      setUserInfo(null);
    }
  }, [firestore, user]);

  return { uid: user?.uid, user: userInfo, loading, error };
};
