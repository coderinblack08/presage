import React, { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import shallow from "zustand/shallow";
import { useUploadSoundbiteStore } from "./useUploadSoundbite";

const useRecorder = () => {
  const [recorder, setRecorder] = useState<MediaRecorder>();
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useUploadSoundbiteStore(
    (x) => [x.audio, x.setAudio],
    shallow
  );
  const { time, start, pause, reset } = useTimer();

  useEffect(() => {
    if (time === 5 * 60) {
      setRecording(false);
      pause();
    }
  }, [time]);

  useEffect(() => {
    if (recorder) {
      if (recording) {
        recorder.start();
        reset();
        start();
      } else {
        if (recorder.state !== "inactive") {
          recorder.stop();
          pause();
        }
      }
    } else {
      if (recording) {
        requestRecorder().then(setRecorder).catch(console.error);
      }
      return;
    }

    const handleData = (e: BlobEvent) => {
      const url = URL.createObjectURL(e.data);
      setAudio(url);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, recording]);

  const toggleRecording = () => setRecording(!recording);
  const clearAudio = () => {
    URL.revokeObjectURL(audio);
    setAudio("");
    reset();
  };

  return { duration: time, clearAudio, toggleRecording, recording };
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}

export default useRecorder;
