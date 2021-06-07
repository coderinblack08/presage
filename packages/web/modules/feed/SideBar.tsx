import React from "react";
import { MdQueueMusic } from "react-icons/md";
import { Panel } from "../../components/Panel";
import { PanelCard } from "./PanelCard";

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = ({}) => {
  return (
    <aside className="max-w-sm space-y-6">
      <Panel header="Current Events" footer="Listen to More">
        <PanelCard
          title="G7 backs Biden's sweeping overhaul"
          image="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/HBEHGVWHI5PYRO2GRVXIO7NXZY.jpg"
          publisher="CNN"
          time="3:15"
        />
      </Panel>
    </aside>
  );
};
