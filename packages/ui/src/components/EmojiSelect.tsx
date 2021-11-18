import * as Popover from "@radix-ui/react-popover";
import { IconSearch } from "@tabler/icons";
import React, { useState } from "react";
import { emojisByName } from "../utils/emojisByGroup";
import { Button } from "./Button";
import { IconInput } from "./IconInput";

interface EmojiSelectProps {
  setExternal?: (emoji: string) => void;
}

export const EmojiSelect: React.FC<EmojiSelectProps> = ({ setExternal }) => {
  const [emoji, setEmoji] = useState("😀");
  const [search, setSearch] = useState("");

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          className="w-12 h-12 text-xl inline-block"
          variant="outline"
          color="secondary"
        >
          {emoji}
        </Button>
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Content align="center">
        <div className="bg-white border rounded-xl shadow-sm w-72 h-72 overflow-y-auto">
          <header className="p-2 bg-white/50 backdrop-blur-lg sticky top-0">
            <IconInput
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<IconSearch size={20} className="text-gray-400" />}
            />
          </header>
          <div className="grid grid-cols-4 gap-2 p-2">
            {Object.keys(emojisByName)
              .filter((x) =>
                emojisByName[x].name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((entry: any) => (
                <Button
                  key={emojisByName[entry].slug}
                  onClick={() => {
                    setEmoji(entry);
                    if (setExternal) setExternal(entry);
                  }}
                  color="secondary"
                  variant="outline"
                  className={`text-xl border-none shadow-none ${
                    emoji === entry ? "bg-gray-200" : ""
                  }`}
                >
                  {entry}
                </Button>
              ))}
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};
