import { AddOutlined } from "@material-ui/icons";
import React from "react";
import { Button } from "../../../../components/button";
import { useCreateBlankArticleMutation } from "../../../../generated/graphql";

interface EmptyDraftStateProps {
  journalId: string;
}

export const EmptyDraftState: React.FC<EmptyDraftStateProps> = ({
  journalId,
}) => {
  const [, createArticle] = useCreateBlankArticleMutation();

  const newDraft = async () => {
    try {
      await createArticle({
        journalId,
      });
    } catch {}
  };

  return (
    <div className="px-10 py-8">
      <h4 className="font-bold text-gray-700">No Drafts Found</h4>
      <p className="text-gray-500 text-sm mt-1 mb-4 leading-relaxed">
        Feeling ready to start writing? Create a draft and brainstorm.
      </p>
      <Button
        icon={<AddOutlined fontSize="small" className="text-gray-400" />}
        onClick={newDraft}
        size="small"
        outline
      >
        <span className="text-sm text-gray-600">New Draft</span>
      </Button>
    </div>
  );
};
