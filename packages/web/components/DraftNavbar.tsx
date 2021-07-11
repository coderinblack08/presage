import { useRouter } from "next/router";
import React from "react";
import { ArrowLeftSquare } from "react-iconly";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Updater } from "react-query/types/core/utils";
import { mutator } from "../lib/mutator";
import { Article, User } from "../lib/types";
import { DeleteDraftModal } from "../modules/draft/DeleteDraftModal";
import { EditTagModal } from "../modules/draft/EditTagModal";
import { useEditorStore } from "../modules/draft/useEditorStore";
import { Button } from "./Button";
import { NavLink } from "./Navbar";
import { UserDropdown } from "./UserDropdown";

const PublishButtons: React.FC<{ id: string }> = ({ id }) => {
  const { data: draft } = useQuery<Article>(`/articles/draft/${id}`);
  const { mutateAsync } = useMutation(mutator);
  const queryClient = useQueryClient();
  const isValid = useEditorStore((x) => x.isValid);

  async function updatePublishedCache(published: boolean) {
    queryClient.setQueryData<Article>(
      `/articles/draft/${id}`,
      (old) => ({ ...old, published } as any)
    );
    queryClient.refetchQueries("/articles/drafts");
    queryClient.refetchQueries("/articles/published");
  }

  return (
    <>
      {draft?.published ? (
        <Button
          rounded
          disabled={!isValid}
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

interface DraftNavbarProps {
  id: string;
}

export const DraftNavbar: React.FC<DraftNavbarProps> = ({ id }) => {
  const { data: me } = useQuery<User>("/me");
  const router = useRouter();

  return (
    <>
      <div className="flex items-center space-x-4 sm:space-x-6 md:hidden">
        <Button
          size="none"
          color="transparent"
          noAnimate
          onClick={() => router.push("/publish")}
          icon={
            <div className="scale-80">
              <ArrowLeftSquare set="bulk" />
            </div>
          }
        />
        <DeleteDraftModal id={router.query.id as string} noText />
        <EditTagModal id={router.query.id as string} noText />
        <PublishButtons id={router.query.id as string} />
        {me ? <UserDropdown /> : null}
      </div>
      <div className="hidden md:flex items-center space-x-10">
        <NavLink href="/publish" icon={<ArrowLeftSquare set="bulk" />}>
          Go Back
        </NavLink>
        <DeleteDraftModal id={router.query.id as string} />
        <EditTagModal id={router.query.id as string} />
        <PublishButtons id={router.query.id as string} />
        {me ? <UserDropdown /> : null}
      </div>
    </>
  );
};
