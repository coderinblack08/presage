import React from "react";
import { TicketStar } from "react-iconly";
import { useQuery } from "react-query";
import { Layout } from "../components/Layout";
import { Reward } from "../lib/types";
import { CreateRewardModal } from "../modules/rewards/CreateRewardModal";
import { UpdateRewardModal } from "../modules/rewards/UpdateRewardModal";

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
            <UpdateRewardModal key={reward.id} reward={reward} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Rewards;
