import { serverTimestamp } from "@firebase/firestore";
import { RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Button } from "../../components/button";
import { Modal, ModalTrigger } from "../../components/modal";
import { useScreen } from "../../lib/hooks/useScreen";
import { Article, Points, Reward } from "../../types";
import { useUser } from "../authentication/useUser";
import { useClaimRewardMutation } from "./useClaimRewardMutation";

interface ClaimRewardsProps {
  article: Article | undefined;
}

export const ClaimRewards: React.FC<ClaimRewardsProps> = ({ article }) => {
  const { uid } = useUser();
  const { data: points } = useQuery<Points>(`/api/points/${uid}`);
  const { data: rewards } = useQuery<Reward[]>(
    `/api/rewards/${article?.userId}`
  );
  const { mutateAsync, isLoading } = useClaimRewardMutation();
  const [selected, setSelected] = useState<Reward | null>(null);
  const { isSmallerThanTablet } = useScreen();
  const router = useRouter();

  return (
    <Modal
      title="Claim Rewards"
      description="Use your points to claim exciting rewards"
      trigger={
        <ModalTrigger>
          <Button
            outline
            size={isSmallerThanTablet ? "small" : "regular"}
            icon={
              <svg
                className={`${
                  isSmallerThanTablet ? "w-5 h-5" : "w-6 h-6"
                } text-gray-400`}
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
            }
          >
            {points?.count || 0} Points
          </Button>
        </ModalTrigger>
      }
    >
      {({ setOpen }) => (
        <div>
          <RadioGroup value={selected} onChange={setSelected}>
            <div className="space-y-2">
              {rewards?.map((reward) => (
                <RadioGroup.Option
                  key={reward.name}
                  value={reward}
                  disabled={(points?.count || 0) < reward.points}
                  className={({ active, checked, disabled }) =>
                    `${checked ? "bg-gray-800 text-white" : "bg-white border"}
                    ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                    relative rounded-lg shadow-sm px-5 py-4 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink ${checked ? "mr-1.5" : ""}`}
                          >
                            <RadioGroup.Label
                              as="h3"
                              className={`font-bold  ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {reward.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="div"
                              className={`${
                                checked ? "text-gray-300" : "text-gray-500"
                              }`}
                            >
                              <span
                                className={`font-semibold ${
                                  checked ? "text-gray-100" : "text-gray-600"
                                }`}
                              >
                                {reward.points} points
                              </span>{" "}
                              - {reward.description}
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-shrink-0 text-white">
                            <CheckIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <Button
            loading={isLoading}
            disabled={!selected}
            onClick={async () => {
              if (selected) {
                try {
                  await mutateAsync({
                    rewardId: selected.id,
                    createdAt: serverTimestamp(),
                  });
                  setOpen(false);
                  router.push("/claimed-rewards");
                } catch (error) {}
              }
            }}
            className="w-full mt-4"
            outline
          >
            Claim It
          </Button>
        </div>
      )}
    </Modal>
  );
};

// copied straight from headless ui

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
