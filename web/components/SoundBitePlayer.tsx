import React, { useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { usePlayerStore } from "../stores/playing";

export const SoundBitePlayer: React.FC = ({}) => {
  const soundbite = usePlayerStore((x) => x.soundbite);
  const player = useRef<HTMLAudioElement>();

  const downloadAudio = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("soundbites")
        .download(soundbite.audio);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      console.log(url);

      player.current.src = url;
      player.current.play();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (soundbite !== null) {
      downloadAudio();
    }
  }, [soundbite]);

  return <audio preload="none" controls={false} ref={player} />;
};
