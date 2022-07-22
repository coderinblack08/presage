import Blockquote from "@tiptap/extension-blockquote";
import { dropPoint } from "prosemirror-transform";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { lowlight } from "lowlight/lib/common.js";
import {
  Plugin,
  Selection,
  NodeSelection,
  TextSelection,
} from "prosemirror-state";

function eventCoords(event: MouseEvent) {
  return { left: event.clientX, top: event.clientY };
}

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
          className={`drag-handle group-hover:opacity-100 opacity-0 transition`}
          style={{
            top: {
              heading: "0.5rem",
              paragraph: "0.4rem",
              blockquote: "0.4rem",
              orderedList: "0.8rem",
              bulletList: "0.8rem",
              codeBlock: "0.8rem",
            }[node.type.name],
          }}
          data-drag-handle
        ></div>
      )}
      <NodeViewContent
        className={`content m-0 p-0 ${
          node.type.name === "orderedList" || node.type.name === "bulletList"
            ? "pl-5"
            : ""
        }`}
        as={
          {
            heading: "h1",
            paragraph: "p",
            blockquote: "blockquote",
            orderedList: "ol",
            bulletList: "ul",
            codeBlock: "pre",
          }[node.type.name]
        }
      />
    </NodeViewWrapper>
  );
};

export const DraggableItems = [
  CodeBlockLowlight.extend({
    addOptions() {
      return {
        ...this.parent?.(),
        lowlight,
      };
    },
    draggable: true,
    selectable: false,
    addNodeView() {
      return ReactNodeViewRenderer(ComponentWrapper);
    },
  }),
  Paragraph.extend({
    draggable: true,
    selectable: false,
    addProseMirrorPlugins() {
      return [
        new Plugin({
          props: {
            handleDrop(view, event, slice, moved) {
              // pulled from the `prosemirror-view` codebase (couldn't think of more concise solution)

              // calculate the coordinates in which the drag ends
              let eventPos = view.posAtCoords(eventCoords(event));
              let $mouse = view.state.doc.resolve(eventPos!.pos);

              // find the insertion point
              let insertPos = slice
                ? dropPoint(view.state.doc, $mouse.pos, slice)
                : $mouse.pos;
              if (insertPos == null) insertPos = $mouse.pos;

              let tr = view.state.tr;
              // if the node moves, delete the current selection
              if (moved) tr.deleteSelection();

              // mapping to change the current positions to the new positions
              let pos = tr.mapping.map(insertPos);
              let isNode =
                slice.openStart == 0 &&
                slice.openEnd == 0 &&
                slice.content.childCount == 1;
              let beforeInsert = tr.doc;
              if (isNode)
                tr.replaceRangeWith(pos, pos, slice.content.firstChild!);
              else tr.replaceRange(pos, pos, slice);
              if (tr.doc.eq(beforeInsert)) return;

              let $pos = tr.doc.resolve(pos);
              if (
                isNode &&
                NodeSelection.isSelectable(slice.content.firstChild!) &&
                $pos.nodeAfter &&
                $pos.nodeAfter.sameMarkup(slice.content.firstChild!)
              ) {
                tr.setSelection(new NodeSelection($pos));
              } else {
                // in our use case, selectable is false so this chunk run
                let end = tr.mapping.map(insertPos);
                tr.mapping.maps[tr.mapping.maps.length - 1].forEach(
                  (_from, _to, _newFrom, newTo) => (end = newTo)
                );
                tr.setSelection(
                  new TextSelection(tr.doc.resolve($pos.pos))
                ).scrollIntoView();
              }
              view.focus();
              view.dispatch(tr.setMeta("uiEvent", "drop"));

              // prevent prosemirror from handling the drop for us
              return true;
            },
          },
        }),
      ];
    },
    addNodeView() {
      return ReactNodeViewRenderer(ComponentWrapper);
    },
  }),
  Heading.extend({
    draggable: true,
    selectable: false,
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
    selectable: false,
    addNodeView() {
      return ReactNodeViewRenderer(ComponentWrapper);
    },
  }),
  BulletList.extend({
    draggable: true,
    selectable: false,
    addNodeView() {
      return ReactNodeViewRenderer(ComponentWrapper);
    },
  }),
  OrderedList.extend({
    draggable: true,
    selectable: false,
    addNodeView() {
      return ReactNodeViewRenderer(ComponentWrapper);
    },
  }),
];
