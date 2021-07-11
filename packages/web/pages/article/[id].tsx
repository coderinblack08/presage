import { EditorContent, useEditor } from "@tiptap/react";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Layout } from "../../components/Layout";
import { Article } from "../../lib/types";
import { extensions } from "../../modules/draft/TipTapEditor";

const RenderArticle: React.FC<{ article: Article }> = ({ article }) => {
  const editor = useEditor({
    extensions,
    content: article.bodyJson,
    editorProps: {
      editable: (_) => false,
      attributes: {
        class: "prose focus:outline-none w-full max-w-full pb-12",
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
        <div className="grid grid-cols-[4fr,1fr] gap-5">
          <main>
            <RenderArticle article={article} />
          </main>
        </div>
      )}
    </Layout>
  );
};

export default ArticlePage;
