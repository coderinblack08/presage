import { useCreateSoundbiteMutation } from "@presage/gql";
import getBlobDuration from "get-blob-duration";
import { useRouter } from "next/router";
import { useState } from "react";

export const useUploadSoundbite = () => {
  const [audio, setAudio] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [createSoundbite] = useCreateSoundbiteMutation();
  const router = useRouter();

  async function upload(values: { title: string; description?: string }) {
    if (!audio) return alert("Please record a SoundBite before uploading");
    const audioBlob = await fetch(audio).then((r) => r.blob());
    console.log(audioBlob);

    const length = Math.floor(await getBlobDuration(audioBlob));

    createSoundbite({
      variables: {
        audio: audioBlob,
        data: { ...values, length },
      },
    });
    router.push("/");
  }

  return { setAudio, thumbnail, audio, setThumbnail, upload };
};
