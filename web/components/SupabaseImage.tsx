import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Image from "next/image";

interface SupabaseImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  path: string;
  bucket: string;
}

export const SupabaseImage: React.FC<SupabaseImageProps> = ({
  path,
  bucket,
  width,
  height,
  ...props
}) => {
  const [url, setUrl] = useState<string | null>();

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, 60 * 60 * 24 * 365);
      setUrl(data.signedURL);
    } catch (error) {
      console.error("Error downloading image: ", error.message);
    }
  };
  useEffect(() => {
    if (path) {
      downloadImage(path);
    }
  }, [path]);

  return (
    <div>
      {url ? (
        <Image src={url} width={width} height={height} priority {...props} />
      ) : null}
    </div>
  );
};
