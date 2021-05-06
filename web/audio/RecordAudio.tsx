import { MicrophoneIcon, TrashIcon } from "@heroicons/react/solid";
import useMediaRecorder from "@wmik/use-media-recorder";
import Slider from "rc-slider/lib/Slider";
import React, { useRef, useState } from "react";
import { useDevices } from "./useDevices";
import { useRecorder } from "./useRecorder";

export const RecordAudio: React.FC = () => {
  const {
    startRecording,
    audioURL,
    stopRecording,
    isRecording,
  } = useRecorder();
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLAudioElement>();
  const audioSource = useRef<HTMLSourceElement>();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4>Record</h4>
        <audio ref={player} preload="auto" controls>
          <source ref={audioSource} src={audioURL} />
        </audio>
      </div>
      <div className="flex items-center space-x-6 w-full mt-4">
        <button
          type="button"
          className="w-14 h-14 flex items-center justify-center rounded-full bg-primary hover:bg-faint-primary"
          onClick={() => {
            if (isRecording) {
              stopRecording();
              console.log(audioURL);
            } else {
              startRecording();
            }
          }}
        >
          {isRecording ? (
            <img src="/icons/stop.svg" className="text-white w-6 h-6" />
          ) : (
            <MicrophoneIcon className="text-white w-6 h-6" />
          )}
        </button>
        <div className="flex-grow">
          <div className="w-full">
            <Slider
              min={0}
              max={300}
              value={21.51}
              railStyle={{ backgroundColor: "#282F42" }}
              trackStyle={{ backgroundColor: "#E4E7F1" }}
              handleStyle={{
                backgroundColor: "#FFFFFF",
                border: "none",
              }}
            />
          </div>
          <div className="relative flex items-center w-full">
            <p className="absolute left-0 font-bold">00:21.51</p>
            <div className="flex items-center justify-center space-x-2 w-full">
              <button type="button">
                <img
                  src="/icons/replay10.svg"
                  alt="Replay 10 Seconds"
                  className="text-white w-8 h-8"
                />
              </button>
              {!playing ? (
                <button
                  type="button"
                  onClick={() => {
                    const audio = player.current;
                    audio.volume = 1;
                    audio.addEventListener("playing", () => setPlaying(true));
                    audio.addEventListener("pause", () => setPlaying(false));
                    audio.addEventListener("ended", () => setPlaying(false));
                    audio.currentTime = audio.currentTime;
                    audio.play();
                  }}
                >
                  <img
                    src="/icons/play.svg"
                    alt="Play"
                    className="text-white w-12 h-12"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const audio = player.current;
                    audio.pause();
                  }}
                >
                  <img
                    src="/icons/stop.svg"
                    alt="Pause"
                    className="text-white w-12 h-12"
                  />
                </button>
              )}
              <button type="button">
                <img
                  src="/icons/forward10.svg"
                  alt="Forward 10 Seconds"
                  className="text-white w-8 h-8"
                />
              </button>
              <button type="button">
                <TrashIcon className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="small text-gray mt-2">
        Or upload an{" "}
        <a href="#" className="text-primary small">
          audio file
        </a>{" "}
        · 5 minute limit
      </p>
    </div>
  );
};
