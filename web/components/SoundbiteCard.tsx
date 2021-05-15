import React, { useRef } from "react";
import { Button } from "./Button";
import Image from "next/image";
import { usePlayerStore } from "../stores/playing";
import { SoundBitePlayButton } from "./player/SoundBitePlayButton";
import Avatar from "react-avatar";
import Link from "next/link";

export interface SoundBite {
  id: string;
  title: string;
  audio: string;
  description: string;
  thumbnail: string;
  users: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
}

export const SoundbiteCard: React.FC<SoundBite> = ({
  id,
  audio,
  title,
  description,
  thumbnail,
  users,
}) => {
  return (
    <article className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-10">
      {thumbnail ? (
        <Image
          className="object-cover rounded-lg"
          src={thumbnail}
          width={175}
          height={125}
          priority
        />
      ) : null}
      <div className="w-full">
        {/* <span className="text-primary">Programming — EP 2.</span> */}
        <div className="flex flex-col sm:flex-row justify-between">
          <Link href="/bite/[id]" as={`/bite/${id}`}>
            <a className="hover:text-white">
              <h4>{title}</h4>
            </a>
          </Link>
          <div className="flex items-center my-2 sm:my-0 space-x-4">
            <SoundBitePlayButton
              {...{ id, title, description, audio, thumbnail, users }}
            />
            <Button size="small" color="secondary">
              Follow
            </Button>
          </div>
        </div>
        <p className="text-light-gray">
          Published by{" "}
          <span className="text-lighter-gray underline">{users.username}</span>
        </p>
        <p className="mt-2 text-gray">{description}</p>
        <p className="text-light-gray mt-1">
          <span className="font-bold">4:12</span> · <time>2 days ago</time> ·
          24k views
        </p>
      </div>
    </article>
  );
};
