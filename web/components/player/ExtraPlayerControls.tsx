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
    <div className="flex items-center justify-end space-x-4">
      <Popover className="flex items-center relative">
        {({ open }) => (
          <>
            <Popover.Button className="icon-button">
              <MdVolumeUp className="w-7 h-7" />
            </Popover.Button>
            <Transition
              as={Fragment}
              show={open}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-1"
            >
              <Popover.Panel
                as="div"
                className="absolute z-10 p-4 mb-12 transform -translate-x-1/2 left-1/2 bottom-0 sm:px-0 shadow bg-primary rounded-full"
              >
                <Slider
                  value={volume * 100}
                  className="h-32 mx-1.5"
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
                  vertical
                />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <button className="icon-button">
        <MdRepeat className="w-7 h-7" />
      </button>
    </div>
  );
};
