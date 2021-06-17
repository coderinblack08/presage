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
import { usePlayerStore } from "./usePlayerStore";

interface PlayPauseSkipControlsProps {
  url: string;
}

export const PlayPauseSkipControls: React.FC<PlayPauseSkipControlsProps> = ({
  url,
}) => {
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
    <div className="flex justify-end md:justify-center items-center space-x-4 sm:space-x-6">
      <button className="player-button">
        <MdSkipPrevious className="w-7 h-7 text-white" />
      </button>
      <button className="player-button" onClick={() => togglePlayPause()}>
        {playing ? (
          <MdPause className="w-10 h-10" />
        ) : (
          <MdPlayArrow className="w-10 h-10 text-white" />
        )}
      </button>
      <button className="player-button">
        <MdSkipNext className="w-7 h-7 text-white" />
      </button>
      <button className="player-button block md:hidden">
        <MdMoreVert className="w-7 h-7 text-white" />
      </button>
    </div>
  );
};
