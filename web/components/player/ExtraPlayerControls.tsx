import React from "react";
import { MdRepeat, MdVolumeUp } from "react-icons/md";

interface ExtraPlayerControlsProps {}

export const ExtraPlayerControls: React.FC<ExtraPlayerControlsProps> = ({}) => {
  return (
    <div className="flex items-center justify-end space-x-4">
      <button className="icon-button">
        <MdVolumeUp className="w-7 h-7" />
      </button>
      <button className="icon-button">
        <MdRepeat className="w-7 h-7" />
      </button>
    </div>
  );
};
