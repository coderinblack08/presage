import { doc, updateDoc } from "@firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { commaSeparatedToList } from "../../lib/commaSeparatedToList";
import { firebase } from "../../lib/firebase";
import { defaultMutationFn } from "../../lib/utils/defaultMutationFn";
import { Article } from "../../types";

export const useUpdateDraftMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      id,
      values,
      setFieldError,
    }: {
      id: string;
      values: any;
      setFieldError: (field: string, message: string | undefined) => void;
    }) => {
      if ("tags" in values) {
        values.tags = commaSeparatedToList(values.tags);
        if (values.tags.length > 5) {
          setFieldError("tags", "Max of 5 tags");
          throw new Error();
        }
      }
      return defaultMutationFn([`/articles/${id}`, values, "PATCH"]);
    },
    {
      onSuccess: ({ id, ...values }) => {
        queryClient.setQueryData<Article>(
          `/articles/${id}`,
          (old) => ({ ...old, ...values } as any)
        );
        if ("title" in values) {
          queryClient.setQueryData<Article[]>(`/articles/drafts`, (old) => {
            return (old || []).map((article) => {
              if (article.id === id) {
                return { ...article, ...values };
              }
              return article;
            });
          });
        }
      },
    }
  );
};
