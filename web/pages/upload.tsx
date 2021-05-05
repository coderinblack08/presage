import {
  FolderAddIcon,
  MicrophoneIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Layout } from "../layout/Layout";
import { useDevices } from "../lib/useDevices";

const Upload: React.FC = () => {
  const { devices } = useDevices();

  return (
    <Layout title="Upload SoundBite">
      <div className="flex items-center justify-between">
        <h4>Record</h4>
        {devices.length ? (
          <Select
            defaultValue={devices[0].label}
            items={devices.map((x) => x.label)}
          />
        ) : null}
      </div>
      <div className="flex items-center space-x-6 w-full mt-4">
        <button className="p-4 rounded-full bg-primary hover:bg-faint-primary">
          <MicrophoneIcon className="text-white w-6 h-6" />
        </button>
        <div className="flex-grow">
          <div className="w-full">
            <Slider
              min={0}
              max={300}
              value={21.51}
              railStyle={{ backgroundColor: "#282F42" }}
              trackStyle={{ backgroundColor: "#E4E7F1" }}
              handleStyle={{
                backgroundColor: "#FFFFFF",
                border: "none",
              }}
            />
          </div>
          <div className="relative flex items-center w-full">
            <p className="absolute left-0 font-bold">00:21.51</p>
            <div className="flex items-center justify-center space-x-2 w-full">
              <button>
                <img
                  src="/icons/replay10.svg"
                  alt="Replay 10 Seconds"
                  className="text-white w-8 h-8"
                />
              </button>
              <button>
                <img
                  src="/icons/play.svg"
                  alt="Play"
                  className="text-white w-12 h-12"
                />
              </button>
              <button>
                <img
                  src="/icons/forward10.svg"
                  alt="Forward 10 Seconds"
                  className="text-white w-8 h-8"
                />
              </button>
              <button>
                <TrashIcon className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="small text-gray mt-2">
        Or upload an{" "}
        <a href="#" className="text-primary small">
          audio file
        </a>{" "}
        · 5 minute limit
      </p>
      <Input
        placeholder="SoundBite Description"
        className="mt-10 h-32"
        textarea
      />
      <div className="flex flex-col items-center mt-3 py-8 px-12 w-full rounded-lg border border-darker-gray bg-darkest-gray">
        <FolderAddIcon className="mb-2 w-12 h-12 text-primary" />
        <p className="text-gray">Pick or drag and drop a thumbnail</p>
      </div>
      <Button className="w-full mt-5">Publish SoundBite</Button>
    </Layout>
  );
};

export default Upload;
