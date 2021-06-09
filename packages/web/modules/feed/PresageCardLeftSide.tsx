import React from "react";
import { MdPlayArrow } from "react-icons/md";
import Image from "next/image";
import { usePlayerStore } from "../../store/usePlayerStore";
import { Presage } from "../../types";

interface PresageCardLeftSideProps {
  presage: Presage;
}

export const PresageCardLeftSide: React.FC<PresageCardLeftSideProps> = ({
  presage,
}) => {
  const play = usePlayerStore((x) => x.play);

  return (
    <>
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
    </>
  );
};
