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
          <Input icon={<IconAt size={18} />} placeholder="Username" />
          <hr className="dark:border-gray-800 dark:border-b-2" />
          <Input
            icon={<IconBrandTwitter size={18} />}
            placeholder="Twitter URL"
          />
          <Input
            icon={<IconBrandInstagram size={18} />}
            placeholder="Instagram URL"
          />
          <Input
            icon={<IconBrandGithub size={18} />}
            placeholder="GitHub URL"
          />
          <Input
            icon={<IconBrandYoutube size={18} />}
            placeholder="Youtube URL"
          />
          <Input
            icon={<IconBrandMedium size={16} />}
            placeholder="Medium URL"
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
