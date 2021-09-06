import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useCreateRewardMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import { Layout } from "../../modules/dashboard/Layout";

const RewardDashboard: NextPage = () => {
  const [, createReward] = useCreateRewardMutation();

  return (
    <Layout>
      <nav className="px-5 pt-4 border-b">
        <div className="flex space-x-12 max-w-5xl mx-auto w-full">
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
        <table className="mt-8">
          <thead>
            <tr>
              <th>Name &#38; Type</th>
              <th>Description</th>
              <th>Points</th>
              <th>Status</th>
            </tr>
          </thead>
          <tr>
            <td>
              <span className="font-semibold text-gray-900">Shoutout</span>
            </td>
            <td>
              Get a shoutout at the top of my article the next time I pub...
            </td>
            <td>5</td>
            <td>78</td>
          </tr>
          <tr>
            <td rowSpan={0} className="block w-full">
              asdf
            </td>
          </tr>
        </table>
      </main>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(RewardDashboard);
