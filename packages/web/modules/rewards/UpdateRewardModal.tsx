import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { mutator } from "../../lib/mutator";
import { Reward } from "../../lib/types";
import { DeleteRewardModal } from "./DeleteRewardModal";
import { MutateRewardModal } from "./MutateRewardModal";

interface UpdateRewardModalProps {
  reward: Reward;
}

export const UpdateRewardModal: React.FC<UpdateRewardModalProps> = ({
  reward,
}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation(mutator);

  return (
    <>
      <div className="group">
        <button
          className={`cursor-pointer pr-0 group-hover:pr-6 py-1.5 rounded-lg flex items-center justify-between text-left w-full focus:outline-none focus-visible:ring`}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex pr-0 group-hover:pr-2 justify-between items-center space-x-2.5 flex-shrink-0 w-full min-w-0">
            <h6 className="font-semibold text-gray-600 text-left truncate">
              {reward.name}
            </h6>
            <p className="font-bold text-gray-800 text-right whitespace-nowrap">
              {reward.points} {reward.points === 1 ? "Point" : "Points"}
            </p>
          </div>
          <DeleteRewardModal id={reward.id} />
        </button>
      </div>
      <MutateRewardModal
        reward={reward}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onSubmit={async (values) => {
          await mutateAsync([`/rewards/${reward.id}`, values, "patch"], {
            onSuccess: () => {
              queryClient.refetchQueries("/rewards");
              setIsOpen(false);
            },
          });
        }}
      />
    </>
  );
};
