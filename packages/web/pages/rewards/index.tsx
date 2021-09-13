import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useMyRewardsQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import { Layout } from "../../modules/dashboard/Layout";
import { ResponsiveSidebar } from "../../modules/dashboard/sidebar/ResponsiveSidebar";
import { RewardModal } from "../../modules/rewards/RewardModal";

const RewardDashboard: NextPage = () => {
  const [{ data: rewards }] = useMyRewardsQuery();

  return (
    <Layout>
      <nav className="px-5 pt-4 border-b">
        <div className="flex space-x-8 lg:space-x-12 max-w-5xl mx-auto w-full">
          <ResponsiveSidebar mobile />
          <a className="font-bold border-b-2 border-gray-600 pb-3">Claimed</a>
          <a className="text-gray-500">Created</a>
        </div>
      </nav>
      <main className="px-5 py-16 max-w-5xl w-full mx-auto">
        <h1 className="text-2xl font-bold">Manage Rewards</h1>
        <p className="text-gray-500 mt-1">
          Select from a variety of reward presets and customize them to your
          liking.
        </p>
        <div className="align-middle inline-block min-w-full w-full overflow-x-auto border shadow-sm rounded-lg mt-8">
          <table className="shadow-none">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th>Description</th>
                <th>Points</th>
                <th className="whitespace-nowrap">Claim Count</th>
              </tr>
            </thead>
            <tbody>
              {rewards?.myRewards.map((reward) => (
                <tr key={reward.id}>
                  <td>
                    <span className="font-bold text-gray-900 whitespace-nowrap">
                      {reward.name}{" "}
                      <span className="font-medium text-gray-500">
                        ({reward.type})
                      </span>
                    </span>
                  </td>
                  <td className="truncate max-w-lg">{reward.description}</td>
                  <td>{reward.points}</td>
                  <td>0</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} className="p-0 border-b-0">
                  <RewardModal />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(RewardDashboard);
