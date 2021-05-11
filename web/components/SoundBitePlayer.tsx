import { XIcon } from "@heroicons/react/solid";
import format from "format-duration";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import "rc-slider/assets/index.css";
import Slider from "rc-slider/lib/Slider";
import React, { useEffect } from "react";
import {
  MdPause,
  MdPlayArrow,
  MdRepeat,
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeDown,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player";
import shallow from "zustand/shallow";
import { supabase } from "../lib/supabase";
import { useHover } from "../lib/useHover";
import { usePlayerStore } from "../stores/playing";

const PlayAudioControls: React.FC<{ url: string }> = ({ url }) => {
  const [setPlaying, volume, setVolume] = usePlayerStore(
    (x) => [x.setPlaying, x.volume, x.setVolume],
    shallow
  );
  const {
    togglePlayPause,
    ready,
    loading,
    playing,
    player,
    volume: howlerVolume,
  } = useAudioPlayer({
    volume,
    src: url,
    format: ["wav", "m4a", "mp3", "ogg"],
    autoplay: true,
    onplay: () => setPlaying(true),
    onend: () => setPlaying(false),
    onpause: () => setPlaying(false),
  });
  const { percentComplete, duration, seek } = useAudioPosition({
    highRefreshRate: true,
  });

  const sideControls = (
    <div className="flex items-center">
      <button className="mr-4">
        <MdRepeat className="w-8 h-8 text-white" />
      </button>
      <div className="flex items-center space-x-4 mr-4 lg:mr-8">
        <button
          onClick={() => {
            if (volume !== 0) {
              setVolume(0);
              howlerVolume(0);
            } else {
              setVolume(1);
              howlerVolume(1);
            }
          }}
        >
          {volume > 0.5 ? (
            <MdVolumeUp className="w-8 h-8 text-white" />
          ) : volume === 0 ? (
            <MdVolumeOff className="w-8 h-8 text-white" />
          ) : (
            <MdVolumeDown className="w-8 h-8 text-white" />
          )}
        </button>
        <Slider
          className="hidden lg:block w-20"
          value={volume * 100}
          onChange={(v) => {
            const value = parseFloat((Number(v) / 100).toFixed(2));
            setVolume(value);
            return howlerVolume(value);
          }}
          railStyle={{ backgroundColor: "#7A9AFC" }}
          trackStyle={{ backgroundColor: "#E4E7F1" }}
          handleStyle={{
            backgroundColor: "#FFFFFF",
            border: "none",
          }}
          min={0}
          max={100}
        />
      </div>
      <select
        className="focus:outline-none appearance-none flex justify-items-center px-3 py-0.5 small rounded-lg bg-white text-primary font-bold"
        defaultValue="1"
        onChange={(e) => player.rate(Number(e.target.value))}
      >
        <option value="0.5">0.5x</option>
        <option value="1">1.0x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2.0x</option>
      </select>
    </div>
  );

  return (
    <>
      <div className="col-span-7 md:col-span-5 lg:col-span-3 flex flex-col items-center space-y-2">
        <div className="flex justify-between items-center md:w-auto w-full">
          <div className="flex items-center">
            <button className="mr-3">
              <MdSkipPrevious className="w-10 h-10 text-white" />
            </button>
            <button
              onClick={togglePlayPause}
              className="mr-3 text-white disabled:text-white-primary"
              disabled={loading}
            >
              {!playing ? (
                <MdPlayArrow className="w-12 h-12" />
              ) : (
                <MdPause className="w-12 h-12" />
              )}
            </button>
            <button className="mr-7">
              <MdSkipNext className="w-10 h-10 text-white" />
            </button>
          </div>
          <div className="block md:hidden">{sideControls}</div>
        </div>
        <div className="flex items-center space-x-5 w-full">
          <span className="font-bold small">
            {format(percentComplete * duration * 10)}{" "}
          </span>
          <Slider
            value={percentComplete}
            onChange={(v) => seek((duration * v) / 100)}
            railStyle={{ backgroundColor: "#7A9AFC" }}
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
      </div>
      <div className="hidden md:flex col-span-2 row-span-2 items-center justify-end">
        {sideControls}
      </div>
    </>
  );
};

export const SoundBitePlayer: React.FC = ({}) => {
  const { stop } = useAudioPlayer();
  const [soundbite, setPlaying, playing, setUrl, url] = usePlayerStore(
    (x) => [x.soundbite, x.setPlaying, x.playing, x.setUrl, x.url],
    shallow
  );
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const downloadAudio = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("soundbites")
        .download(soundbite.audio);

      if (error) {
        throw error;
      }
      setUrl(URL.createObjectURL(data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (soundbite !== null) {
      downloadAudio();
    }
  }, [soundbite]);

  return (
    <AnimatePresence>
      {soundbite ? (
        <motion.div
          initial={{ y: 175, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 175, opacity: 0 }}
          className="fixed bottom-6 inset-x-6 mx-auto"
        >
          {JSON.stringify(isHovered)}
          <motion.div
            className="relative inset-x-0 mx-auto grid grid-cols-7 gap-x-12 max-w-[90em] bg-primary py-8 px-10 rounded-xl"
            ref={hoverRef}
          >
            <motion.button
              className="absolute top-4 right-4"
              onClick={() => {
                stop();
                URL.revokeObjectURL(url);
                usePlayerStore.getState().clear();
              }}
            >
              <XIcon className="w-4 h-4" />
            </motion.button>
            <div className="hidden lg:flex items-center col-span-1 lg:col-span-2">
              {soundbite.thumbnail ? (
                <div className="mr-6">
                  <Image
                    width={80}
                    height={80}
                    src={soundbite.thumbnail}
                    className="rounded-lg object-cover"
                  />
                </div>
              ) : null}
              <div className="hidden lg:block min-w-0">
                <p className="text-white-primary truncate small">
                  By {soundbite.users.username} · 2 days ago
                </p>
                <p className="text-white mr-4 truncate text-lg font-bold">
                  {soundbite.title}
                </p>
                {/* <div className="small text-white-primary font-semibold truncate">
                  Programming — EP 2.
                </div> */}
              </div>
            </div>
            <PlayAudioControls url={url} />
            <p className="block lg:hidden col-span-7 md:col-span-5 mt-2 text-white-primary">
              Playing{" "}
              <span className="text-white font-semibold">
                {soundbite.title}
              </span>{" "}
              · By {soundbite.users.username} · 2 days ago
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
