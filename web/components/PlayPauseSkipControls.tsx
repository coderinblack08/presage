import React from "react";
import {
  MdMoreVert,
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { useAudioPlayer } from "react-use-audio-player";
import shallow from "zustand/shallow";
import { usePlayerStore } from "../stores/playing";

export const PlayPauseSkipControls: React.FC<{ url: string; show?: boolean }> =
  ({ url }) => {
    const [setPlaying, volume] = usePlayerStore(
      (x) => [x.setPlaying, x.volume],
      shallow
    );
    const { togglePlayPause, playing } = useAudioPlayer({
      volume,
      src: url,
      format: ["wav", "m4a", "mp3", "ogg"],
      autoplay: true,
      onplay: () => setPlaying(true),
      onend: () => setPlaying(false),
      onpause: () => setPlaying(false),
    });

    return (
      <div className="flex justify-end lg:justify-start items-center space-x-4">
        <button className="icon-button">
          <MdSkipPrevious className="w-7 h-7" />
        </button>
        <button className="icon-button" onClick={() => togglePlayPause()}>
          {playing ? (
            <MdPause className="w-10 h-10" />
          ) : (
            <MdPlayArrow className="w-10 h-10" />
          )}
        </button>
        <button className="icon-button">
          <MdSkipNext className="w-7 h-7" />
        </button>
        <button className="icon-button block lg:hidden">
          <MdMoreVert className="w-7 h-7" />
        </button>
      </div>
    );
  };
