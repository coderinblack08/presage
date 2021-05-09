import React from "react";
import { usePlayerStore } from "../stores/playing";
import { SoundBite } from "./SoundBiteCard";

export const SoundBitePlayButton: React.FC<SoundBite> = (props) => {
  const playing = usePlayerStore((x) => x.playing);

  return (
    <button
      onClick={() => {
        usePlayerStore.getState().play(props);
      }}
      className="transition focus:outline-none hover:bg-dark-gray bg-darker-gray rounded-full p-2 flex-shrink-0"
    >
      <img src="/icons/play.svg" className="w-5 h-5" />
    </button>
  );
};
