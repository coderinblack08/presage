import React from "react";
import { MdRepeat, MdVolumeUp } from "react-icons/md";

interface ExtraPlayerControlsProps {}

export const ExtraPlayerControls: React.FC<ExtraPlayerControlsProps> = ({}) => {
  return (
    <div className="flex items-center space-x-4">
      <button className="text-white">
        <MdVolumeUp className="w-6 h-6" />
      </button>
      <button className="text-white">
        <MdRepeat className="w-6 h-6" />
      </button>
    </div>
  );
};
