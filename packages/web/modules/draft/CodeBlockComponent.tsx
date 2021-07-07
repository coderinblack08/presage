// import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
// import React from "react";

// export const CodeBlockComponent: React.FC<NodeViewProps> = ({
//   extension,
//   node,
//   updateAttributes,
// }) => {
//   return (
//     <NodeViewWrapper className="code-block">
//       <select
//         contentEditable="false"
//         value={node.attrs.language}
//         onChange={(e) => {
//           if (e.target.value) {
//             updateAttributes({ language: e.target.value });
//           }
//         }}
//       >
//         <option value={undefined}>auto</option>
//         <option disabled>—</option>
//         {extension.options.lowlight
//           .listLanguages()
//           .map((language: string, key: number) => (
//             <option value={language} key={key}>
//               {language}
//             </option>
//           ))}
//       </select>
//       <pre>
//         <NodeViewContent as="code" />
//       </pre>
//     </NodeViewWrapper>
//   );
// };

import React from "react";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export const CodeBlockComponent: React.FC<NodeViewProps> = () => {
  return (
    <NodeViewWrapper class="code-block">
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};
