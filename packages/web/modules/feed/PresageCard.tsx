import { formatDistanceToNow } from "date-fns";
import React from "react";
import Image from "next/image";
import { MdComment, MdMoreVert, MdPlayArrow, MdThumbUp } from "react-icons/md";
import { usePlayerStore } from "../../store/usePlayerSTore";
import { Presage } from "../../types";

interface PresageCardProps {
  presage: Presage;
}

export const PresageCard: React.FC<PresageCardProps> = ({ presage }) => {
  const play = usePlayerStore((x) => x.play);

  return (
    <article className="flex items-start space-x-9" key={presage.id}>
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
                  onClick={() => play(presage)}
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
          <a href="#" className="text-white">
            {presage.user.displayName}
          </a>{" "}
          ·{" "}
          {formatDistanceToNow(new Date(presage.createdAt), {
            addSuffix: true,
          })}
        </div>
        {presage.description && <p className="mt-1">{presage.description}</p>}
        {presage.content && <p className="mt-1">{presage.content}</p>}
        <div className="flex items-center space-x-5 mt-4">
          <button>
            <MdThumbUp className="w-6 h-6" />
          </button>
          <button>
            <MdComment className="w-6 h-6" />
          </button>
          <button>
            <MdMoreVert className="w-6 h-6" />
          </button>
        </div>
      </div>
    </article>
  );
};
