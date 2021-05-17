import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 } from "uuid";
import getBlobDuration from "get-blob-duration";
import { supabase } from "../../lib/supabase";
import { useUser } from "../../stores/auth";

export const useUploadSoundbite = () => {
  const { user } = useUser();
  const [audio, setAudio] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const router = useRouter();

  async function upload(values: { title: string; description?: string }) {
    if (!audio) return alert("Please record a SoundBite before uploading");

    let length: number;
    const id = v4();
    const audioFile = await fetch(audio)
      .then((r) => r.blob())
      .then(async (blobFile) => {
        length = await getBlobDuration(blobFile);
        return new File([blobFile], id, { type: "audio/mp3" });
      });

    const audioPath = user.id + "-" + id;
    const body: Record<string, any> = {
      id,
      length: Math.floor(length),
      audio: audioPath,
      userId: user.id,
      ...values,
    };

    const { error } = await supabase.storage
      .from("soundbites")
      .upload(audioPath, audioFile);
    if (error) throw error;

    if (thumbnail) {
      const filePath = user.id + "-" + id + "-" + thumbnail.name;
      const formData = new FormData();
      formData.append("image", thumbnail);

      const response = await axios.post(
        `/api/image?w=400&h=400&bucket=thumbnails&path=${filePath}&access_token=${
          supabase.auth.session().access_token
        }`,
        formData,
        { headers: { "content-type": "multipart/form-data" } }
      );
      console.log(response);

      const {
        data: { signedURL },
      } = await supabase.storage
        .from("thumbnails")
        .createSignedUrl(filePath, 60 * 60 * 24 * 365 * 1000);
      body.thumbnailUrl = signedURL;
    }

    const { error: soundbiteError } = await supabase
      .from("soundbites")
      .insert(body);
    if (soundbiteError) throw soundbiteError;
    router.push("/");
  }

  return { setAudio, thumbnail, audio, setThumbnail, upload };
};
