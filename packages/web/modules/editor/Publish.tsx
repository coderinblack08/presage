import { doc, getFirestore, updateDoc } from "@firebase/firestore";
import React from "react";
import { mutate } from "swr";
import { Button } from "../../components/button";
import { ArticleFragment } from "../../generated/graphql";
import { Article } from "../../types";

interface PublishProps {
  draft: ArticleFragment | null;
}

export const Publish: React.FC<PublishProps> = ({ draft }) => {
  return (
    <Button
      type="button"
      onClick={async () => {
        try {
          if (draft) {
            await updateDoc(doc(getFirestore(), "articles", draft.id), {
              isPublished: !draft.isPublished,
            } as Partial<Article>);
            mutate(`/api/draft/${draft.id}`, (old: Article) => ({
              ...old,
              isPublished: !old.isPublished,
            }));
          }
        } catch {}
      }}
      outline
    >
      {draft?.isPublished ? "Unpublish" : "Publish"}
    </Button>
  );
};
