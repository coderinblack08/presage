import React, { useEffect, useRef } from "react";
import useSound from "use-sound";
import shallow from "zustand/shallow";
import { supabase } from "../lib/supabase";
import { usePlayerStore } from "../stores/playing";
import { Button } from "./Button";

const PlayAudioControls: React.FC<{ url: string }> = ({ url }) => {
  const player = useRef<HTMLAudioElement>();
  const [playing, setPlaying] = usePlayerStore(
    (x) => [x.playing, x.setPlaying],
    shallow
  );

  const playAudio = async () => {
    const audio = player.current;
    audio.crossOrigin = "anonymous";
    await audio.play();
    audio.addEventListener("playing", () => setPlaying(true));
    audio.addEventListener("pause", () => setPlaying(false));
    audio.addEventListener("ended", () => setPlaying(false));
  };

  useEffect(() => {
    playAudio();
  }, [player]);

  return <audio preload="none" src={url} ref={player} controls />;
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
        <div className="flex justify-between items-center fixed bottom-6 inset-x-6 mx-auto max-w-[96em] bg-primary py-8 px-12 rounded-xl">
          <div className="flex items-center space-x-8">
            <img
              src="https://kidscreen.com/wp/wp-content/uploads/2017/10/Ben10-KeyArt.jpg"
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div>
              <div className="small">Programming — EP 2.</div>
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
              <div className="white-primary">
                In this episode Adam talks to Ben Orenstein about what...
              </div>
            </div>
          </div>
          <PlayAudioControls url={url} />
        </div>
      </div>
    );

  return null;
};
