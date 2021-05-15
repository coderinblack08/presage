import React, { useEffect } from "react";
import shallow from "zustand/shallow";
import { supabase } from "../lib/supabase";
import { usePlayerStore } from "../stores/playing";
import { ExtraPlayerControls } from "./ExtraPlayerControls";
import { PlayerSlider } from "./PlayerSlider";
import { PlayPauseSkipControls } from "./PlayPauseSkipControls";
import "rc-slider/assets/index.css";

export const SoundBitePlayer: React.FC = ({}) => {
  const [soundbite, setUrl, url] = usePlayerStore(
    (x) => [x.soundbite, x.setUrl, x.url],
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
    <div>
      {soundbite ? (
        <div className="fixed bottom-0 w-full bg-primary px-8 py-5">
          <div className="relative max-w-8xl mx-auto flex justify-between md:justify-start md:grid md:grid-cols-player-mobile lg:grid-cols-player-mobile xl:grid-cols-player-desktop items-center gap-x-16 lg:gap-x-20">
            <div className="flex items-center">
              <div className="hidden lg:block lg:mr-10">
                <PlayPauseSkipControls url={url} />
              </div>
              <header className="min-w-0">
                <p className="text-white font-bold truncate">
                  The Ben Ten Show — Pt. 1
                </p>
                <p className="small text-white-primary truncate">
                  By coderinblack · 2 days ago
                </p>
              </header>
            </div>
            <div className="hidden md:block">
              <PlayerSlider />
            </div>
            <div className="hidden lg:block">
              <ExtraPlayerControls />
            </div>
            <div className="block lg:hidden">
              <PlayPauseSkipControls url={url} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
