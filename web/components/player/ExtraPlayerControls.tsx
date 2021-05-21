import { Popover, Transition } from "@headlessui/react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider/lib/Slider";
import React, { Fragment } from "react";
import { MdRepeat, MdVolumeUp } from "react-icons/md";
import { useAudioPlayer } from "react-use-audio-player";
import shallow from "zustand/shallow";
import { usePlayerStore } from "../../stores/playing";

interface ExtraPlayerControlsProps {}

export const ExtraPlayerControls: React.FC<ExtraPlayerControlsProps> = ({}) => {
  const { volume: setHowlerVolume } = useAudioPlayer();
  const [volume, setVolume] = usePlayerStore(
    (x) => [x.volume, x.setVolume],
    shallow
  );

  return (
    <div className="flex items-center justify-end space-x-2">
      <Popover className="flex items-center relative">
        {({ open }) => (
          <>
            <Popover.Button className="player-button p-1">
              <MdVolumeUp className="w-7 h-7" />
            </Popover.Button>
            <Transition
              as={Fragment}
              show={open}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                as="div"
                className="absolute z-10 p-2 w-40 -ml-4 transform -translate-y-1/2 -translate-x-full top-1/2 left-0 sm:px-0 shadow bg-primary rounded-full"
              >
                <Slider
                  value={volume * 100}
                  className="mx-4 w-auto"
                  onChange={(v) => {
                    const value = parseFloat((Number(v) / 100).toFixed(2));
                    setVolume(value);
                    setHowlerVolume(value);
                  }}
                  railStyle={{ backgroundColor: "#7A9AFC" }}
                  trackStyle={{ backgroundColor: "#E4E7F1" }}
                  handleStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "none",
                  }}
                  min={0}
                  max={100}
                  reverse
                />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <button className="player-button p-1">
        <MdRepeat className="w-7 h-7" />
      </button>
    </div>
  );
};
