import { doc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { firebase } from "../../lib/firebase";
import { Article } from "../../types";

export const usePublishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const current = queryClient.getQueryData<Article>(`/api/draft/${id}`);
      return updateDoc(doc(firebase.db, "articles", id), {
        isPublished: !current?.isPublished,
      });
    },
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData<Article>(
          `/api/draft/${id}`,
          (old) =>
            ({
              ...old,
              isPublished: !old?.isPublished,
            } as Article)
        );
      },
    }
  );
};
