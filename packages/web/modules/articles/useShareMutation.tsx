import {
  collection,
  getFirestore,
  serverTimestamp,
  addDoc,
  doc,
  setDoc,
} from "@firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { Article, Referral } from "../../types";
import { useUser } from "../authentication/useUser";

export const useShareMutation = () => {
  const { uid } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (article: Article) => {
      const ref = collection(getFirestore(), "referrals");
      const data = {
        userId: uid,
        articleId: article.id,
        authorId: article.userId,
        claimCount: 0,
        createdAt: serverTimestamp(),
      };
      const { id } = await addDoc(ref, data);
      const reactionRef = doc(
        getFirestore(),
        "reactions",
        `${uid}-${article.id}`
      );
      const values = { userId: uid, articleId: article.id };
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
