import { EditorContent, useEditor } from "@tiptap/react";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { Bookmark, Chat, Heart, TicketStar } from "react-iconly";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { fetcher } from "../../lib/fetcher";
import { Article } from "../../lib/types";
import { extensions } from "../../modules/draft/TipTapEditor";

const RenderArticle: React.FC<{ article: Article }> = ({ article }) => {
  const editor = useEditor({
    extensions,
    content: article.bodyJson,
    editorProps: {
      editable: (_) => false,
      attributes: {
        class: "prose focus:outline-none w-full max-w-full",
      },
    },
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, []);

  return <EditorContent editor={editor} />;
};

const ArticlePage: React.FC<{ id: string }> = ({ id }) => {
  const { data: article, isFetching } = useQuery<Article>(`/articles/${id}`);

  return (
    <Layout>
      <NextSeo title={article?.title} />
      {!article || isFetching ? (
        <div className="spinner" />
      ) : (
        <div className="max-w-4xl mx-auto space-y-10">
          <header>
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={article.user.profilePicture}
                className="w-6 h-6 rounded-full"
                alt={article.user.displayName}
              />
              <p className="font-bold text-lg text-primary">
                {article.user.displayName}
              </p>
            </div>
            <h2 className="break-words mb-2">{article.title}</h2>
            <div className="text-gray-300">
              <div className="inline-flex items-center space-x-2 mr-1">
                {article.tags
                  ? article.tags.map((x) => (
                      <p key={x.id} className="text-gray-300 font-semibold">
                        #
                        <span className="text-gray-200 font-semibold">
                          {x.name}
                        </span>
                      </p>
                    ))
                  : null}
              </div>
              {article.tags ? (article.tags.length === 0 ? "" : " · ") : null}
              {format(new Date(article.createdAt), "MMMM dd")}
              {article.readingTime ? ` · ${article.readingTime}` : ""}
            </div>
          </header>
          <div className="border-b border-gray-600 w-full" />
          {article ? (
            <RenderArticle article={article} />
          ) : (
            <div className="spinner" />
          )}
          <div className="fixed w-full max-w-4xl bottom-0 bg-gray-700/50 backdrop-blur-lg border-t border-gray-600 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-6">
                <Button>Refer to Friend</Button>
                <div className="flex items-center space-x-2">
                  <TicketStar set="bulk" />
                  <p className="text-gray-300">
                    Earn <span className="text-gray-200 font-bold">+1</span>{" "}
                    Reward
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button>
                <Bookmark set="bold" />
              </button>
              <button>
                <Chat set="bold" />
              </button>
              <button>
                <Heart set="bold" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(`/articles/${id}`, fetcher);

  return {
    props: { id, dehydratedState: dehydrate(queryClient) },
  };
};

export default ArticlePage;
