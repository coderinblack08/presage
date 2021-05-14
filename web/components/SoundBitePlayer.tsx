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
        <div className="fixed bottom-0 w-full bg-primary lg:px-8 py-5">
          <div className="relative max-w-8xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <PlayPauseSkipControls url={url} />
              <div>
                <p className="text-white font-bold">The Ben Ten Show — Pt. 1</p>
                <p className="small text-white-primary">
                  By coderinblack · 2 days ago
                </p>
              </div>
            </div>
            <PlayerSlider />
            <ExtraPlayerControls />
          </div>
        </div>
      ) : null}
    </div>
  );
};
