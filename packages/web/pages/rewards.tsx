import React from "react";
import { TicketStar } from "react-iconly";
import { useQuery } from "react-query";
import { Layout } from "../components/Layout";
import { Reward } from "../lib/types";
import { CreateRewardModal } from "../modules/rewards/CreateRewardModal";

const Rewards: React.FC = () => {
  const { data: rewards } = useQuery<Reward[]>(`/rewards`);

  return (
    <Layout className="py-5 md:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h4>Rewards</h4>
            <p className="text-gray-500 mt-0.5">
              Looks cool, but how do{" "}
              <a className="hover:underline text-gray-900 font-bold">
                rewards work
              </a>
              ?
            </p>
          </div>
          <CreateRewardModal />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {rewards?.map((reward) => (
            <button
              key={reward.id}
              className="flex flex-col justify-between text-left bg-white rounded-lg p-6 shadow"
            >
              <div>
                <h4>{reward.name}</h4>
                <p className="text-gray-500">{reward.description}</p>
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <div className="flex items-center text-gray-600">
                  <TicketStar set="bulk" />
                  <p className="ml-2">
                    <span className="font-bold">{reward.points}</span> Points
                  </p>
                </div>
                <span className="text-gray-600">·</span>
                <p className="text-gray-600">Claimed {reward.claimed} times</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Rewards;
