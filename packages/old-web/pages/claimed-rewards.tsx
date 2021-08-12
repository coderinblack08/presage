import { GetServerSideProps } from "next";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { ssrFetcher } from "../lib/fetcher";
import { ClaimedReward } from "../lib/types";
import { DashboardLayout } from "../modules/draft/DashboardLayout";
import { OpenButton } from "../modules/draft/OpenButton";
import { ClaimedRewardItem } from "../modules/rewards/ClaimedRewardItem";

const ClaimedRewards: React.FC = () => {
  const { data: rewards } = useQuery<ClaimedReward[]>("/rewards/claimed");

  return (
    <DashboardLayout>
      <header className="sticky z-50 top-0 bg-white flex items-center justify-between py-4 lg:py-6 px-8">
        <OpenButton />
      </header>
      <main className="py-4 md:py-8 lg:py-12 px-8 max-w-4xl mx-auto">
        <h3 className="h4 md:h3">Claimed Rewards</h3>
        <p className="text-gray-600 mt-1">
          Claim rewards by viewing the writers&apos;s profile page
        </p>
        {rewards && rewards.length > 0 ? (
          <div className="grid border-t-2 border-b-2 border-gray-100 divide-y-2 divide-gray-100 grid-cols-1 mt-10 lg:mt-12">
            {rewards?.map((claimed) => (
              <ClaimedRewardItem claimed={claimed} key={claimed.id} />
            ))}
          </div>
        ) : (
          <div className="mt-8 lg:mt-10 pt-6 border-t">
            <p className="text-gray-500 text-sm">No rewards found.</p>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "/journals/me",
    ssrFetcher(context.req.cookies.jid)
  );
  await queryClient.prefetchQuery("/me", ssrFetcher(context.req.cookies.jid));
  await queryClient.prefetchQuery(
    "/rewards",
    ssrFetcher(context.req.cookies.jid)
  );
  await queryClient.prefetchQuery(
    "/rewards/claimed",
    ssrFetcher(context.req.cookies.jid)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ClaimedRewards;
