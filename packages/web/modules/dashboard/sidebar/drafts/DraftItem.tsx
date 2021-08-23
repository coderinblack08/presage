import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useMemo } from "react";
import { ArticleFragment } from "../../../../generated/graphql";

interface DraftItemProps {
  draft: ArticleFragment;
}

export const DraftItem: React.FC<DraftItemProps> = ({ draft }) => {
  const {
    query: { id },
    pathname,
  } = useRouter();

  const isOnPath = useMemo(
    () => pathname === "/draft/[id]" && id === draft.id,
    [pathname, id, draft.id]
  );

  return (
    <Link key={draft.id} href={`/draft/${draft.id}`} passHref>
      <a
        className={`flex items-center space-x-3 pl-4 pr-2 py-2 rounded-lg ${
          isOnPath
            ? "bg-[#EEEEEE] text-gray-600"
            : "bg-warmGray-50 text-gray-500"
        }`}
      >
        <div className="rounded-lg bg-white border shadow-sm p-1">
          <svg
            className={isOnPath ? "text-gray-500" : "text-gray-400"}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.25 3.75003V14.25H3.75V3.75003H14.25ZM14.25 2.25003H3.75C2.925 2.25003 2.25 2.92503 2.25 3.75003V14.25C2.25 15.075 2.925 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25V3.75003C15.75 2.92503 15.075 2.25003 14.25 2.25003Z"
              fill="currentColor"
            />
            <path
              d="M10.5 11.25H5.25V9.75003H10.5V11.25ZM12.75 8.25003H5.25V6.75003H12.75V8.25003Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-[13px] truncate">{draft.title}</h3>
      </a>
    </Link>
  );
};
