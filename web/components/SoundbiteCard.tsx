import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdArrowDownward, MdArrowUpward, MdPlayArrow } from "react-icons/md";
import format from "format-duration";
import useSWR from "swr";
import { supabase } from "../lib/supabase";
import { useUpvoteStatus } from "../lib/useUpvoteStatus";
import { useUser } from "../stores/auth";
import { usePlayerStore } from "../stores/playing";
import { definitions } from "../types/supabase";
import { formatDistanceToNow } from "date-fns";

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
  length,
  createdAt,
}) => {
  const { user } = useUser();
  const { status, myUpvote, mutate: mutateUpvote } = useUpvoteStatus(id);
  const { data: details, mutate } = useSWR<definitions["soundbite_details"]>(
    ["details", id],
    async () =>
      (
        await supabase
          .from("soundbite_details")
          .select("*")
          .eq("soundbite_id", id)
          .single()
      ).data
  );
  async function vote(value: number = 1) {
    mutate(
      {
        ...details,
        upvotes: myUpvote
          ? details.upvotes + value * 2
          : details.upvotes + value,
      },
      false
    );
    mutateUpvote({ ...myUpvote, value }, false);
    await supabase.from("upvotes").upsert(
      {
        soundbite_id: id,
        user_id: user.id,
        value,
      },
      {
        onConflict: "soundbite_id, user_id",
      }
    );
  }

  async function deleteUpvote() {
    await supabase
      .from("upvotes")
      .delete()
      .match({ soundbite_id: id, user_id: user.id });
    mutate();
    mutateUpvote(null);
  }

  return (
    <article
      className={`col-span-1 flex items-start ${expanded ? "" : "space-x-10"}`}
    >
      {expanded && (
        <div className="flex flex-col items-center space-y-1 mr-6">
          <button
            onClick={() => vote(1)}
            className={`p-1 focus:outline-none hover:text-primary hover:bg-primary hover:bg-opacity-10 rounded-md ${
              status === "upvoted"
                ? "text-primary bg-primary bg-opacity-10"
                : "text-light-gray"
            }`}
          >
            <MdArrowUpward className="w-4 h-4" />
          </button>
          <p
            className={`small font-bold ${
              status !== "unvoted" ? "text-primary" : ""
            }`}
          >
            {details?.upvotes}
          </p>
          <button
            onClick={() => vote(-1)}
            className={`p-1 focus:outline-none hover:text-primary hover:bg-primary hover:bg-opacity-10 rounded-md ${
              status === "downvoted"
                ? "text-primary bg-primary bg-opacity-10"
                : "text-light-gray"
            }`}
          >
            <MdArrowDownward className="w-4 h-4" />
          </button>
        </div>
      )}
      {thumbnailUrl ? (
        <div
          className={`flex items-center group relative flex-shrink-0 overflow-hidden rounded-lg ${
            expanded ? "mr-10" : ""
          }`}
        >
          <Image
            className="absolute inset-0 object-cover rounded-lg transform group-hover:scale-110 transition duration-400"
            src={thumbnailUrl}
            width={expanded ? 125 : 84}
            height={expanded ? 125 : 84}
            priority
          />
          <div className="absolute bottom-2 right-2">
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
          className={`icon-button bg-darker-gray p-2.5 rounded-full ${
            expanded ? "mr-8" : ""
          }`}
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
            className={`${expanded ? "w-6 h-6" : "w-5 h-5"} text-white`}
          />
        </button>
      )}
      <div>
        <Link href="/bite/[id]" as={`/bite/${id}`}>
          <a className="block hover:white text-xl font-bold">
            {/* <span className="text-primary">Programming — EP 2.</span> */}
            {title}
          </a>
        </Link>
        <p className="text-gray mt-1">
          Published by{" "}
          <Link href="/u/[username]" as={`/u/${profiles.username}`}>
            <a className="text-lighter-gray hover:underline">
              {profiles.username}
            </a>
          </Link>
        </p>
        <p className="mt-2 text-light-gray">{description}</p>
        <p className="text-gray mt-2">
          {format(length * 1000)} ·{" "}
          <time>
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </time>
        </p>
      </div>
    </article>
  );
};
