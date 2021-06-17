import formatDuration from "format-duration";
import React from "react";
import { MdPlayArrow } from "react-icons/md";
import { Echo } from "../../lib/types";
import { usePlayerStore } from "../player/usePlayerStore";

interface EchoCardProps {
  echo: Echo;
}

export const EchoCard: React.FC<EchoCardProps> = ({ echo }) => {
  const play = usePlayerStore((x) => x.play);

  return (
    <article className="w-52" key={echo.id}>
      {echo.thumbnail ? (
        <div className="relative w-52 h-52">
          <img
            src={echo.thumbnail}
            alt={echo.title}
            className="w-full h-full rounded-md object-cover"
          />
          <div className="absolute left-0 bottom-0 m-2">
            <button
              onClick={() => play(echo)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 bg-opacity-60 backdrop-filter backdrop-blur"
            >
              <MdPlayArrow className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      ) : null}
      <h6 className="font-bold mt-3 truncate">{echo.title}</h6>
      <p className="text-primary small truncate">
        {formatDuration(echo.duration * 1000)} •{" "}
        <a href="#">{echo.user.displayName}</a>
      </p>
    </article>
  );
};
