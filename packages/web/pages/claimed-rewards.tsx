import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetcher } from "../lib/fetcher";
import { useScreen } from "../lib/hooks/useScreen";
import { ProfilePicture } from "../modules/authentication/ProfilePicture";
import { Layout } from "../modules/dashboard/Layout";
import { ClaimedRewardRow } from "../modules/rewards/ClaimedRewardRow";
import { RewardTabs } from "../modules/rewards/RewardTabs";
import { ClaimedReward, Points } from "../types";

const ClaimedRewardsPage: NextPage = () => {
  const { data } = useQuery<ClaimedReward[]>("/api/rewards/claimed");
  const { data: points } = useQuery<Points[]>("/api/points");
  const { isSmallerThanTablet } = useScreen();

  return (
    <Layout>
      <div className="w-full">
        <div className="sticky top-0">
          <RewardTabs />
        </div>
        <main className="px-5 py-16 max-w-5xl w-full mx-auto overflow-y-auto">
          <h1 className="text-xl font-bold">Claimed Rewards</h1>
          <p className="text-gray-500 mt-1">
            View all your claimed rewards and points here.{" "}
            <span className="text-gray-900">Click each row to expand</span>.
          </p>
          <div className="mt-8">
            <div className="flex flex-col align-middle min-w-full w-full border border-gray-200/75 rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b border-200/75">
                    <tr>
                      <th scope="col" className="w-4 pl-5 pr-2">
                        <input type="checkbox" />
                      </th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Points</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/75">
                    {data?.map((cr) => (
                      <ClaimedRewardRow key={cr.id} cr={cr} />
                    ))}
                  </tbody>
                </table>
              </div>
              {data?.length === 0 && (
                <div className="h-32 w-full flex items-center justify-center text-gray-400">
                  No Rewards Found (<a className="text-gray-600">Learn more</a>)
                </div>
              )}
            </div>
          </div>
          {points?.length ? (
            <div>
              <h1 className="text-xl font-bold mt-20">My Points</h1>
              <p className="text-gray-500 mt-1">
                Points you’ve claimed by referring articles
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {points?.map((p) => (
                  <div key={p.id} className="rounded-xl border shadow-sm">
                    <div className="flex items-center space-x-4 max-w-full p-3.5">
                      <ProfilePicture size="large" user={p.user!} />
                      <div className="min-w-0">
                        <p className="font-bold leading-none mb-0.5 truncate">
                          {p.user?.displayName}
                        </p>
                        <p className="text-gray-500 text-sm truncate">
                          @{p.user?.username}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 border-t px-3.5 py-2">
                      <svg
                        className={`${
                          isSmallerThanTablet ? "w-4 h-4" : "w-5 h-5"
                        } text-gray-500`}
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
                      <span className="text-gray-500 font-semibold text-sm leading-none">
                        {p.count} points
                      </span>
                      <span className="text-gray-300 text-2xl font-bold leading-none">
                        ·
                      </span>
                      <a className="font-semibold text-sm leading-none text-gray-800">
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "/api/rewards/claimed",
    fetcher(req.headers.cookie)
  );
  await queryClient.prefetchQuery("/api/points", fetcher(req.headers.cookie));
  await queryClient.prefetchQuery("/api/account", fetcher(req.headers.cookie));

  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default ClaimedRewardsPage;
