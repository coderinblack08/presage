import { useCreateSoundbiteMutation } from "@presage/gql";
import getBlobDuration from "get-blob-duration";
import { useRouter } from "next/router";
import create from "zustand";
import { combine } from "zustand/middleware";
import shallow from "zustand/shallow";

export const useUploadSoundbiteStore = create(
  combine({ thumbnail: null as File | null, audio: "" }, (set) => ({
    setThumbnail: (thumbnail: File) => set({ thumbnail }),
    setAudio: (audio: string) => set({ audio }),
  }))
);

export const useUploadSoundbite = () => {
  const [thumbnail, audio, setThumbnail, setAudio] = useUploadSoundbiteStore(
    (x) => [x.thumbnail, x.audio, x.setThumbnail, x.setAudio],
    shallow
  );
  const [createSoundbite] = useCreateSoundbiteMutation();
  const router = useRouter();

  async function upload(values: { title: string; description?: string }) {
    if (!audio) return alert("Please record a SoundBite before uploading");
    const audioBlob = await fetch(audio).then((r) => r.blob());
    console.log(audioBlob);

    const length = Math.floor(await getBlobDuration(audioBlob));

    createSoundbite({
      variables: {
        thumbnail,
        audio: audioBlob,
        data: { ...values, length },
      },
    });
    router.push("/");
  }

  return { setAudio, thumbnail, audio, setThumbnail, upload };
};
