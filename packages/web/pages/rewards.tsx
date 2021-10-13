import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import useSWR from "swr";
import { Button } from "../components/button";
import { baseURL } from "../lib/constants";
import { fetcher } from "../lib/fetcher";
import { Layout } from "../modules/dashboard/Layout";
import { RewardModal } from "../modules/rewards/RewardModal";
import { Reward } from "../types";

const RewardsPage: NextPage = () => {
  const { data } = useSWR<Reward[]>("/api/rewards");

  return (
    <Layout>
      <div className="w-full">
        <nav className="px-5 pt-4 border-b">
          <div className="flex space-x-8 lg:space-x-12 max-w-5xl mx-auto w-full">
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
                      <th scope="col">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/75">
                    {data?.map((reward) => (
                      <tr key={reward.id}>
                        <td className="pl-5 pr-2">
                          <input type="checkbox" />
                        </td>
                        <td>{reward.name}</td>
                        <td className="truncate">{reward.description}</td>
                        <td>{reward.points}</td>
                        <td className="flex items-center pr-0 space-x-1">
                          <Button
                            icon={
                              <MdEdit className="text-gray-400/75 w-5 h-5" />
                            }
                            size="small"
                            shadow={false}
                          />
                          <Button
                            icon={
                              <MdDelete className="text-gray-400/75 w-5 h-5" />
                            }
                            size="small"
                            shadow={false}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data?.length === 0 && (
                <div className="h-32 w-full flex items-center justify-center text-gray-400">
                  No Rewards Found (<a className="text-gray-600">Learn more</a>)
                </div>
              )}
              <RewardModal />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const rewards = await fetcher(`${baseURL}/api/rewards`, req.headers.cookie);
  const account = await fetcher(`${baseURL}/api/account`, req.headers.cookie);

  return {
    props: {
      fallback: {
        "/api/rewards": rewards,
        "/api/account": account,
      },
    },
  };
};

export default RewardsPage;
