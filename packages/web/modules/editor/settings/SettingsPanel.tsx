import { IconDots } from "@tabler/icons";
import React from "react";
import { Button } from "../../../components/button";
import { Sidepanel, SidepanelTrigger } from "../../../components/sidepanel";
import { Article } from "../../../types";
import { SettingsSidebar } from "./SettingsSidebar";

interface SettingsPanelProps {
  draft: Article;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ draft }) => {
  return (
    <Sidepanel
      trigger={
        <SidepanelTrigger>
          <Button
            type="button"
            icon={<IconDots size={20} />}
            size="small"
            outline
          />
        </SidepanelTrigger>
      }
      align="right"
    >
      <SettingsSidebar draft={draft} />
    </Sidepanel>
  );
};
