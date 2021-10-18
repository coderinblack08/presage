import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useHasMounted } from "../../lib/hooks/useHasMounted";
import { User } from "../../types";

export const useUser = () => {
  const [authUser, loading] = useAuthState(getAuth());
  const mounted = useHasMounted();
  // const firestore = getFirestore();
  // const [userInfo, setUserInfo] = useState<User | null>(null);

  // useEffect(() => {
  //   if (user) {
  //     getDoc(doc(firestore, `users/${user.uid}`))
  //       .then((userDoc) => setUserInfo(userDoc.data() as User))
  //       .catch((e) => console.error(e));
  //   } else {
  //     setUserInfo(null);
  //   }
  // }, [firestore, user]);

  const { data, isFetching, error } = useQuery<User>("/api/account");
  return {
    ...(mounted && authUser && !loading ? { uid: data?.uid, user: data } : {}),
    loading: isFetching,
    error,
  };
};
