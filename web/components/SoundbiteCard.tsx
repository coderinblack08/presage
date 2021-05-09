import React from "react";
import { Button } from "./Button";
import Image from "next/image";
import { usePlayerStore } from "../stores/playing";
import { SoundBitePlayButton } from "./SoundBitePlayButton";

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
    <article className="flex items-start space-x-10">
      <Image
        className="flex-shrink-0 object-cover rounded-lg"
        src={thumbnail}
        width={175}
        height={125}
        priority
      />
      <div className="w-full">
        <span className="text-primary">Programming — EP 2.</span>
        <div className="flex justify-between">
          <h4>{title}</h4>
          <div className="flex items-center space-x-4">
            <SoundBitePlayButton
              {...{ id, title, description, audio, thumbnail, users }}
            />
            <Button size="small" color="secondary">
              Follow
            </Button>
          </div>
        </div>
        <p className="text-light-gray mt-2.5">
          Published by{" "}
          <span className="text-lighter-gray underline">{users.username}</span>
        </p>
        <p className="mt-2 text-gray">{description}</p>
        <p className="text-light-gray mt-2.5">
          <span className="font-bold">4:12</span> · <time>2 days ago</time> ·
          24k views
        </p>
      </div>
    </article>
  );
};
