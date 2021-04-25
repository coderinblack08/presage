import { HeartIcon, ReplyIcon, UploadIcon } from "@heroicons/react/outline";
import { VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/solid";
import React from "react";
import useSound from "use-sound";
import { Navbar } from "../components/Navbar";

const Pish: React.FC = () => {
  const [play, { stop, isPlaying }] = useSound("/assets/pronounce_pish.mp3");

  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto py-20 lg:py-24 px-6">
        <div className="relative">
          <div className="absolute left-0 bottom-1/2 top-1/2 flex items-center space-x-4">
            <h3>
              <span className="h3 text-faint-primary">Pish</span> & Presage
            </h3>
            <button onClick={isPlaying ? () => stop() : () => play()}>
              {isPlaying ? (
                <VolumeOffIcon className="w-8 h-8" />
              ) : (
                <VolumeUpIcon className="w-8 h-8" />
              )}
            </button>
          </div>
          <h1
            className="text-7xl font-black text-black select-none"
            style={{
              textShadow: `#2f364b 0px 0px 3px,   #2f364b 0px 0px 3px,   #2f364b 0px 0px 3px,
            #2f364b 0px 0px 3px,   #2f364b 0px 0px 3px,   #2f364b 0px 0px 3px`,
            }}
          >
            Pish & Presage
          </h1>
        </div>
        <p className="text-light-gray text-[15px] mt-6">
          <span className="text-faint-primary">Exclamation.</span> used to
          express annoyance, impatience, or disgust.
        </p>
        <p className="text-gray mt-2">
          Merging Pish, an innovative student run non-mainstream news
          organization, with Presage.
        </p>
        <div className="mt-16">
          <article className="max-w-lg">
            <img
              src="https://images.prismic.io/pish/91fa7611-d2e5-4a25-af40-62d50d0f62c0_warnock_loeffler_perdue_ossoff.jpg?auto=compress,format"
              className="rounded-lg mb-6"
            />
            <h4>Day of Georgia Senate Races Analysis</h4>
            <p className="text-light-gray mt-2">
              Georgia officials say that predictions and results will start
              coming out starting tonight and tomorrow morning.
            </p>
            <div className="flex items-center justify-between mt-6">
              <p className="text-light-gray">
                January 4, 2021 <span className="text-gray">By</span>{" "}
                <span className="text-primary">Hansel Grimes</span>
              </p>
              <div className="flex items-center space-x-4">
                <button>
                  <HeartIcon className="w-6 h-6 text-light-gray" />
                </button>
                <button>
                  <UploadIcon className="w-6 h-6 text-light-gray" />
                </button>
                <button>
                  <ReplyIcon className="w-6 h-6 text-light-gray" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Pish;
