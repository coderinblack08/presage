import { EditorContent, useEditor } from "@tiptap/react";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { AddUser, Bookmark, Heart } from "react-iconly";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Article } from "../../lib/types";
import { LikeButton } from "../../modules/article/LikeButton";
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
        <div className="flex flex-col-reverse lg:flex-row items-start space-x-0 lg:space-x-5">
          <main className="p-10 rounded-lg bg-white shadow w-full">
            <div className="flex items-center space-x-5 mb-6">
              <LikeButton article={article} />
              <Button
                color="gray"
                size="small"
                icon={
                  <div className="scale-80">
                    <AddUser set="bold" size="small" />
                  </div>
                }
                noAnimate
              >
                <span className="font-semibold small">Refer (+1 reward)</span>
              </Button>
              <Button
                color="gray"
                size="small"
                icon={
                  <div className="scale-80">
                    <Bookmark set="bold" size="small" />
                  </div>
                }
                noAnimate
              />
            </div>
            <h3>{article.title}</h3>
            <div className="flex items-center mt-4">
              <div className="flex items-center space-x-3 pr-4">
                <img
                  src={article.user.profilePicture}
                  alt={article.user.displayName}
                  className="w-8 h-8 rounded-full"
                />
                <p className="font-bold text-gray-800">
                  {article.user.displayName}
                </p>
              </div>
              <div className="h-5 border-r border-gray-300" />
              <p className="text-gray-600 pl-4">
                {format(new Date(article.createdAt), "MMMM dd, yyyy")} ·{" "}
                {article.readingTime}
              </p>
            </div>
            <div className="mt-8">
              <RenderArticle article={article} />
            </div>
          </main>
          <div className="max-w-sm w-full space-y-5 mb-5 lg:mb-0">
            <aside className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center space-x-4">
                <img
                  src={article.user.profilePicture}
                  alt={article.user.displayName}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <p className="font-bold">{article.user.displayName}</p>
                  <p className="text-gray-500">@{article.user.username}</p>
                </div>
              </div>
              <p className="mt-5">{article.user.bio}</p>
              <Button className="mt-5 w-full">Follow</Button>
            </aside>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

export default ArticlePage;
