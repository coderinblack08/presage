import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdPersonAdd } from "react-icons/md";
import { Button } from "../../components/button";
import { useFindArticleQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import { useScreen } from "../../lib/useScreen";
import { Navbar } from "../../modules/articles/Navbar";
import { Reactions } from "../../modules/articles/Reactions";

const ArticlePage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  const articleId = id?.toString() || "";
  const [{ data: article }] = useFindArticleQuery({
    variables: { id: articleId },
  });
  const { isSmallerThanTablet } = useScreen();

  return (
    <div>
      <Navbar />
      <header className="border-b pt-6 sm:pt-10 pb-6">
        <div className="max-w-4xl mx-auto px-5">
          <div>
            <div className="mb-1 flex items-center space-x-2 text-sm sm:text-base text-gray-500">
              <span>August 28, 2021</span>
              <span className="text-gray-300 text-2xl font-bold">·</span>
              <span>2 min read</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold !leading-relaxed">
              {article?.findArticle?.title}
            </h1>
            {article?.findArticle?.tags.length !== 0 ? (
              <div className="mt-3 flex items-center space-x-2">
                {article?.findArticle?.tags.map((tag) => (
                  <a
                    key={tag}
                    className="px-4 py-1 rounded-lg bg-gray-100 text-gray-600 font-semibold text-sm"
                  >
                    <span className="text-gray-400">#</span>
                    {tag}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <a className="flex items-center space-x-3.5">
              <img
                src={article?.findArticle?.user.profilePicture || ""}
                alt={article?.findArticle?.user.displayName}
                className="object-cover w-6 h-6 sm:w-8 sm:h-8 rounded-full"
              />
              <h2 className="text-sm sm:text-base font-bold text-gray-600">
                {article?.findArticle?.user.displayName}
              </h2>
            </a>
            <div className="flex items-center space-x-2 mt-3 sm:mt-0">
              <Button
                outline
                size={isSmallerThanTablet ? "small" : "regular"}
                icon={
                  <svg
                    className={`${
                      isSmallerThanTablet ? "w-5 h-5" : "w-6 h-6"
                    } text-gray-400`}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.4675 10.0008C16.4675 10.6788 17.0242 11.2303 17.7083 11.2303C18.0533 11.2303 18.3333 11.5077 18.3333 11.8496V14.0798C18.3333 15.9658 16.785 17.5 14.8817 17.5H5.11917C3.21584 17.5 1.66667 15.9658 1.66667 14.0798V11.8496C1.66667 11.5077 1.94667 11.2303 2.29167 11.2303C2.97667 11.2303 3.53334 10.6788 3.53334 10.0008C3.53334 9.34025 2.99917 8.84317 2.29167 8.84317C2.12584 8.84317 1.96751 8.77792 1.85001 8.6615C1.73251 8.54508 1.66667 8.38733 1.66667 8.22388L1.66834 5.92095C1.66834 4.03501 3.21667 2.5 5.12001 2.5H14.88C16.7833 2.5 18.3325 4.03501 18.3325 5.92095L18.3333 8.15204C18.3333 8.31553 18.2675 8.47408 18.1508 8.58967C18.0333 8.70608 17.875 8.77133 17.7083 8.77133C17.0242 8.77133 16.4675 9.32292 16.4675 10.0008ZM11.8767 10.54L12.8592 9.59208C13.03 9.42858 13.0892 9.1875 13.015 8.96458C12.9417 8.74158 12.75 8.58308 12.5183 8.55083L11.1608 8.35433L10.5533 7.13558C10.4492 6.92585 10.2375 6.79538 10.0017 6.79456H10C9.76501 6.79456 9.55334 6.92503 9.44751 7.13476L8.84001 8.35433L7.48501 8.55C7.25084 8.58308 7.05917 8.74158 6.98501 8.96458C6.91167 9.1875 6.97084 9.42858 7.14084 9.59208L8.12334 10.54L7.89167 11.8802C7.85167 12.1113 7.94584 12.3409 8.13751 12.4788C8.24584 12.5556 8.37167 12.5952 8.49917 12.5952C8.59667 12.5952 8.69501 12.5713 8.78501 12.5243L10 11.8917L11.2125 12.5226C11.4225 12.634 11.6717 12.6167 11.8625 12.478C12.055 12.3409 12.1492 12.1113 12.1092 11.8802L11.8767 10.54Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              >
                0 Points
              </Button>
              <Button
                size={isSmallerThanTablet ? "small" : "regular"}
                icon={
                  <MdPersonAdd
                    className={isSmallerThanTablet ? "w-5 h-5" : "w-6 h-6"}
                  />
                }
                outline
              >
                Follow
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl w-full px-5 py-16">
        <Reactions />
        <article
          className="prose max-w-full mt-10"
          dangerouslySetInnerHTML={{ __html: article?.findArticle?.html || "" }}
        />
      </main>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(ArticlePage);
