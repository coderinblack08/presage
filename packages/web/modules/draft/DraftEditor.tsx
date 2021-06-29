/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Bookmark, Image } from "react-iconly";
import { Button } from "../../components/Button";
import { TipTapEditor } from "./TipTapEditor";

interface DraftEditorProps {}

export const DraftEditor: React.FC<DraftEditorProps> = ({}) => {
  return (
    <div>
      <header className="flex items-center space-x-8">
        <Button
          icon={
            <div className="scale-80">
              <Image set="bulk" />
            </div>
          }
          color="transparent"
          size="none"
        >
          <span className="text-gray-300 font-semibold">Upload Cover</span>
        </Button>
        <Button
          icon={
            <div className="scale-80">
              <Bookmark set="bulk" />
            </div>
          }
          color="transparent"
          size="none"
        >
          <span className="text-gray-300 font-semibold">Add Tags</span>
        </Button>
      </header>
      <div className="space-y-3 mt-5 w-full">
        <input
          type="text"
          className="bg-gray-700 placeholder-gray-400 h2 w-full focus:outline-none leading-tight"
          placeholder="Untitled"
        />
        <p className="text-gray-400">
          <span className="text-gray-300">0/100</span> characters used
        </p>
        <div className="border-b border-gray-600 pt-4" />
        <TipTapEditor />
      </div>
    </div>
  );
};
