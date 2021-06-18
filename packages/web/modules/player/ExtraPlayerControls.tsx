import formatDuration from "format-duration";
import React from "react";
import { MdRepeat, MdVolumeUp } from "react-icons/md";
import { useAudioPosition } from "react-use-audio-player";

interface ExtraPlayerControlsProps {}

export const ExtraPlayerControls: React.FC<ExtraPlayerControlsProps> = ({}) => {
  const { percentComplete, duration } = useAudioPosition({
    highRefreshRate: true,
  });
  const getCurrentTime = () => formatDuration(percentComplete * duration * 10);

  return (
    <div className="flex items-center justify-end gap-x-4">
      <p className="pr-2 font-semibold text-[13px]">
        {getCurrentTime()} / {formatDuration(duration * 1000)}
      </p>
      <button className="focus:outline-none p-1">
        <MdVolumeUp className="w-7 h-7 text-white" />
      </button>
      <button className="focus:outline-none p-1">
        <MdRepeat className="w-7 h-7 text-white" />
      </button>
    </div>
  );
};
