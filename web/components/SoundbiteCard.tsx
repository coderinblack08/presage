import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdPlayArrow } from "react-icons/md";
import { usePlayerStore } from "../stores/playing";
import { definitions } from "../types/supabase";

export interface SoundBite {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  audio: string;
  length: number;
  views?: number;
  userId: string;
  createdAt?: string;
  profiles: definitions["profiles"];
  expanded?: boolean;
}

export const SoundbiteCard: React.FC<SoundBite> = ({
  id,
  audio,
  title,
  description,
  thumbnailUrl,
  profiles,
  expanded,
}) => {
  return (
    <article
      className={`col-span-1 flex items-start ${
        expanded ? "space-x-12" : "space-x-10"
      }`}
    >
      {thumbnailUrl ? (
        <div className="group relative flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            className="absolute inset-0 object-cover transform group-hover:scale-110 transition duration-400"
            src={thumbnailUrl}
            width={expanded ? 125 : 84}
            height={expanded ? 125 : 84}
            priority
          />
          <div className="absolute bottom-2.5 right-1">
            <button
              className="icon-button bg-black p-2 rounded-full"
              onClick={() => {
                usePlayerStore.getState().play({
                  id,
                  audio,
                  title,
                  description,
                  thumbnailUrl,
                  profiles,
                });
              }}
            >
              <MdPlayArrow
                className={`${expanded ? "w-6 h-6" : "w-4 h-4"} text-white`}
              />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="icon-button bg-darker-gray p-2 rounded-full"
          onClick={() => {
            usePlayerStore.getState().play({
              id,
              audio,
              title,
              description,
              thumbnailUrl,
              profiles,
            });
          }}
        >
          <MdPlayArrow
            className={`${expanded ? "w-6 h-6" : "w-4 h-4"} text-white`}
          />
        </button>
      )}
      <div>
        <Link href="/bite/[id]" as={`/bite/${id}`}>
          <a className="w-full block hover:white">
            {/* <span className="text-primary">Programming — EP 2.</span> */}
            <h4>{title}</h4>
          </a>
        </Link>
        <p className="text-gray mt-1">
          Published by{" "}
          <span className="text-lighter-gray">{profiles.username}</span>
        </p>
        <p className="mt-2 text-light-gray">{description}</p>
        <p className="text-gray mt-2">
          <span className="font-bold">4:12</span> · <time>2 days ago</time> ·
          24k views
        </p>
      </div>
    </article>
  );
};
