import React from "react";
import { Button } from "../../components/button";
import { ArticleFragment, usePublishMutation } from "../../generated/graphql";

interface PublishProps {
  draft: ArticleFragment | null;
}

export const Publish: React.FC<PublishProps> = ({ draft }) => {
  const [, togglePublishStatus] = usePublishMutation();

  return (
    <Button
      type="button"
      onClick={async () => {
        try {
          if (draft) {
            await togglePublishStatus({ id: draft?.id });
          }
        } catch {}
      }}
      outline
    >
      {draft?.isPublished ? "Unpublish" : "Publish"}
    </Button>
  );
};
