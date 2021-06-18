import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React from "react";
import { useAudioPosition } from "react-use-audio-player";

interface PlayerSliderProps {}

export const PlayerSlider: React.FC<PlayerSliderProps> = ({}) => {
  const { percentComplete, duration, seek } = useAudioPosition({
    highRefreshRate: true,
  });

  return (
    <>
      <Slider
        step={0.01}
        className="-mb-2 relative z-50"
        onChange={(position) => seek((duration * position) / 100)}
        value={percentComplete}
        railStyle={{
          backgroundColor: "#283046",
          borderRadius: 0,
        }}
        trackStyle={{
          backgroundColor: "#F2BE52",
          borderRadius: 0,
        }}
        handleStyle={{
          backgroundColor: "#F2BE52",
          border: "none",
        }}
      />
    </>
  );
};
