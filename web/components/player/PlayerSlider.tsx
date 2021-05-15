import "rc-slider/assets/index.css";
import Slider from "rc-slider/lib/Slider";
import React from "react";
import format from "format-duration";
import { useAudioPosition } from "react-use-audio-player";
import { useMediaQuery } from "react-responsive";

interface PlayerSliderProps {}

export const PlayerSlider: React.FC<PlayerSliderProps> = ({}) => {
  const isMobile = useMediaQuery({ maxWidth: "768px" });
  const getCurrentTime = () => format(percentComplete * duration * 10);
  const { percentComplete, duration, seek } = useAudioPosition({
    highRefreshRate: true,
  });

  return (
    <div className="flex items-center space-x-4">
      <p className="small font-bold">{getCurrentTime()}</p>
      <Slider
        value={percentComplete}
        onChange={(v) => seek((duration * v) / 100)}
        railStyle={{ backgroundColor: isMobile ? "#282F42" : "#7A9AFC" }}
        trackStyle={{ backgroundColor: "#E4E7F1" }}
        handleStyle={{
          backgroundColor: "#FFFFFF",
          border: "none",
        }}
        min={0}
        max={100}
      />
      <span className="font-bold small">{format(duration * 1000)}</span>
    </div>
  );
};
