/* eslint-disable */
import { mergeAttributes, Node } from "@tiptap/core";

import { inputRules } from "prosemirror-inputrules";

import {
  makeInlineMathInputRule,
  mathPlugin,
  mathSelectPlugin,
} from "@benrbray/prosemirror-math";

export const Math = Node.create({
  name: "math_inline",
  group: "inline math",
  content: "text*", // important!
  inline: true, // important!
  atom: true, // important!
  code: true,

  parseHTML() {
    return [
      {
        tag: "math-inline", // important!
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "math-inline",
      mergeAttributes({ class: "math-node" }, HTMLAttributes),
      0,
    ];
  },

  addProseMirrorPlugins() {
    const inputRulePlugin = inputRules({
      rules: [makeInlineMathInputRule(/\$\$(.+)\$\$/, this.type)],
    });

    return [mathPlugin, inputRulePlugin, mathSelectPlugin];
  },
});
