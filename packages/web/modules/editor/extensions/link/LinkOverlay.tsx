import BubbleMenu from "@tiptap/extension-bubble-menu";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { useEffect } from "react";
import { Input } from "../../../../components/input";
import { isServer } from "../../../../lib/constants";
import { useLinkStore } from "./useLinkStore";

export const LinkOverlayExtension = BubbleMenu.configure({
  pluginKey: "linkOverlay",
  element: (isServer() ? null : document.querySelector("#link-overlay")) as any,
  tippyOptions: { placement: "bottom", maxWidth: "32rem" },
  shouldShow: ({ editor }) => {
    const {
      show,
      closeUntilNextOpen,
      setCloseUntilNextOpen,
    } = useLinkStore.getState();
    if (closeUntilNextOpen) {
      setCloseUntilNextOpen(false);
    }
    return (
      editor.isActive("link") &&
      (show ||
        (editor.getAttributes("link").href !== "" && !closeUntilNextOpen))
    );
  },
});

export const LinkOverlay: React.FC<{ editor: Editor | null }> = ({
  editor,
}) => {
  const [value, setValue] = useState(editor?.getAttributes("link").href || "");

  return (
    <div
      id="link-overlay"
      className="bg-white p-2 rounded-lg border shadow w-96"
    >
      <Input
        id="link"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            editor?.chain().focus().setLink({ href: value }).run();
            useLinkStore.getState().setShow(false);
            useLinkStore.getState().setCloseUntilNextOpen(true);
          }
        }}
        placeholder="External Link URL"
        outline
      />
    </div>
  );
};

export const setLink = (editor: Editor) => {
  useLinkStore.getState().setShow(true);
  editor.chain().focus().setLink({ href: "" }).run();
};
