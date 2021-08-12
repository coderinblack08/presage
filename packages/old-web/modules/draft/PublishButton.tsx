import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { useSSRMediaQuery } from "../../lib/hooks/useSSRMediaQuery";
import { mutator } from "../../lib/mutator";
import { Article } from "../../lib/types";
import { useEditorStore } from "./useEditorStore";

interface PublishButtonProps {
  id: string;
}

export const PublishButton: React.FC<PublishButtonProps> = ({ id }) => {
  const { data: draft } = useQuery<Article>(`/articles/draft/${id}`);
  const { mutateAsync } = useMutation(mutator);
  const queryClient = useQueryClient();
  const isValid = useEditorStore((x) => x.isValid);
  const isTabletOrDesktop = useSSRMediaQuery("max-width: 1024px");

  async function updatePublishedCache(published: boolean) {
    queryClient.setQueryData<Article>(
      `/articles/draft/${id}`,
      (old) => ({ ...old, published } as any)
    );
    queryClient.refetchQueries(
      `/articles/drafts?journalId=${draft?.journalId}`
    );
  }

  return (
    <>
      {draft?.published ? (
        <Button
          disabled={!isValid}
          rounded
          size={isTabletOrDesktop ? "small" : "medium"}
          type="button"
          onClick={async () => {
            if (isValid) {
              await mutateAsync([`/articles/unpublish/${id}`, null, "post"], {
                onSuccess: () => updatePublishedCache(false),
              });
            }
          }}
        >
          Unpublish
        </Button>
      ) : (
        <Button
          rounded
          size={isTabletOrDesktop ? "small" : "medium"}
          disabled={!isValid}
          type="button"
          onClick={async () => {
            if (isValid) {
              await mutateAsync([`/articles/publish/${id}`, null, "post"], {
                onSuccess: () => updatePublishedCache(true),
              });
            }
          }}
        >
          Publish
        </Button>
      )}
    </>
  );
};
