import "rc-slider/assets/index.css";
import React, { useEffect } from "react";
import shallow from "zustand/shallow";
import { supabase } from "../lib/supabase";
import { usePlayerStore } from "../stores/playing";
import { ExtraPlayerControls } from "./ExtraPlayerControls";
import { PlayerSlider } from "./PlayerSlider";
import { PlayPauseSkipControls } from "./PlayPauseSkipControls";

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
        <div className="fixed bottom-0 inset-x-0 w-full">
          <div className="block md:hidden w-full px-6 py-4 bg-darkest-gray border-t border-darker-gray">
            <PlayerSlider />
          </div>
          <div className="w-full bg-primary">
            <div className="relative px-6 py-4 md:px-8 md:py-5 max-w-8xl mx-auto flex justify-between md:justify-start md:grid md:grid-cols-player-mobile lg:grid-cols-player-mobile xl:grid-cols-player-desktop items-center md:gap-x-12 lg:gap-x-16">
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
        </div>
      ) : null}
    </div>
  );
};
