import { CloudUploadIcon } from "@heroicons/react/outline";
import React from "react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { SoundbiteCard } from "../components/SoundbiteCard";

const Publishers: React.FC = () => {
  return (
    <div>
      <header className="sticky z-50 top-0">
        <Navbar noBlur />
        <div className="max-w-4xl mx-auto bg-black pt-10 pb-20 border-b-2 border-darkest-gray">
          <h3>Soundbites</h3>
          <p className="text-gray mt-2">
            Listen to your favorite short-form podcasts and audio-centric
            content
          </p>
          <div className="flex items-center justify-between mt-5">
            <nav className="flex items-center space-x-2">
              <Button size="small">Recommended</Button>
              <Button size="small" color="secondary">
                Explore
              </Button>
              <Button size="small" color="secondary">
                All
              </Button>
            </nav>
            <Button
              icon={<CloudUploadIcon className="text-white w-4 h-4" />}
              size="small"
            >
              Upload
            </Button>
          </div>
        </div>
      </header>
      <div className="max-w-4xl w-full mx-auto px-6">
        <main className="py-12 overflow-y-auto">
          <SoundbiteCard />
          <SoundbiteCard />
          <SoundbiteCard />
          <SoundbiteCard />
          <SoundbiteCard />
          <SoundbiteCard />
          <SoundbiteCard />
          <SoundbiteCard />
          <SoundbiteCard />
          <SoundbiteCard />
        </main>
      </div>
    </div>
  );
};

export default Publishers;
