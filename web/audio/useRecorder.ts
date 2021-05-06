import { useEffect, useState } from "react";

const useRecorder = () => {
  const [recorder, setRecorder] = useState<MediaRecorder>();
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  useEffect(() => {
    if (recorder) {
      if (recording) {
        recorder.start();
      } else {
        recorder.stop();
      }
    } else {
      if (recording) {
        requestRecorder().then(setRecorder).catch(console.error);
      }
      return;
    }

    const handleData = (e) => {
      setAudioURL(URL.createObjectURL(e.data));
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, recording]);

  const toggleRecording = () => setRecording(!recording);

  return { toggleRecording, recording, audioURL };
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}

export default useRecorder;
