import Error from "next/error";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { ArticleNavbar } from "../../components/ArticleNavbar";
import { Button } from "../../components/Button";
import { ssrFetcher } from "../../lib/fetcher";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { Article, Journal, User } from "../../lib/types";
import { ArticleCard } from "../../modules/article/ArticleCard";
import { EditProfileModal } from "../../modules/user/EditProfileModal";
import { FollowButton } from "../../modules/user/FollowButton";
import { isEqual } from "lodash";
import { TextParser } from "../../modules/user/TextParser";

const UserPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username, userNonExistent }) => {
  const { data: me } = useQuery<User>(`/me`);
  const { data: user } = useSSRQuery<User>(`/user/${username}`);
  const { data: journals } = useQuery<Journal[]>(`/journals/${user.id}`);
  const router = useRouter();
  const journalId = router.query.journalId?.toString();
  const { data: articles } = useQuery<Article[]>(
    `/articles?userId=${user.id}${journalId ? `&journalId=${journalId}` : ""}`
  );

  if (userNonExistent) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <ArticleNavbar user={user} lightGray />
      <header className="bg-white pt-4 md:pt-6 pb-12 md:pb-16">
        <div className="flex items-start space-x-6 md:space-x-8 max-w-4xl mx-auto px-5 md:px-8">
          <img
            src={user.profilePicture}
            alt={user.displayName}
            className="w-16 h-16 rounded-full"
          />
          <div className="w-full">
            <div className="flex items-center">
              <h4>{user.displayName}</h4>
              <span className="text-gray-500 ml-2">@{user.username}</span>
            </div>
            <p className="text-gray-500 mt-0.5">
              {user.followersCount} followers · {user.followingCount} following
            </p>
            {/* {user.bio && (
              <TextParser className="mt-4 text-gray-600 leading-7">
                {user.bio}
              </TextParser>
            )} */}
            {user.bio && (
              <div className="mt-4 text-gray-600 leading-7">{user.bio}</div>
            )}
            <div className="mt-5">
              {me?.id === user.id ? (
                <EditProfileModal user={me} />
              ) : (
                <FollowButton username={user.username} />
              )}
            </div>
            {/* <form className="relative flex items-center mt-5 max-w-md">
              <Input
                placeholder="Email Address"
                type="email"
                className="!py-3.5 pl-5 pr-44 max-w-3xl"
                required
              />
              <Button
                type="submit"
                className="absolute right-1.5 flex-shrink-0"
              >
                Subscribe
              </Button>
            </form>
            <label className="text-gray-400 small mt-2 block">
              Get notified when @{user.username} posts
            </label> */}
          </div>
        </div>
      </header>
      <main className="pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="mt-6 mb-4 max-w-4xl inline-flex items-center space-x-2">
            <Button
              size="small"
              color={journalId === undefined ? "white" : "transparent"}
              onClick={() => router.push(`/u/${user.username}`)}
            >
              <p
                className={
                  journalId === undefined
                    ? "font-semibold"
                    : "font-medium text-gray-600"
                }
              >
                Recent
              </p>
            </Button>
            {journals?.map((journal) => (
              <Button
                key={journal.id}
                onClick={() =>
                  router.push(`/u/${user.username}?journalId=${journal.id}`)
                }
                color={journal.id === journalId ? "white" : "transparent"}
                size="small"
              >
                <p
                  className={
                    journalId === journal.id
                      ? "font-semibold"
                      : "font-medium text-gray-600"
                  }
                >
                  {journal.name}
                </p>
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {articles?.length === 0 ? (
              <div className="text-gray-500 p-6 rounded-lg bg-white shadow">
                This journal is empty, check on it later.
              </div>
            ) : null}
            {articles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.username;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    `/user/${username}`,
    ssrFetcher(context.req.cookies.jid)
  );
  const user = queryClient.getQueryData<User>(`/user/${username}`);
  const userNonExistent =
    user === null || user === undefined || isEqual(user, {});
  if (!userNonExistent) {
    await queryClient.prefetchQuery(
      `/journals/${user?.id}`,
      ssrFetcher(context.req.cookies.jid)
    );
  }

  return {
    props: {
      username,
      userNonExistent,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserPage;
