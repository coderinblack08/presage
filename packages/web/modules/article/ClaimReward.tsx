import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TicketStar } from "react-iconly";
import { AiFillGift } from "react-icons/ai";
import { useMutation, useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { ModalHeader } from "../../components/ModalHeader";
import { mutator } from "../../lib/mutator";
import { Reward, User, UserPoints } from "../../lib/types";

interface ClaimRewardProps {
  user: User;
}

export const ClaimReward: React.FC<ClaimRewardProps> = ({ user }) => {
  const { data: userPoints } = useQuery<UserPoints>(
    `/articles/points/${user.id}`
  );
  const { data: rewards } = useQuery<Reward[]>(`/rewards/${user.id}`);
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isLoading } = useMutation(mutator);
  const [selected, setSelected] = useState<Reward | null>(null);

  return (
    <>
      <Toaster />
      <div className="flex items-center flex-grow-0">
        <Button
          onClick={() => setIsOpen(true)}
          size="small"
          color="gray"
          icon={
            <div className="scale-80">
              <TicketStar set="bulk" />
            </div>
          }
        >
          <div className="text-base font-bold">
            {userPoints?.points || 0}{" "}
            <span className="hidden md:inline text-gray-600">
              {userPoints?.points === 1 ? "Point" : "Points"}
            </span>
          </div>
        </Button>
      </div>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <ModalHeader
          button={
            <Button
              size="small"
              loading={isLoading}
              disabled={selected === null}
              icon={<AiFillGift className="w-5 h-5" />}
              onClick={async () => {
                if (selected && userPoints) {
                  if (selected.points > userPoints.points) {
                    return toast.error(
                      "You don't have enough points to claim this reward"
                    );
                  }
                  await mutateAsync(
                    [`/rewards/claim/${selected.id}`, {}, "post"],
                    {
                      onSuccess: (data) => {
                        console.log(data);
                        toast.success(
                          `Hooray, you successfully claimed "${selected.name}"`
                        );
                        setIsOpen(false);
                      },
                    }
                  );
                }
              }}
            >
              Claim
            </Button>
          }
          handleClose={() => setIsOpen(false)}
        />
        <div className="p-6">
          <h4>Claim Rewards</h4>
          <p className="text-gray-600">
            You have {userPoints?.points || 0}{" "}
            {userPoints?.points === 1 ? "point" : "points"} to spend
          </p>
          <RadioGroup value={selected} onChange={setSelected} className="mt-6">
            <RadioGroup.Label className="sr-only">Reward</RadioGroup.Label>
            <div className="space-y-3">
              {rewards?.map((reward) => (
                <RadioGroup.Option
                  key={reward.id}
                  value={reward}
                  className={({ active, checked }) =>
                    `${active ? "ring ring-gray-400/50" : ""}
                  ${checked ? "bg-gray-900 text-white" : "bg-white"}
                    relative rounded-lg shadow px-5 py-4 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <div className="flex items-center space-x-3">
                              <RadioGroup.Label
                                as="h4"
                                className={`font-bold text-lg ${
                                  checked ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {reward.name}
                              </RadioGroup.Label>
                              <div
                                className={`px-4 py-1 font-bold small rounded-lg ${
                                  checked
                                    ? "bg-gray-100 text-gray-900"
                                    : "bg-gray-800 text-white"
                                }`}
                              >
                                {reward.points}{" "}
                                {reward.points === 1 ? "Point" : "Points"}
                              </div>
                            </div>
                            <RadioGroup.Description
                              as="span"
                              className={`mt-1.5 block ${
                                checked ? "text-gray-200" : "text-gray-500"
                              }`}
                            >
                              {reward.description}
                            </RadioGroup.Description>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </Modal>
    </>
  );
};
