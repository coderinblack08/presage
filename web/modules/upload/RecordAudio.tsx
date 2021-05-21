import format from "format-duration";
import React, { useRef } from "react";
import {
  MdClose,
  MdMic,
  MdPlayArrow,
  MdRadioButtonChecked,
} from "react-icons/md";
import { useAudioPlayer } from "react-use-audio-player";
import shallow from "zustand/shallow";
import { Button } from "../../components/Button";
import { useUser } from "../../stores/auth";
import { usePlayerStore } from "../../stores/playing";
import useRecorder from "./useRecorder";

export const RecordAudio: React.FC<{
  setAudio: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setAudio }) => {
  const { profile } = useUser();
  const uploadRef = useRef<HTMLInputElement>();
  const [soundbite, isPreview] = usePlayerStore(
    (x) => [x.soundbite, x.preview],
    shallow
  );
  const { stop } = useAudioPlayer();
  const { duration, clearAudio, audioURL, recording, toggleRecording } =
    useRecorder(setAudio);

  return (
    <div>
      <div className="flex justify-between items-center w-full my-4 py-3.5 px-5 rounded-xl border border-darker-gray bg-darkest-gray">
        <div className="flex items-center space-x-6">
          <button
            type="button"
            className={`p-4 rounded-full button ${
              recording
                ? "bg-secondary hover:bg-faint-secondary"
                : "bg-primary hover:bg-faint-primary"
            }`}
            onClick={() => {
              toggleRecording();
              if (soundbite && isPreview) {
                usePlayerStore.getState().clear();
                stop();
              }
            }}
          >
            {recording ? (
              <MdRadioButtonChecked className="w-6 h-6 text-white" />
            ) : (
              <MdMic className="w-6 h-6 text-white" />
            )}
          </button>
          <div>
            <p className="font-bold text-white">
              {recording ? "Recording Audio" : "Record Audio"}
            </p>
            <p className="small text-light-gray">
              {format(duration * 1000)} / 5:00
            </p>
          </div>
        </div>
        {audioURL && (
          <div className="flex items-center space-x-4">
            <Button
              icon={<MdPlayArrow className="w-6 h-6 text-white" />}
              onClick={() => {
                usePlayerStore.getState().setPreview(true);
                usePlayerStore.getState().play({
                  audio: audioURL,
                  title: "Preview Audio",
                  profiles: profile,
                });
              }}
              type="button"
              color="secondary"
              size="iconSmall"
            />
            <Button
              icon={<MdClose className="w-6 h-6 text-white" />}
              onClick={() => {
                clearAudio();
                if (soundbite && isPreview) {
                  usePlayerStore.getState().clear();
                  stop();
                }
              }}
              type="button"
              color="secondary"
              size="iconSmall"
            />
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        name="audio"
        id="audio"
        className="hidden"
        multiple={false}
        ref={uploadRef}
      />
      <div className="flex items-center space-x-4 my-6">
        <Button
          color="secondary"
          size="small"
          type="button"
          onClick={() => uploadRef.current.click()}
        >
          Upload Audio
        </Button>
        <label htmlFor="audio" className="text-gray small">
          Or choose an external audio clip
        </label>
      </div>
    </div>
  );
};
