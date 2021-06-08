import React from "react";
import {
  MdComment,
  MdPlayArrow,
  MdPlaylistAdd,
  MdThumbUp,
} from "react-icons/md";
import { Presage } from "../../types";

interface PresageCardProps {
  presage: Presage;
}

export const PresageCard: React.FC<PresageCardProps> = ({ presage }) => {
  return (
    <article className="flex items-start space-x-9" key={presage.id}>
      {presage.thumbnail && (
        <div className="flex-shrink-0 relative w-36 h-36 rounded-lg overflow-hidden">
          <img
            src={presage.thumbnail}
            alt={presage.title}
            className="w-full h-full object-cover"
          />
          <div className="flex items-center justify-center absolute inset-0">
            <button className="bg-gray-800 bg-opacity-85 backdrop-filter backdrop-blur-lg p-2.5 rounded-full">
              <MdPlayArrow className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      {presage.type === "text" && presage.user.profilePicture ? (
        <img
          src={presage.user.profilePicture}
          alt={presage.title}
          className={`flex-shrink-0 w-20 h-20 object-cover rounded-full`}
        />
      ) : null}
      <div>
        {presage.title ? <h4 className="text-xl">{presage.title}</h4> : null}
        <div className="text-gray-300 mt-1">
          Published by{" "}
          <a href="#" className="text-white">
            {presage.user.displayName}
          </a>{" "}
          · {presage.createdAt}
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
            <MdPlaylistAdd className="w-7 h-7" />
          </button>
        </div>
      </div>
    </article>
  );
};
