import React from "react";
import { MdPlayArrow } from "react-icons/md";

interface PanelCardProps {
  title: string;
  publisher: string;
  image: string;
  time: string;
}

export const PanelCard: React.FC<PanelCardProps> = ({
  title,
  publisher,
  image,
  time,
}) => {
  return (
    <figure className="flex items-center space-x-5 p-4 bg-gray-800 bg-opacity-60">
      <div className="relative w-16 h-16 overflow-hidden rounded-lg">
        <img src={image} className="w-full h-full object-cover" />
        <button className="absolute right-0 bottom-0 m-1 p-2 bg-black bg-opacity-75 rounded-full">
          <MdPlayArrow />
        </button>
      </div>
      <div className="min-w-0">
        <figcaption className="truncate font-bold">{title}</figcaption>
        <p className="text-gray-300">
          Published by {publisher} · {time}
        </p>
      </div>
    </figure>
  );
};
