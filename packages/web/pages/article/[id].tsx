import { EditorContent, useEditor } from "@tiptap/react";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import { BlogJsonLd, NextSeo } from "next-seo";
import Link from "next/link";
import React, { useEffect } from "react";
import { MdBookmarkBorder, MdShare } from "react-icons/md";
import { QueryClient, useQuery, UseQueryResult } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { ssrFetcher } from "../../lib/fetcher";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { Article } from "../../lib/types";
import { CommentSection } from "../../modules/article/CommentSection";
import { LikeButton } from "../../modules/article/LikeButton";
import { extensions } from "../../modules/draft/TipTapEditor";

const RenderArticle: React.FC<{ article: Article }> = ({ article }) => {
  const editor = useEditor({
    extensions,
    content: article.bodyJson,
    // does prosemirror schema give us a xss vulnerability?
    // https://github.com/ueberdosis/tiptap/discussions/241
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
    url: `https://joinpresage.com/article/${article.id}`,
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
    <Layout article={article} className="py-6 lg:py-8">
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
            authors: [`https://joinpresage.com/u/${article.user.username}`],
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
      <div className="flex items-start space-y-8">
        <main className="max-w-4xl mx-auto">
          <h3 className="h4 sm:h3">{article.title}</h3>
          <p className="text-gray-600 mt-1">
            {format(
              new Date(article.publishedDate || article.createdAt),
              "MMMM dd, yyyy"
            )}{" "}
            · {article.readingTime}
          </p>
          <div className="mt-5">
            <article
              className="prose w-full max-w-full"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
            {/* <RenderArticle article={article} /> */}
          </div>
          <div className="mt-10 md:mt-12">
            <CommentSection article={article} />
          </div>
          <div className="px-5 md:px-8 flex items-end justify-between w-full max-w-4xl fixed bottom-0 mx-auto inset-x-0 py-10 bg-gray-100">
            <Link href="/">
              <a className="block">
                <p className="text-gray-500 small">Published on</p>
                <div className="font-display text-black text-2xl leading-tight font-bold">
                  presage
                </div>
              </a>
            </Link>
            <div className="flex items-center space-x-9">
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
          </div>
        </main>
      </div>
    </Layout>
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
