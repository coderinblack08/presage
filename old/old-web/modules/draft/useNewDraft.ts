import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";

export const useNewDraft = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync } = useMutation(mutator);

  const newDraft = async (journalId: string | null) => {
    await mutateAsync(["/articles", { journalId }, "post"], {
      onSuccess: (data: Article) => {
        queryClient.refetchQueries(`/articles/drafts?journalId=${journalId}`);
        router.push(`/draft/[id]`, `/draft/${data.id}`);
      },
    });
  };

  return newDraft;
};
