import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

const ComponentWrapper: React.FC<NodeViewProps> = ({ node }) => {
  // const [isHovering, hoverProps] = useHover();

  return (
    <NodeViewWrapper
      className={`draggable-item group ${
        node.attrs.nestedParentType === "listItem" ? "m-0 p-0" : ""
      }`}
    >
      {node.attrs.topLevel && (
        <div
          contentEditable="false"
          draggable="true"
          className={`drag-handle group-hover:visible invisible transition`}
          style={{
            top: {
              heading: "0.8rem",
              paragraph: "0.4rem",
              blockquote: "0.4rem",
              orderedList: "0.8rem",
              bulletList: "0.8rem",
            }[node.type.name],
          }}
          data-drag-handle
        ></div>
      )}
      <NodeViewContent
        className={`content m-0 p-0 ${
          node.type.name === "orderedList" || node.type.name === "bulletList"
            ? "pl-8"
            : ""
        }`}
        as={
          {
            heading: "h1",
            paragraph: "p",
            blockquote: "blockquote",
            orderedList: "ol",
            bulletList: "ul",
          }[node.type.name]
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
  BulletList.extend({
    draggable: true,
    addNodeView() {
      return ReactNodeViewRenderer(ComponentWrapper);
    },
  }),
  OrderedList.extend({
    draggable: true,
    addNodeView() {
      return ReactNodeViewRenderer(ComponentWrapper);
    },
  }),
];
