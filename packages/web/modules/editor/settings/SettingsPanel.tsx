import { IconDots } from "@tabler/icons";
import React from "react";
import { Button } from "../../../components/button";
import { Sidepanel, SidepanelTrigger } from "../../../components/sidepanel";
import { SettingsSidebar } from "./SettingsSidebar";

interface SettingsPanelProps {}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({}) => {
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
      <SettingsSidebar />
    </Sidepanel>
  );
};
