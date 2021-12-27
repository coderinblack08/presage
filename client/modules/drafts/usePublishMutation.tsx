import { doc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { firebase } from "../../lib/firebase";
import { defaultMutationFn } from "../../lib/utils/defaultMutationFn";
import { Article } from "../../types";

export const usePublishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      return defaultMutationFn([`/articles/${id}/publish`, {}, "POST"]);
    },
    {
      onSuccess: (_, id) => {
        queryClient.setQueryData<Article>(
          `/articles/${id}`,
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
