import { doc, getFirestore, updateDoc } from "@firebase/firestore";
import React from "react";
import { useQueryClient } from "react-query";
import { mutate } from "swr";
import { Button } from "../../components/button";
import { Article } from "../../types";

interface PublishProps {
  draft: Article | undefined;
}

export const Publish: React.FC<PublishProps> = ({ draft }) => {
  const queryClient = useQueryClient();

  return (
    <Button
      type="button"
      onClick={async () => {
        try {
          if (draft) {
            await updateDoc(doc(getFirestore(), "articles", draft.id), {
              isPublished: !draft.isPublished,
            } as Partial<Article>);
            const key = `/api/draft/${draft.id}`;
            if (queryClient.getQueryData<Article>(key)) {
              queryClient.setQueryData<Article>(
                key,
                (old) =>
                  ({
                    ...old,
                    isPublished: !old?.isPublished,
                  } as any)
              );
            }
          }
        } catch {}
      }}
      outline
    >
      {draft?.isPublished ? "Unpublish" : "Publish"}
    </Button>
  );
};
