import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React from "react";

export const CodeBlockComponent: React.FC<NodeViewProps> = ({
  extension,
  node,
  editor,
  updateAttributes,
}) => {
  return (
    <NodeViewWrapper className="code-block relative">
      {editor.isEditable ? (
        <select
          className="absolute px-2 top-4 left-4 text-gray-200 bg-[#0c0d13] cursor-pointer"
          contentEditable="false"
          value={node.attrs.language}
          onChange={(e) => {
            if (e.target.value) {
              updateAttributes({ language: e.target.value });
            }
          }}
        >
          <option value={undefined}>auto</option>
          <option disabled>—</option>
          {extension.options.lowlight
            .listLanguages()
            .map((language: string, key: number) => (
              <option value={language} key={key}>
                {language}
              </option>
            ))}
        </select>
      ) : null}
      <pre>
        <div className={editor.isEditable ? "pt-8" : ""}>
          <NodeViewContent as="code" />
        </div>
      </pre>
    </NodeViewWrapper>
  );
};
