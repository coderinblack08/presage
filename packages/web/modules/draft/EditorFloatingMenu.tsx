import { Editor, FloatingMenu } from "@tiptap/react";
import React, { useRef } from "react";
import { MdCode, MdImage } from "react-icons/md";
import { useMutation } from "react-query";
import { mutator } from "../../lib/mutator";

interface EditorFloatingMenuProps {
  editor: Editor;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    codeblock: {
      toggleCodeBlock: () => ReturnType;
    };
  }
}

export const EditorFloatingMenu: React.FC<EditorFloatingMenuProps> = ({
  editor,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useMutation(mutator);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple={false}
        className="hidden"
        ref={ref}
        onChange={async (e) => {
          if (e.target.files) {
            const data = new FormData();
            data.append("image", e.target.files[0]);
            try {
              await mutateAsync([`/image`, data, "post"], {
                onSuccess: ({ url }) => {
                  editor
                    .chain()
                    .focus()
                    .setImage({
                      src: url,
                    })
                    .run();
                },
              });
            } catch (error) {
              console.error(error);
            }
          }
        }}
      />
      <FloatingMenu
        className="flex items-center overflow-hidden rounded-lg divide-x divide-gray-200 bg-white shadow"
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        <button
          type="button"
          className="px-4 py-1.5 focus:outline-none"
          onClick={() => {
            editor.chain().focus().toggleCodeBlock().run();
          }}
        >
          <MdCode className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="px-4 py-1.5 focus:outline-none"
          onClick={() => {
            ref.current?.click();
          }}
        >
          <MdImage className="w-5 h-5" />
        </button>
      </FloatingMenu>
    </>
  );
};
