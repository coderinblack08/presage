import { EditorContent, useEditor } from "@tiptap/react";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { ArticleJsonLd, BlogJsonLd, NextSeo } from "next-seo";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MdBookmarkBorder, MdShare } from "react-icons/md";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import { ssrFetcher } from "../../lib/fetcher";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { Article } from "../../lib/types";
import { CommentSection } from "../../modules/article/CommentSection";
import { LikeButton } from "../../modules/article/LikeButton";
import { Tags } from "../../modules/article/Tags";
import { extensions } from "../../modules/draft/TipTapEditor";

const RenderArticle: React.FC<{ article: Article }> = ({ article }) => {
  const editor = useEditor({
    extensions,
    content: article.bodyJson,
    //  does prosemirror schema give us a xss vulnerability?
    //  https:github.com/ueberdosis/tiptap/discussions/241
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
  const { data: article } = useSSRQuery<Article>(`/articles/${id}`);
  const seo = {
    url: `https:joinpresage.com/article/${article.id}`,
    articles: [
      {
        url: article.user.profilePicture,
        alt: article.user.displayName,
        width: 72,
        height: 72,
      },
      {
        url: article.journal.name,
        alt: article.journal.picture,
        width: 128,
        height: 128,
      },
    ],
  };

  return (
    <>
      <NextSeo
        title={article.title}
        description=""
        canonical={seo.url}
        openGraph={{
          title: article.title,
          url: seo.url,
          type: "article",
          article: {
            publishedTime: article.publishedDate || article.createdAt,
            modifiedTime: article.updatedAt,
            authors: [`https:joinpresage.com/u/${article.user.username}`],
            tags: article.tags.map((tag) => tag.name),
          },
          images: seo.articles,
        }}
      />
      <BlogJsonLd
        url={seo.url}
        title={article.title}
        images={seo.articles.map((x) => x.url)}
        datePublished={article.publishedDate || article.createdAt}
        dateModified={article.updatedAt}
        authorName={article.user.displayName}
        description=""
      />
      <Layout article={article} className="py-5 md:py-6 lg:py-8">
        <div className="flex items-start space-y-8">
          <main className="max-w-4xl w-full mx-auto">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold !leading-normal">
                {article.title}
              </h1>
              <p className="text-gray-600 mt-1">
                {format(
                  new Date(article.publishedDate || article.createdAt),
                  "MMMM dd, yyyy"
                )}{" "}
                · {article.readingTime}{" "}
                {article.tags.length ? (
                  <div className="inline-block">
                    {" "}
                    · <Tags article={article} />
                  </div>
                ) : null}
              </p>
              <div className="flex items-center space-x-8 mt-5 md:mt-6">
                <LikeButton article={article} />
                <Button
                  color="transparent"
                  size="none"
                  icon={
                    <MdShare className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                  }
                  noAnimate
                >
                  <span className="text-gray-600">0</span>
                </Button>
                <Button
                  color="transparent"
                  size="none"
                  icon={
                    <MdBookmarkBorder className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                  }
                  noAnimate
                >
                  <span className="text-gray-600">0</span>
                </Button>
              </div>
            </div>
            <article
              className="prose w-full max-w-full py-0 sm:py-2 md:py-4 mt-8"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
            {/* <RenderArticle article={article} /> */}
            <div className="mt-10">
              <CommentSection article={article} />
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    `/articles/${id}`,
    ssrFetcher(context.req.cookies.jid)
  );

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ArticlePage;
