import { IconApps, IconCheck, IconCommand } from "@tabler/icons";
import React from "react";

interface EditorEmptyStateProps {}

export const EditorEmptyState: React.FC<EditorEmptyStateProps> = ({}) => {
  return (
    <div className="select-none">
      <ul className="space-y-5">
        <li className="flex items-center space-x-2 text-gray-500">
          <IconApps className="w-6 h-6 text-gray-300" />
          <span>Press Enter to continue with an empty draft</span>
        </li>
        <li className="flex items-center space-x-2 text-gray-500">
          <IconCommand className="w-6 h-6 text-gray-300" />
          <span>Press &apos;/&apos; to bring up a command palette</span>
        </li>
      </ul>
      <div className="grid grid-cols-2 mt-12">
        <div>
          <h6 className="text-gray-500 font-bold mb-4">Get Started</h6>
          <ul className="space-y-4">
            <li className="text-gray-500 flex items-center space-x-2">
              <IconCheck className="w-6 h-6 text-gray-300" />
              <a>Create your first article</a>
            </li>
            <li className="text-gray-500 flex items-center space-x-2">
              <IconCheck className="w-6 h-6 text-gray-300" />
              <a>Earning revenue from your audience</a>
            </li>
            <li className="text-gray-500 flex items-center space-x-2">
              <IconCheck className="w-6 h-6 text-gray-300" />
              <a>Blog &amp; Help Center</a>
            </li>
            <li className="text-gray-500 flex items-center space-x-2">
              <IconCheck className="w-6 h-6 text-gray-300" />
              <a>Upgrade to Pro</a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-gray-500 font-bold mb-4">Writing Guides</h6>
          <ul className="space-y-4">
            <li className="text-gray-500 flex items-center space-x-2">
              <IconCheck className="w-6 h-6 text-gray-300" />
              <a>Blog &amp; Help Center</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
