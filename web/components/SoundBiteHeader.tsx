import React from "react";
import { useOnPath } from "../lib/onPath";

export interface SoundbiteHeaderProps {
  title?: string;
  hideSubtitle?: boolean;
}

export const SoundbiteHeader: React.FC<SoundbiteHeaderProps> = ({
  title = "SoundBites",
  hideSubtitle = false,
}) => {
  const onPath = useOnPath();

  return (
    <header className="px-6 max-w-4xl bg-black pb-16">
      <h3>{title}</h3>
      {!hideSubtitle && (
        <p className="text-gray mt-2">
          Listen to your favorite short-form podcasts and audio-centric content
        </p>
      )}
    </header>
  );
};
