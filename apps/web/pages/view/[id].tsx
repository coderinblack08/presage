import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useEffect } from "react";
import {
  MdBookmark,
  MdChromeReaderMode,
  MdFavorite,
  MdInfo,
  MdReplyAll,
} from "react-icons/md";
import { Button } from "ui";
import { trpc } from "../../lib/trpc";
import {
  rteClass,
  viewOnlyExtensions,
} from "../../modules/editor/RichTextEditor";
import { FloatingActions } from "../../modules/layout/FloatingActions";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const ViewPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const { data: draft } = trpc.useQuery(["drafts.byId", { id }]);
  const editor = useEditor({
    editable: false,
    extensions: viewOnlyExtensions,
    editorProps: {
      attributes: {
        class: rteClass + " !ml-0",
      },
    },
  });

  useEffect(() => {
    if (draft?.content && editor)
      !editor.isDestroyed &&
        editor.commands.setContent(draft?.content as JSONContent);
  }, [draft?.content, editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Head>
        <title>{draft?.title}</title>
        <meta name="description" content={draft?.description || ""} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="keywords" content={draft?.tags.join(",")} />
        <meta name="author" content={draft?.user.username} />
      </Head>
      <div className="flex items-center space-x-1">
        <Button
          size="xs"
          className="text-base"
          variant="light"
          icon={<MdChromeReaderMode size={18} />}
        >
          Posts
        </Button>
        <Button size="xs" className="text-base" variant="ghost">
          Login
        </Button>
        {/* <Button size="xs" className="text-base" variant="ghost">
          Use Presage
        </Button> */}
      </div>
      <div className="my-20">
        <div className="text-gray-500 dark:text-gray-400 text-lg">
          {draft?.updatedAt ? formatDate(draft.updatedAt) : null}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-normal mt-0.5">
          {draft?.title}
        </h1>
        <h2 className="text-gray-500 dark:text-gray-400 text-lg mt-2">
          {draft?.description}
        </h2>
        <div className="flex items-center space-x-2 my-4 border-y-2 border-gray-200/60 dark:border-gray-800 py-2">
          <div className="dark:text-gray-100 text-left w-full flex items-center space-x-4">
            <img
              src={draft?.user.image}
              alt="Author profile picture"
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <h3 className="text-lg font-bold truncate">{draft?.user.name}</h3>
              <p className="text-gray-500 dark:text-blue-300 truncate">
                {draft?.user.username}
              </p>
            </div>
          </div>
          <button className="border-2 border-gray-200/60 dark:border-gray-800 rounded-lg p-4 text-gray-400 dark:text-gray-500">
            <MdFavorite size={20} />
            <p className="mt-0.5 text-lg font-semibold">0</p>
          </button>
          <button className="border-2 border-gray-200/60 dark:border-gray-800 rounded-lg p-4 text-gray-400 dark:text-gray-500">
            <MdBookmark size={20} />
            <p className="mt-0.5 text-lg font-semibold">0</p>
          </button>
          <button className="border-2 border-gray-200/60 dark:border-gray-800 rounded-lg p-4 text-gray-400 dark:text-gray-500">
            <MdReplyAll size={20} />
            <p className="mt-0.5 text-lg font-semibold">0</p>
          </button>
        </div>
        <main>
          <blockquote className="flex space-x-3 bg-blue-50 dark:bg-blue-400/10 p-4 rounded-lg text-blue-700 dark:text-blue-300 mb-4">
            <MdInfo size={24} />
            <div className="mt-[1px]">
              Share this article to gain points. Publish on{" "}
              <a className="underline font-semibold">Presage</a>.
            </div>
          </blockquote>
          <EditorContent editor={editor} />
        </main>
        <FloatingActions />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { id: context.query.id },
  };
};

export default ViewPage;
