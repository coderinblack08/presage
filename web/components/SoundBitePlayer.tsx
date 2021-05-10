import {
  MdPause,
  MdPlayArrow,
  MdRepeat,
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeDown,
  MdVolumeMute,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import { VolumeUpIcon, XIcon } from "@heroicons/react/solid";
import format from "format-duration";
import { AnimatePresence, motion } from "framer-motion";
import "rc-slider/assets/index.css";
import Slider from "rc-slider/lib/Slider";
import React, { useEffect } from "react";
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player";
import shallow from "zustand/shallow";
import { supabase } from "../lib/supabase";
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

  if (!ready && !loading) return <div>No audio to play</div>;
  if (loading) return <div>Loading audio</div>;
  return (
    <>
      <div className="col-span-2 flex flex-col items-center space-y-2">
        <div className="flex items-center">
          <button className="mr-3">
            <MdSkipPrevious className="w-10 h-10 text-white" />
          </button>
          <button onClick={togglePlayPause} className="mr-3">
            {!playing ? (
              <MdPlayArrow className="w-12 h-12 text-white" />
            ) : (
              <MdPause className="w-12 h-12 text-white" />
            )}
          </button>
          <button className="mr-7">
            <MdSkipNext className="w-10 h-10 text-white" />
          </button>
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
      <div className="flex items-center justify-end col-span-2">
        <button className="mr-4">
          <MdRepeat className="w-8 h-8 text-white" />
        </button>
        <div className="flex items-center space-x-4 mr-8">
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
          <div className="w-20">
            <Slider
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
    </>
  );
};

export const SoundBitePlayer: React.FC = ({}) => {
  const { stop } = useAudioPlayer();
  const [soundbite, setPlaying, playing, setUrl, url] = usePlayerStore(
    (x) => [x.soundbite, x.setPlaying, x.playing, x.setUrl, x.url],
    shallow
  );

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
          <div className="relative inset-x-0 mx-auto grid grid-cols-6 gap-14 max-w-[96em] bg-primary py-8 px-10 rounded-xl">
            <button
              className="absolute top-4 right-4"
              onClick={() => {
                stop();
                usePlayerStore.getState().clear();
              }}
            >
              <XIcon className="w-4 h-4" />
            </button>
            <div className="flex items-center col-span-2">
              <img
                src="https://kidscreen.com/wp/wp-content/uploads/2017/10/Ben10-KeyArt.jpg"
                className="w-20 h-20 mr-6 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="text-white-primary truncate small">
                  By coderinblack · 2 days ago
                </p>
                <p className="text-white mr-4 truncate text-lg font-bold">
                  The Ben Ten Show — Pt. 1 adfsdddddddasdfsd
                </p>
                {/* <div className="small text-white-primary font-semibold truncate">
                  Programming — EP 2.
                </div> */}
              </div>
            </div>
            <PlayAudioControls url={url} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
