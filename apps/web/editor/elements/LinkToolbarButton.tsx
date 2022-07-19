import { focusEditor } from "@udecode/plate";
import {
  getPluginType,
  someNode,
  useEventPlateId,
  usePlateEditorState,
  withPlateEventProvider,
} from "@udecode/plate-core";
import { ELEMENT_LINK, triggerFloatingLink } from "@udecode/plate-link";
import { ToolbarButtonProps } from "@udecode/plate-ui-toolbar";

export interface LinkToolbarButtonProps extends ToolbarButtonProps {
  /**
   * Default onMouseDown is getting the link url by calling this promise before inserting the image.
   */
  getLinkUrl?: (prevUrl: string | null) => Promise<string | null>;
}

export const LinkToolbarButton = withPlateEventProvider(
  ({ id, getLinkUrl, icon, ...props }: LinkToolbarButtonProps) => {
    id = useEventPlateId(id);
    const editor = usePlateEditorState(id)!;

    const type = getPluginType(editor, ELEMENT_LINK);
    const isLink = !!editor?.selection && someNode(editor, { match: { type } });

    return (
      <span
        role="button"
        // active={isLink}
        className="select-none p-1 rounded-lg"
        onMouseDown={async (event) => {
          if (!editor) return;

          event.preventDefault();
          event.stopPropagation();

          focusEditor(editor, editor.selection ?? editor.prevSelection!);
          triggerFloatingLink(editor, { focused: true });
        }}
        {...props}
      >
        {icon}
      </span>
    );
  }
);
