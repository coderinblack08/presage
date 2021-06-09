import useMediaRecorder from "@wmik/use-media-recorder";
import format from "format-duration";
import React, { useRef } from "react";
import { useEffect } from "react";
import { MdMic, MdPlayArrow, MdRadioButtonChecked } from "react-icons/md";
import { useTimer } from "use-timer";
import { Button } from "../../components/Button";
import { useAudioUpload } from "../../pages/upload";

interface AudioRecorderProps {}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({}) => {
  const uploadRef = useRef<HTMLInputElement>();
  const { status, mediaBlob, stopRecording, startRecording, getMediaStream } =
    useMediaRecorder({
      mediaStreamConstraints: { audio: true },
    });
  const { time, start, pause, reset } = useTimer();
  const setAudio = useAudioUpload((x) => x.setAudio);

  useEffect(() => {
    if (mediaBlob) {
      setAudio(mediaBlob);
    }
  }, [mediaBlob]);

  return (
    <div>
      <div className="flex justify-between items-center w-full my-4 py-3.5 px-5 rounded-xl border border-gray-700 bg-gray-800">
        <div className="flex items-center space-x-6">
          {status === "recording" ? (
            <button
              type="button"
              className="p-4 rounded-full button bg-primary hover:bg-faint-primary"
              onClick={async () => {
                stopRecording();
                pause();
              }}
            >
              <MdRadioButtonChecked className="w-6 h-6 text-white" />
            </button>
          ) : (
            <button
              type="button"
              className="p-4 rounded-full button bg-primary hover:bg-faint-primary"
              onClick={async () => {
                getMediaStream();
                startRecording();
                reset();
                start();
              }}
            >
              <MdMic className="w-6 h-6 text-white" />
            </button>
          )}
          <div>
            <p className="font-bold text-white">
              {status === "recording" ? "Recording Audio" : "Record Audio"}
            </p>
            <p className="small text-gray-200">{format(time * 1000)} / 5:00</p>
          </div>
        </div>
        {mediaBlob && (
          <div className="flex items-center space-x-4">
            <Button
              icon={<MdPlayArrow className="w-6 h-6 text-white" />}
              type="button"
              color="gray"
            >
              Listen
            </Button>
          </div>
        )}
      </div>
      {mediaBlob && (
        <audio src={URL.createObjectURL(mediaBlob)} controls></audio>
      )}
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
          color="gray"
          size="sm"
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
