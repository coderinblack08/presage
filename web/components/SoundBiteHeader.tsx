import { CloudUploadIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { useOnPath } from "../lib/onPath";
import { Button } from "./Button";
import { Navbar } from "./Navbar";

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
    <header className="sticky z-50 top-0">
      <Navbar noBlur />
      <div className="px-6 max-w-4xl mx-auto bg-black py-20 border-b-2 border-darkest-gray">
        <h3>{title}</h3>
        {!hideSubtitle && (
          <p className="text-gray mt-2">
            Listen to your favorite short-form podcasts and audio-centric
            content
          </p>
        )}
        <div className="flex items-center justify-between mt-5">
          <nav className="flex items-center space-x-2">
            <Link href="/soundbites">
              <Button
                size="small"
                color={onPath("/soundbites") ? "primary" : "secondary"}
              >
                Recommended
              </Button>
            </Link>
            <Button size="small" color="secondary">
              Explore
            </Button>
            <Button size="small" color="secondary">
              All
            </Button>
          </nav>
          <Link href="/upload">
            <Button
              icon={<CloudUploadIcon className="text-white w-4 h-4" />}
              size="small"
            >
              Upload
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
