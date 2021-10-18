import {
  collection,
  getFirestore,
  serverTimestamp,
  addDoc,
  doc,
  setDoc,
} from "@firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { Referral } from "../../types";
import { useUser } from "../authentication/useUser";

export const useShareMutation = () => {
  const { uid } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (articleId: string) => {
      const ref = collection(getFirestore(), "referrals");
      const data = {
        userId: uid,
        articleId,
        claimCount: 0,
        createdAt: serverTimestamp(),
      };
      const { id } = await addDoc(ref, data);
      const reactionRef = doc(
        getFirestore(),
        "reactions",
        `${uid}-${articleId}`
      );
      const values = { userId: uid, articleId };
      await setDoc(reactionRef, { ...values, shared: true }, { merge: true });
      return { ...data, id } as Referral;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(`/api/referrals/${data.articleId}`, data);
      },
    }
  );
  return mutation;
};
