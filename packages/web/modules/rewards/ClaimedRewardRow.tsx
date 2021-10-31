import React, { useState } from "react";
import { useQuery } from "react-query";
import { Modal } from "../../components/modal";
import { ClaimedReward, RewardType } from "../../types";

interface ClaimedRewardRowProps {
  cr: ClaimedReward;
}

export const ClaimedRewardRow: React.FC<ClaimedRewardRowProps> = ({ cr }) => {
  const [open, setOpen] = useState(false);
  const { data: secret } = useQuery<any>(`/api/rewards/secret/${cr.rewardId}`, {
    enabled: cr.reward?.type === RewardType.Message,
  });

  return (
    <>
      <tr onClick={() => setOpen(true)} className="cursor-pointer">
        <td className="pl-5 pr-2">
          <input type="checkbox" />
        </td>
        <td>{cr.reward?.name}</td>
        <td className="truncate max-w-md">{cr.reward?.description}</td>
        <td>{cr.reward?.points}</td>
        <td>
          <span className="bg-gray-200 text-gray-600 px-3 py-1.5 font-bold text-sm rounded-lg">
            {cr.status}
          </span>
        </td>
      </tr>
      <Modal
        visible={open}
        onCancel={() => setOpen(false)}
        key={cr.id}
        title={cr.reward?.name!}
        description={cr.reward?.description}
      >
        {() => (
          <div>
            <h4 className="font-bold">Message</h4>
            <textarea readOnly>{secret?.message}</textarea>
          </div>
        )}
      </Modal>
    </>
  );
};
