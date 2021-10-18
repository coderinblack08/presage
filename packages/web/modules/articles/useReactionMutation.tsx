import { doc, getFirestore, setDoc } from "@firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { Article } from "../../types";
import { useUser } from "../authentication/useUser";

const table: Record<string, "liked" | "bookmarked"> = {
  like: "liked",
  bookmark: "bookmarked",
};

export const useReactionMutation = () => {
  const { uid } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({
      values,
      type,
    }: {
      values: {
        userId: string | undefined;
        articleId: string | undefined;
        liked?: boolean;
        bookmarked?: boolean;
      };
      type: "like" | "bookmark";
    }) => {
      const ref = doc(
        getFirestore(),
        "reactions",
        `${uid}-${values.articleId}`
      );
      const pastTense = table[type];
      const reactionExists = queryClient.getQueryData<boolean>(
        `/api/article/${values.articleId}/is-reaction?type=${pastTense}`
      );
      console.log(reactionExists);
      if (reactionExists) {
        await setDoc(ref, { ...values, [pastTense]: false }, { merge: true });
        return { type, ...values, [pastTense]: false };
      } else {
        await setDoc(ref, { ...values, [pastTense]: true }, { merge: true });
        return { type, ...values, [pastTense]: true };
      }
    },
    {
      onSuccess: (data) => {
        let key = `/api/article/${data.articleId}`;
        const pastTense = table[data.type];
        if (queryClient.getQueryData<Article>(key)) {
          queryClient.setQueryData<Article>(key, (old) =>
            old
              ? {
                  ...old,
                  [`${data.type}Count`]:
                    (old[`${data.type}Count`] || 0) +
                    (data[pastTense] ? 1 : -1),
                }
              : (undefined as any)
          );
        }
        key = `/api/article/${data.articleId}/is-reaction?type=${pastTense}`;
        queryClient.setQueryData(key, data[pastTense]);
      },
    }
  );
  return mutation;
};
