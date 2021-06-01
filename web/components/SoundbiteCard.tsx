import { Soundbite } from "@presage/gql";
import { formatDistanceToNow } from "date-fns";
import format from "format-duration";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdPlayArrow } from "react-icons/md";
import { usePlayerStore } from "../stores/playing";
import { UpvoteButtons } from "./UpvoteButtons";

export const SoundbiteCard: React.FC<Soundbite & { expanded?: boolean }> = ({
  __typename: _,
  expanded,
  ...props
}) => {
  return (
    <article
      className={`col-span-1 flex items-start ${expanded ? "" : "space-x-10"}`}
    >
      {expanded && <UpvoteButtons id={props.id} />}
      {props.thumbnail ? (
        <div
          className={`flex items-center group relative flex-shrink-0 overflow-hidden rounded-lg ${
            expanded ? "mr-10" : ""
          }`}
        >
          <Image
            className="absolute inset-0 object-cover rounded-lg transform group-hover:scale-110 transition duration-400"
            src={props.thumbnail}
            width={expanded ? 125 : 84}
            height={expanded ? 125 : 84}
            priority
          />
          <div className="absolute bottom-2 right-2">
            <button
              className="icon-button bg-black p-2 rounded-full"
              onClick={() => {
                usePlayerStore.getState().play(props);
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
          className={`icon-button bg-darker-gray p-2.5 rounded-full ${
            expanded ? "mr-8" : ""
          }`}
          onClick={() => {
            usePlayerStore.getState().play(props);
          }}
        >
          <MdPlayArrow
            className={`${expanded ? "w-6 h-6" : "w-5 h-5"} text-white`}
          />
        </button>
      )}
      <div>
        <Link href="/bite/[id]" as={`/bite/${props.id}`}>
          <a className="block hover:white text-xl font-bold">{props.title}</a>
        </Link>
        <p className="text-gray mt-2">
          Published by{" "}
          <Link href="/u/[username]" as={`/u/${props.user.username}`}>
            <a className="text-lighter-gray hover:underline">
              {props.user.displayName}
            </a>
          </Link>
        </p>
        <p className="mt-2 text-light-gray">{props.description}</p>
        <p className="text-gray mt-2">
          {format(props.length * 1000)} ·{" "}
          <time>
            {formatDistanceToNow(new Date(parseInt(props.createdAt)), {
              addSuffix: true,
            }).replace("about ", "")}
          </time>
        </p>
      </div>
    </article>
  );
};
