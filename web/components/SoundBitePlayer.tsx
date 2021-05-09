import format from "format-duration";
import { XIcon } from "@heroicons/react/solid";
import Slider from "rc-slider/lib/Slider";
import React, { useEffect } from "react";
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player";
import shallow from "zustand/shallow";
import { supabase } from "../lib/supabase";
import { usePlayerStore } from "../stores/playing";
import { Button } from "./Button";
import "rc-slider/assets/index.css";

const PlayAudioControls: React.FC<{ url: string }> = ({ url }) => {
  const [setPlaying] = usePlayerStore((x) => [x.setPlaying], shallow);
  const { togglePlayPause, ready, loading, playing, player } = useAudioPlayer({
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
    <div className="flex flex-col items-end space-y-2">
      <div className="flex items-center space-x-4">
        <button>
          <img
            src="/icons/replay10.svg"
            alt="Replay 10 seconds"
            className="w-10 h-10"
          />
        </button>
        <button onClick={togglePlayPause}>
          {!playing ? (
            <img src="/icons/play.svg" className="w-14 h-14" alt="Play song" />
          ) : (
            <img
              src="/icons/pause.svg"
              className="w-14 h-14"
              alt="Pause song"
            />
          )}
        </button>
        <button>
          <img
            src="/icons/forward10.svg"
            alt="Forward 10 seconds"
            className="w-10 h-10"
          />
        </button>
        <select
          className="appearance-none px-4 py-0.5 small rounded-lg bg-primary border-2 border-white-primary text-white-primary font-bold"
          defaultValue="1"
          onChange={(e) => {
            player.rate(Number(e.target.value));
          }}
        >
          <option value="0.5">0.5x</option>
          <option value="1">1.0x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2.0x</option>
        </select>
      </div>
      <div className="flex items-center space-x-5">
        <span className="font-bold">
          {format(percentComplete * duration * 10)}
        </span>
        <div className="w-72">
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
      </div>
    </div>
  );
};

export const SoundBitePlayer: React.FC = ({}) => {
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
          <button className="absolute top-4 right-4">
            <XIcon className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-8">
            <img
              src="https://kidscreen.com/wp/wp-content/uploads/2017/10/Ben10-KeyArt.jpg"
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <div className="small text-white-primary font-semibold">
                Programming — EP 2.
              </div>
              <div className="flex items-center">
                <h4 className="text-white mr-4">The Ben Ten Show — Pt. 1</h4>
                <div className="flex items-center space-x-2">
                  <Button size="small" color="white">
                    Follow
                  </Button>
                  <Button size="small" color="lightPrimary">
                    Report
                  </Button>
                </div>
              </div>
              <p className="white-primary truncate min-w-">
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
