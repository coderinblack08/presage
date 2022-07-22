import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import useHover from "react-use-hover";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

const ComponentWrapper: React.FC<NodeViewProps> = ({
  node,
  extension,
  editor,
  getPos,
}) => {
  // const [isHovering, hoverProps] = useHover();

  return (
    <NodeViewWrapper
      className={`draggable-item group ${
        node.attrs.nestedParentType === "listItem" ? "!my-0 !p-0" : ""
      }`}
    >
      {node.attrs.topLevel && (
        <div
          contentEditable="false"
          draggable="true"
          className={`drag-handle group-hover:visible invisible transition`}
          data-drag-handle
        ></div>
      )}
      <NodeViewContent
        className={`content m-0 p-0`}
        as={
          { heading: "h1", paragraph: "p", blockquote: "blockquote" }[
            node.type.name
          ]
        }
      />
    </NodeViewWrapper>
  );
};

export const DraggableItems = [
  Paragraph.extend({
    draggable: true,
    addNodeView() {
      return ReactNodeViewRenderer(ComponentWrapper);
    },
  }),
  Heading.extend({
    draggable: true,
    // addKeyboardShortcuts() {
    //   return {
    //     Enter: ({ editor }) => {
    //       return editor.commands.createParagraphNear();
    //     },
    //   };
    // },
    addNodeView() {
      return ReactNodeViewRenderer(ComponentWrapper);
    },
  }).configure({ levels: [1] }),
  Blockquote.extend({
    draggable: true,
    addNodeView() {
      return ReactNodeViewRenderer(ComponentWrapper);
    },
  }),
];
