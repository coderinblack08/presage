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
import { usePlayerStore } from "../../store/usePlayerSTore";

export const PlayPauseSkipControls: React.FC<{ url: string; show?: boolean }> =
  ({ url }) => {
    const [setPlaying, volume] = usePlayerStore(
      (x) => [x.setPlaying, x.volume],
      shallow
    );
    const { togglePlayPause, playing } = useAudioPlayer({
      volume,
      src: url,
      format: ["wav", "webm", "m4a", "mp3", "ogg"],
      autoplay: true,
      onplay: () => setPlaying(true),
      onend: () => setPlaying(false),
      onpause: () => setPlaying(false),
    });

    return (
      <div className="flex justify-end lg:justify-start items-center space-x-4">
        <button className="player-button">
          <MdSkipPrevious className="w-7 h-7" />
        </button>
        <button className="player-button" onClick={() => togglePlayPause()}>
          {playing ? (
            <MdPause className="w-10 h-10" />
          ) : (
            <MdPlayArrow className="w-10 h-10" />
          )}
        </button>
        <button className="player-button">
          <MdSkipNext className="w-7 h-7" />
        </button>
        <button className="player-button block lg:hidden">
          <MdMoreVert className="w-7 h-7" />
        </button>
      </div>
    );
  };
