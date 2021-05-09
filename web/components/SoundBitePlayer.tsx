import { XIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import shallow from "zustand/shallow";
import { supabase } from "../lib/supabase";
import { usePlayerStore } from "../stores/playing";
import { Button } from "./Button";

const PlayAudioControls: React.FC<{ url: string }> = ({ url }) => {
  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src: url,
    format: ["mp3"],
    autoplay: true,
  });

  if (!ready && !loading) return <div>No audio to play</div>;
  if (loading) return <div>Loading audio</div>;

  return (
    <div>
      <button onClick={togglePlayPause}>{playing ? "Pause" : "Play"}</button>
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
        <div className="flex justify-between items-center fixed bottom-6 inset-x-6 mx-auto max-w-[96em] bg-primary py-8 px-12 rounded-xl">
          <button className="absolute top-4 right-4">
            <XIcon className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-8">
            <img
              src="https://kidscreen.com/wp/wp-content/uploads/2017/10/Ben10-KeyArt.jpg"
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="min-w-0">
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
