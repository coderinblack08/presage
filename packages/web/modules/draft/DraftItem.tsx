import Link from "next/link";
import React from "react";
import { Article } from "../../lib/types";
import { Tags } from "../article/Tags";

interface DraftItemProps {
  draft: Article;
}

export const DraftItem: React.FC<DraftItemProps> = ({ draft }) => {
  return (
    <Link href="/draft/[id]" as={`/draft/${draft.id}`} passHref>
      <a className="block p-6 rounded-lg bg-white shadow focus-visible:ring focus:outline-none">
        <h4>{draft.title}</h4>
        <div className="text-gray-600">
          Edited 3 days ago
          {draft.tags ? (draft.tags.length ? " · " : "") : ""}
          <Tags article={draft} />
        </div>
      </a>
    </Link>
  );
};
