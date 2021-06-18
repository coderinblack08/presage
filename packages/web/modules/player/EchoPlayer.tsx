import formatDuration from "format-duration";
import React, { useEffect } from "react";
import shallow from "zustand/shallow";
import { ExtraPlayerControls } from "./ExtraPlayerControls";
import { PlayerSlider } from "./PlayerSlider";
import { PlayPauseSkipControls } from "./PlayPauseSkipControls";
import { usePlayerStore } from "./usePlayerStore";

interface EchoPlayerProps {}

export const EchoPlayer: React.FC<EchoPlayerProps> = ({}) => {
  const [echo, url, setUrl] = usePlayerStore(
    (x) => [x.echo, x.url, x.setUrl],
    shallow
  );

  useEffect(() => {
    if (echo) {
      setUrl(echo.audio);
    }
  }, [echo]);

  return (
    <div>
      {echo ? (
        <div className="fixed z-50 bottom-0 inset-x-0 w-full">
          <PlayerSlider />
          <div className="relative z-40 w-full bg-gray-600">
            <div className="relative px-6 pb-4 py-6 md:px-8 max-w-8xl mx-auto flex justify-between md:justify-start md:grid md:grid-cols-3 items-center md:gap-x-12 lg:gap-x-16">
              <div className="flex items-center gap-x-6">
                <img
                  src={echo.thumbnail}
                  alt={echo.title}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <h6 className="font-bold">{echo.title}</h6>
                  <p className="small text-primary mt-0.5">
                    {formatDuration(echo.duration * 1000)} •{" "}
                    {echo.user.displayName}
                  </p>
                </div>
              </div>
              <PlayPauseSkipControls url={url} />
              <div className="hidden md:block">
                <ExtraPlayerControls />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
