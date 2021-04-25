import { HeartIcon, UploadIcon, ReplyIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";

interface CardProps {
  slug: string;
  tags: string[];
  title: string;
  description: string;
  author: string;
  date: Date;
  image: {
    dimensions: {
      width: number;
      height: number;
    };
    alt: string | null;
    copyright: any;
    url: string;
  };
  expanded: boolean;
}

export const Card: React.FC<CardProps> = ({
  slug,
  tags,
  description,
  image,
  title,
  date,
  expanded = false,
  author,
}) => {
  return (
    <article
      className={`${expanded ? "block w-full lg:max-w-lg" : "flex space-x-4"}`}
    >
      <img
        src={image.url}
        alt={image.alt}
        className={`${
          expanded ? "w-full" : "w-full h-48 sm:w-48 sm:h-28"
        } object-cover rounded-xl`}
      />
      <div className={`${expanded ? "mt-6" : "min-w-0"}`}>
        {expanded ? (
          <h4>{title}</h4>
        ) : (
          <p className="font-bold text-lg">
            {title} <span className="text-gray">— 4/20/21 By</span>{" "}
            <span className="text-primary">{author}</span>
          </p>
        )}
        <p className={`text-light-gray mt-2 ${expanded ? "" : "truncate"}`}>
          {description}
        </p>
        {expanded && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-light-gray">
              January 4, 2021 <span className="text-gray">By</span>{" "}
              <span className="text-primary">Hansel Grimes</span>
            </p>
            <div className="flex items-center space-x-4">
              <button>
                <HeartIcon className="w-6 h-6 text-light-gray" />
              </button>
              <button>
                <UploadIcon className="w-6 h-6 text-light-gray" />
              </button>
              <button>
                <ReplyIcon className="w-6 h-6 text-light-gray" />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
