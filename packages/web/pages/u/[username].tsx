import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { MdEdit } from "react-icons/md";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { ArticleNavbar } from "../../components/ArticleNavbar";
import { Button } from "../../components/Button";
import { ssrFetcher } from "../../lib/fetcher";
import { useSSRQuery } from "../../lib/hooks/useSSRQuery";
import { Article, Journal, User } from "../../lib/types";
import { ArticleCard } from "../../modules/article/ArticleCard";
import { FollowButton } from "../../modules/user/FollowButton";

const UserPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  const { data: me } = useQuery<User>(`/me`);
  const { data: user } = useSSRQuery<User>(`/user/${username}`);
  const { data: journals } = useQuery<Journal[]>(`/journals/${user.id}`);
  const router = useRouter();
  const journalId = router.query.journalId?.toString();
  const { data: articles } = useQuery<Article[]>(
    `/articles${journalId ? `?journalId=${journalId}` : ""}`
  );

  return (
    <div>
      <ArticleNavbar user={user} lightGray />
      <header className="bg-gray-50 pt-4 md:pt-6 pb-12 md:pb-16 border-b">
        <div className="flex items-start space-x-6 md:space-x-8 max-w-4xl mx-auto px-5 md:px-8">
          <img
            src={user.profilePicture}
            alt={user.displayName}
            className="w-16 h-16 rounded-full"
          />
          <div className="flex-shrink-0 w-full">
            <h4>{user.displayName}</h4>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-gray-500 mt-2">
              {user.followersCount} followers · {user.followingCount} following
            </p>
            {user.bio && <p className="mt-4 text-gray-500">{user.bio}</p>}
            <div className="mt-5">
              {me?.id === user.id ? (
                <Button
                  size="small"
                  icon={<MdEdit className="w-5 h-5" />}
                  rounded
                >
                  Edit Profile
                </Button>
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
      <main className="pt-8 pb-16 md:pb-20 md:pt-12">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <p className="font-bold">12 entries</p>
          <p className="text-gray-500 mt-1 text-sm">
            Kevin Lu’s personal journal dedicated to blogging
          </p>
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
                size="small"
                icon={
                  <img
                    src={journal.picture}
                    alt={journal.name}
                    className="flex-shrink-0 w-6 h-6 object-cover rounded-full"
                  />
                }
                color={journal.id === journalId ? "white" : "transparent"}
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
  const userId = queryClient.getQueryData<User>(`/user/${username}`)?.id;
  await queryClient.prefetchQuery(
    `/journals/${userId}`,
    ssrFetcher(context.req.cookies.jid)
  );

  return {
    props: {
      username,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserPage;
