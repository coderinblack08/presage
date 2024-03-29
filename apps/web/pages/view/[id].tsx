import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { createSSGHelpers } from "@trpc/react/ssg";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useEffect } from "react";
import { IconType } from "react-icons";
import {
  MdBookmark,
  MdChromeReaderMode,
  MdFavorite,
  MdInfo,
  MdReplyAll,
} from "react-icons/md";
import superjson from "superjson";
import { Button } from "ui";
import { InferQueryOutput, trpc } from "../../lib/trpc";
import {
  rteClass,
  viewOnlyExtensions,
} from "../../modules/editor/RichTextEditor";
import { FloatingActions } from "../../modules/layout/FloatingActions";
import { createContext } from "../../server/context";
import { appRouter } from "../../server/routers/_app";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const ReactionButton: React.FC<{
  draftId: string;
  type: "Favorite" | "Bookmark" | "Share";
}> = ({ type, draftId }) => {
  const { data: reactions } = trpc.useQuery([
    "reactions.byDraftId",
    { id: draftId },
  ]);
  const toggleReaction = trpc.useMutation(["reactions.toggle"]);
  const utils = trpc.useContext();

  let ReactionIcon: IconType;

  if (type === "Favorite") {
    ReactionIcon = MdFavorite;
  } else if (type === "Bookmark") {
    ReactionIcon = MdBookmark;
  } else if (type === "Share") {
    ReactionIcon = MdReplyAll;
  }

  return (
    <button
      className={`rounded-lg p-4 border-2 ${
        reactions?.status[type]
          ? "bg-blue-50 text-blue-500 border-blue-500/10 dark:bg-blue-400/10 dark:border-blue-300/10 dark:text-blue-300"
          : "border-gray-200/60 dark:border-gray-800 text-gray-400 dark:text-gray-500"
      }`}
      onClick={() =>
        toggleReaction.mutate(
          { type: type, draftId },
          {
            onSuccess: () => {
              utils.setQueryData(["reactions.byDraftId", { id: draftId }], ((
                old: InferQueryOutput<"reactions.byDraftId">
              ) => {
                if (old) {
                  old.status[type] = !old.status[type];
                  old.counts[type] =
                    old.counts[type] + (old.status[type] ? 1 : -1);
                  return old;
                }
              }) as any);
            },
          }
        )
      }
    >
      {/* @ts-ignore */}
      <ReactionIcon size={20} />
      <p className="mt-0.5 text-lg font-semibold">{reactions?.counts[type]}</p>
    </button>
  );
};

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
    <div className="p-6 max-w-3xl mx-auto selection:bg-blue-500 selection:text-white">
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
          size="sm"
          className="text-base"
          variant="light"
          icon={<MdChromeReaderMode size={18} />}
        >
          Posts
        </Button>
        <Button size="sm" className="text-base" variant="ghost">
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
          <ReactionButton draftId={id} type="Favorite" />
          <ReactionButton draftId={id} type="Bookmark" />
          <ReactionButton draftId={id} type="Share" />
        </div>
        <main>
          <blockquote className="border-2 border-blue-500/10 dark:border-blue-300/10 flex space-x-3 bg-blue-50 dark:bg-blue-400/10 p-4 rounded-lg text-blue-500 dark:text-blue-300 mb-4">
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
  const id = context.query?.id as string;
  const ssg = createSSGHelpers({
    router: appRouter,
    transformer: superjson,
    ctx: await createContext({
      req: context.req as any,
      res: context.res as any,
    }),
  });

  await ssg.fetchQuery("drafts.byId", { id });

  return {
    props: {
      id,
      trpcState: ssg.dehydrate(),
    },
  };
};

export default ViewPage;
