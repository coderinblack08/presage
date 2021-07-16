import { EditorContent, useEditor } from "@tiptap/react";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { MdBookmarkBorder, MdShare } from "react-icons/md";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { Article } from "../../lib/types";
import { CommentSection } from "../../modules/article/CommentSection";
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
    <Layout className="py-4 md:py-6 lg:py-8">
      <NextSeo title={article?.title} />
      {!article || isFetching ? (
        <div className="spinner" />
      ) : (
        <div className="flex items-start space-y-8">
          <main className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-9 mb-5">
              <LikeButton article={article} />
              <Button
                color="transparent"
                size="none"
                icon={<MdShare className="w-6 h-6 text-gray-600" />}
                noAnimate
              >
                <span className="text-gray-600">0</span>
              </Button>
              <Button
                color="transparent"
                size="none"
                icon={<MdBookmarkBorder className="w-6 h-6 text-gray-600" />}
                noAnimate
              >
                <span className="text-gray-600">0</span>
              </Button>
            </div>
            <h3>{article.title}</h3>
            <div className="flex items-center mt-2">
              <div className="flex items-center space-x-3 pr-4">
                <img
                  src={article.user.profilePicture}
                  alt={article.user.displayName}
                  className="w-7 h-7 rounded-full"
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
              <article
                className="prose w-full max-w-full"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />
              {/* <RenderArticle article={article} /> */}
            </div>
            <div className="mt-10">
              <CommentSection article={article} />
            </div>
          </main>
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
