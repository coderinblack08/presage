import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { MdComment, MdMoreVert, MdPlayArrow } from "react-icons/md";
import { usePlayerStore } from "../../store/usePlayerStore";
import { Presage } from "../../types";
import { LikeButton } from "./LikeButton";

interface PresageCardProps {
  presage: Presage;
}

export const PresageCard: React.FC<PresageCardProps> = ({ presage }) => {
  const play = usePlayerStore((x) => x.play);
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
      {presage.type === "audio" && (
        <>
          {presage.thumbnail ? (
            <div className="flex-shrink-0 relative w-36 h-36 rounded-lg overflow-hidden">
              <img
                src={presage.thumbnail}
                alt={presage.title}
                className="object-cover w-full h-full"
              />
              <div className="flex items-center justify-center absolute inset-0">
                <button
                  className="bg-gray-800 bg-opacity-85 backdrop-filter backdrop-blur-lg p-2.5 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    play(presage);
                  }}
                >
                  <MdPlayArrow className="text-white w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            <button
              className="bg-gray-700 p-2.5 rounded-full"
              onClick={() => play(presage)}
            >
              <MdPlayArrow className="text-white w-6 h-6" />
            </button>
          )}
        </>
      )}
      {presage.type === "text" && presage.user.profilePicture ? (
        <Image
          className={`flex-shrink-0 rounded-full`}
          src={presage.user.profilePicture}
          alt={presage.title}
          height={80}
          width={80}
        />
      ) : null}
      <div>
        {presage.title ? <h4 className="text-xl">{presage.title}</h4> : null}
        <div className="text-gray-300 mt-1">
          Published by{" "}
          <span tabIndex={0} role="link" className="text-white">
            {presage.user.displayName}
          </span>{" "}
          ·{" "}
          {formatDistanceToNow(new Date(presage.createdAt), {
            addSuffix: true,
          })}
        </div>
        {presage.description && <p className="mt-2">{presage.description}</p>}
        {presage.content && <p className="mt-2">{presage.content}</p>}
        <div className="flex items-center space-x-5 mt-4">
          <LikeButton presage={presage} />
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
