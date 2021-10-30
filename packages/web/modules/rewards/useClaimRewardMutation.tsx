import {
  addDoc,
  collection,
  FieldValue,
  getFirestore,
} from "@firebase/firestore";
import { useMutation } from "react-query";
import { useUser } from "../authentication/useUser";

export const useClaimRewardMutation = () => {
  const { uid } = useUser();
  const mutation = useMutation(
    async (values: { rewardId: string; createdAt: FieldValue }) => {
      const firestore = getFirestore();
      const ref = collection(firestore, "users", uid!, "claimedRewards");
      await addDoc(ref, values);
    }
  );
  return mutation;
};
