import { Editor, Extension } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { render as renderReact } from "react-dom";

export interface CustomCursorPluginProps {
  pluginKey: PluginKey | string;
  editor: Editor;
}

export type CustomCursorViewProps = CustomCursorPluginProps & {
  view: EditorView;
};

export class CustomCursorView {
  public editor: Editor;

  public element: HTMLElement;

  public view: EditorView;

  public preventHide = false;

  constructor({ editor, view }: CustomCursorViewProps) {
    this.editor = editor;
    this.element = document.createElement("div");
    view.dom.parentNode?.appendChild(this.element);

    window.addEventListener("scroll", (event) => {
      this.update(view);
    });

    this.view = view;
  }

  posToDOMRect(view: EditorView) {
    const { from, to } = view.state.selection;
    const start = view.coordsAtPos(from),
      end = view.coordsAtPos(to);
    const top = Math.min(start.top, end.top);
    const bottom = Math.max(start.bottom, end.bottom);
    // left and right calculation from the example
    const left = Math.max((start.left + end.left) / 2, start.left);
    const right = Math.max((start.right + end.right) / 2, start.right);
    const width = right - left;
    const height = bottom - top;
    const x = left;
    const y = top;
    const data = {
      top,
      bottom,
      left,
      right,
      width,
      height,
      x,
      y,
    };
    return {
      ...data,
      toJSON: () => data,
    };
  }

  render(view: EditorView) {
    // const { from, to, empty } = view.state.selection;

    // const start = view.coordsAtPos(from);
    // const end = view.coordsAtPos(to);
    // const box = this.element.offsetParent?.getBoundingClientRect();
    // const left = Math.max((start.left + end.left) / 2, start.left + 3);

    const { state } = view;
    const { selection } = state;
    const { ranges } = selection;
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));

    const { left, top, height } = this.posToDOMRect(view);
    const numberOfCharactersInSelection = to - from;
    const width = this.editor.isActive("heading") ? 5 : 3;

    return (
      <div
        style={{
          position: "fixed",
          zIndex: 9999,
          backgroundColor: "red",
          display: numberOfCharactersInSelection > 0 ? "none" : "block",
          left: `${left - width / 2}px`,
          top: `${top - height * 0.1}px`,
          width,
          height: height * 1.2,
          borderRadius: 9999,
          transition: "all 80ms ease-in-out",
        }}
      />
    );
  }

  update(view: EditorView, lastState?: EditorState) {
    const { state } = view;
    const { doc, selection } = state;

    if (lastState && lastState.doc.eq(doc) && lastState.selection.eq(selection))
      return;

    const cursorComponent = this.render(view);
    if (cursorComponent) {
      renderReact(cursorComponent, this.element);
    }
  }

  // update(view: EditorView, oldState?: EditorState) {
  //   const { state, composing } = view;
  //   const { doc, selection } = state;
  //   const isSame =
  //     oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection);

  //   if (composing || isSame) {
  //     return;
  //   }
  //   const getReferenceClientRect = () => {
  //     const { ranges } = selection;
  //     const from = Math.min(...ranges.map((range) => range.$from.pos));
  //     const to = Math.max(...ranges.map((range) => range.$to.pos));
  //     if (isNodeSelection(state.selection)) {
  //       const node = view.nodeDOM(from) as HTMLElement;

  //       if (node) {
  //         console.log(node.getBoundingClientRect());
  //         return node.getBoundingClientRect();
  //       }
  //     }

  //     return posToDOMRect(view, from, to);
  //   };

  //   const { left, top, height } = getReferenceClientRect();

  //   this.element.style.position = "fixed";
  //   this.element.style.top = `${top}px`;
  //   this.element.style.left = `${left}px`;
  //   this.element.style.height = `${height}px`;
  //   // console.log(this.element.style);
  // }

  destroy() {
    this.element.remove();
  }
}

export const CustomCursorPlugin = (options: CustomCursorPluginProps) => {
  return new Plugin({
    key:
      typeof options.pluginKey === "string"
        ? new PluginKey(options.pluginKey)
        : options.pluginKey,
    view: (view) => new CustomCursorView({ view, ...options }),
  });
};

export type CustomCursorOptions = Omit<
  CustomCursorPluginProps,
  "editor" | "element"
>;

export const CustomCursor = Extension.create<CustomCursorOptions>({
  name: "customCursor",

  addOptions() {
    return {
      pluginKey: "customCursor",
    };
  },

  addProseMirrorPlugins() {
    return [
      CustomCursorPlugin({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
      }),
    ];
  },
});
