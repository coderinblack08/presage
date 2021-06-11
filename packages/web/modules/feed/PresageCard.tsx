import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { MdComment, MdMoreVert, MdPlayArrow } from "react-icons/md";
import { Presage } from "../../types";
import { LikeButton } from "./LikeButton";
import { PresageCardLeftSide } from "./PresageCardLeftSide";

interface PresageCardProps {
  presage: Presage;
  compact?: boolean;
}

export const PresageCard: React.FC<PresageCardProps> = ({
  presage,
  compact = false,
}) => {
  const router = useRouter();
  const ref = useRef();

  return (
    <a
      onClick={() => {
        if (document.activeElement === ref.current) {
          router.push("/presage/[id]", `/presage/${presage.id}`);
        }
      }}
      className="flex items-start space-x-9 cursor-pointer text-left"
      ref={ref}
      href="#"
    >
      <PresageCardLeftSide presage={presage} />
      <div>
        {presage.title ? <h4 className="text-xl">{presage.title}</h4> : null}
        <div className="text-gray-300 mt-1">
          Published by{" "}
          <Link href="/user/[username]" as={`/user/${presage.user.username}`}>
            <span
              tabIndex={0}
              role="link"
              className="text-white hover:underline"
            >
              {presage.user.displayName}
            </span>
          </Link>{" "}
          ·{" "}
          {formatDistanceToNow(new Date(presage.createdAt), {
            addSuffix: true,
          })}
        </div>
        {presage.description && (
          <p
            className={`mt-1.5 text-gray-200 leading-7 ${
              compact ? "line-clamp-2" : ""
            }`}
          >
            {presage.description}
          </p>
        )}
        {presage.content && <p className="mt-1.5">{presage.content}</p>}
        <div className="flex items-center space-x-5 mt-5">
          <LikeButton presage={presage} compact />
          <button>
            <MdComment className="w-6 h-6" />
          </button>
          <button>
            <MdMoreVert className="w-6 h-6" />
          </button>
        </div>
      </div>
    </a>
  );
};
