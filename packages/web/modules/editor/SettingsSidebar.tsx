import { IconCameraPlus } from "@tabler/icons";
import React from "react";
import { Button } from "../../components/button";
import { InputField, TextareaField } from "../../components/input";

interface SettingsSidebarProps {}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({}) => {
  return (
    <aside className="hidden xl:block px-6 py-9 h-full w-full max-w-sm border-l bg-white space-y-8 overflow-y-auto">
      <InputField
        name="canonical"
        label="Canonical Link"
        description="Link the original publishing link. Presage sets this URL as it’s canonical meta tag."
        placeholder="Enter your canonical..."
        className="w-full"
        outline
      />
      <InputField
        name="tags"
        label="Tags"
        description="Enter comma separated tags (up to five and without hashtags)"
        placeholder="star wars, movies, review"
        className="w-full"
        outline
      />
      <TextareaField
        label="Description"
        name="description"
        placeholder="Enter your description..."
        className="w-full"
        outline
      />
      <div>
        <label className="font-bold mb-2 block">Cover Image</label>
        <Button
          icon={<IconCameraPlus className="text-gray-600" size={20} />}
          outline
        >
          <span className="text-gray-600 font-semibold">Insert Cover</span>
        </Button>
      </div>
    </aside>
  );
};
