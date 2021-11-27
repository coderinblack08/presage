import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { defaultMutationFn } from "../../lib/utils/defaultMutationFn";
import { Article } from "../../types";

export const useNewDraftMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(
    async () => {
      return defaultMutationFn(["/articles", {}, "POST"]);
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.setQueryData<Article[]>(
          "/articles/drafts",
          (old) => [data, ...(old || [])] as any
        );
        router.push(`/draft/${data.id}`);
      },
    }
  );
};
