import React from "react";
import { useEffect } from "react";
import shallow from "zustand/shallow";
import { usePlayerStore } from "../../store/usePlayerSTore";
import { ExtraPlayerControls } from "./ExtraPlayerControls";
import { PlayerSlider } from "./PlayerSlider";
import { PlayPauseSkipControls } from "./PlayPauseSkipControls";

interface PresagePlayerProps {}

export const PresagePlayer: React.FC<PresagePlayerProps> = ({}) => {
  const [presage, setUrl, url, isPreview] = usePlayerStore(
    (x) => [x.presage, x.setUrl, x.url, x.preview],
    shallow
  );

  useEffect(() => {
    if (presage) {
      setUrl(presage.audio);
    }
  }, [presage]);

  return (
    <div>
      {presage ? (
        <div className="fixed bottom-0 inset-x-0 w-full">
          <div className="block md:hidden w-full px-6 py-4 bg-gray-800 border-t border-gray-700">
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
                    {presage?.title}
                  </p>
                  <p className="small text-white-primary truncate">
                    By {presage?.user.displayName}
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
