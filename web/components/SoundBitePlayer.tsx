import { Popover } from "@headlessui/react";
import { VolumeUpIcon, XIcon } from "@heroicons/react/solid";
import format from "format-duration";
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
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center">
        <button className="mr-3">
          <img
            src="/icons/skip-previous.svg"
            alt="Replay 10 seconds"
            className="w-10 h-10"
          />
        </button>
        <button onClick={togglePlayPause} className="mr-3">
          {!playing ? (
            <img src="/icons/play.svg" className="w-12 h-12" alt="Play song" />
          ) : (
            <img
              src="/icons/pause.svg"
              className="w-12 h-12"
              alt="Pause song"
            />
          )}
        </button>
        <button className="mr-7">
          <img
            src="/icons/skip-next.svg"
            alt="Forward 10 seconds"
            className="w-10 h-10"
          />
        </button>
        <Popover className="relative mr-5">
          <Popover.Button>
            <VolumeUpIcon className="w-8 h-8 text-white" />
          </Popover.Button>

          <Popover.Panel className="inset-x-0 mx-auto py-4 px-2 -mt-4 rounded-full bg-darkest-gray absolute top-0 transform -translate-y-full z-10">
            <div className="h-32">
              <Slider
                value={volume * 100}
                onChange={(v) => {
                  const value = parseFloat((Number(v) / 100).toFixed(2));
                  setVolume(value);
                  return howlerVolume(value);
                }}
                railStyle={{ backgroundColor: "#282F42" }}
                trackStyle={{ backgroundColor: "#E4E7F1" }}
                handleStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "none",
                }}
                min={0}
                max={100}
                vertical
              />
            </div>
          </Popover.Panel>
        </Popover>
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
      <div className="flex items-center space-x-5">
        <span className="font-bold">
          {format(percentComplete * duration * 10)}{" "}
        </span>
        <div className="w-96">
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
        </div>
        <span className="font-bold">{format(duration * 1000)}</span>
      </div>
    </div>
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

  if (soundbite !== null)
    return (
      <div>
        <div className="flex justify-between items-center fixed bottom-6 inset-x-6 mx-auto max-w-[96em] bg-primary py-8 px-10 rounded-xl">
          <button
            className="absolute top-4 right-4"
            onClick={() => {
              stop();
              usePlayerStore.getState().clear();
            }}
          >
            <XIcon className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-8">
            <img
              src="https://kidscreen.com/wp/wp-content/uploads/2017/10/Ben10-KeyArt.jpg"
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="max-w-sm">
              <div className="small text-white-primary font-semibold truncate">
                Programming — EP 2.
              </div>
              <h4 className="text-white mr-4 truncate">
                The Ben Ten Show — Pt. 1
              </h4>
              <p className="white-primary truncate">
                In this episode Adam talks to Ben Orenstein about what he likes.
              </p>
            </div>
          </div>
          <PlayAudioControls url={url} />
        </div>
      </div>
    );

  return null;
};
