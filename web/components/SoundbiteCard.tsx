import React from "react";
import { Button } from "./Button";
import { SupabaseImage } from "./SupabaseImage";

interface SoundbiteCardProps {
  title: string;
  description: string;
  thumbnail: string;
  users: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
}

export const SoundbiteCard: React.FC<SoundbiteCardProps> = ({
  title,
  description,
  thumbnail,
  users,
}) => {
  return (
    <article className="flex items-start space-x-10">
      <SupabaseImage
        className="flex-shrink-0 object-cover rounded-lg"
        bucket="thumbnails"
        path={thumbnail}
        width={175}
        height={125}
      />
      <div className="w-full">
        <span className="text-primary">Programming — EP 2.</span>
        <div className="flex justify-between">
          <h4>{title}</h4>
          <div className="flex items-center space-x-4">
            <button className="bg-darker-gray rounded-full p-2">
              <img src="/icons/play.svg" className="w-5 h-5" />
            </button>
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
