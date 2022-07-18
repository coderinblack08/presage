import { IconBold, IconCode, IconItalic, IconUnderline } from "@tabler/icons";
import {
  getPluginType,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from "@udecode/plate";
import React from "react";
import { useMyPlateEditorRef } from "../types/plate";
import { BalloonToolbar } from "./BalloonToolbar";
import { StyledToolbarMark } from "./StyledToolbarMark";

export const MarkBalloonToolbar: React.FC = () => {
  const editor = useMyPlateEditorRef()!;

  return (
    <BalloonToolbar
      theme="dark"
      arrow={false}
      floatingOptions={{ placement: "top-start" }}
    >
      <StyledToolbarMark
        type={getPluginType(editor, MARK_BOLD)}
        icon={<IconBold className="block" size={20} />}
      />
      <StyledToolbarMark
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<IconItalic className="block" size={20} />}
      />
      <StyledToolbarMark
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<IconUnderline className="block" size={20} />}
      />
      <StyledToolbarMark
        type={getPluginType(editor, MARK_CODE)}
        icon={<IconCode className="block" size={20} />}
      />
    </BalloonToolbar>
  );
};
