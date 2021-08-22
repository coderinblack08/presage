import { IconCameraPlus } from "@tabler/icons";
import React from "react";
import { Button } from "../../components/button";
import { Input, Textarea } from "../../components/input";

interface SettingsSidebarProps {}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({}) => {
  return (
    <aside className="hidden xl:block px-5 py-8 h-full w-full max-w-sm border-l bg-white space-y-3">
      <Input placeholder="Enter your canonical..." className="w-full" outline />
      <Input
        placeholder="star wars, movies, review"
        className="w-full"
        outline
      />
      <Textarea
        placeholder="Enter your description..."
        className="w-full"
        outline
      />
      <div>
        <label className="font-bold mb-2 block">Cover Image</label>
        <Button
          icon={<IconCameraPlus size={20} />}
          className="text-gray-600"
          outline
        >
          Insert Cover
        </Button>
      </div>
    </aside>
  );
};
