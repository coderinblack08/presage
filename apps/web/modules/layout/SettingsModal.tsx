import {
  IconAt,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandMedium,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons";
import React from "react";
import { MdSettings } from "react-icons/md";
import { Button, Input, Modal } from "ui";

interface SettingsModalProps {}

export const SettingsModal: React.FC<SettingsModalProps> = ({}) => {
  return (
    <Modal
      trigger={
        <Button
          variant="ghost"
          icon={
            <MdSettings
              className="text-gray-300 dark:text-gray-600"
              size={20}
            />
          }
          className="w-full !justify-start !p-2 text-[13px]"
        >
          Settings
        </Button>
      }
      title="Basic Information"
    >
      <main className="max-w-2xl mx-auto">
        <form className="space-y-4">
          <Input
            label="Username"
            icon={<IconAt size={18} />}
            placeholder="johndoe"
          />
          <hr className="dark:border-gray-800 dark:border-b-2" />
          <Input
            icon={<IconBrandTwitter size={18} />}
            label="Twitter URL"
            placeholder="https://twitter.com/johndoe"
          />
          <Input
            icon={<IconBrandInstagram size={18} />}
            label="Instagram"
            placeholder="https://instagram.com/johndoe"
          />
          <Input
            icon={<IconBrandGithub size={18} />}
            label="GitHub"
            placeholder="https://github.com/johndoe"
          />
          <Input
            label="Youtube"
            icon={<IconBrandYoutube size={18} />}
            placeholder="https://youtube.com/c/johndoe"
          />
          <Input
            icon={<IconBrandMedium size={16} />}
            label="Medium"
            placeholder="https://johndoe.medium.com"
          />
          <hr className="dark:border-gray-800 dark:border-b-2" />
          <Input placeholder="Biography" textarea />
          <Button className="w-full" size="lg">
            Save Preferences
          </Button>
        </form>
      </main>
    </Modal>
  );
};
