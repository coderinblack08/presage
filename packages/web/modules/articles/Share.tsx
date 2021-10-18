import React, { useEffect, useState } from "react";
import { MdShare } from "react-icons/md";
import { useQuery } from "react-query";
import { Button } from "../../components/button";
import { CopyInput } from "../../components/input";
import { Modal, ModalTrigger } from "../../components/modal";
import { Article, Referral } from "../../types";
import { useUser } from "../authentication/useUser";
import { ListCheck } from "../landing-page/ListCheck";
import { useShareMutation } from "./useShareMutation";

interface ShareProps {
  article: Article | undefined;
}

export const Share: React.FC<ShareProps> = ({ article }) => {
  const { uid } = useUser();
  const [enabled, setEnabled] = useState(false);
  const { mutate } = useShareMutation();
  const { data: referral, isFetching } = useQuery<Referral>(
    `/api/referrals/${article?.id}`,
    { enabled }
  );

  useEffect(() => {
    if (!referral && !isFetching && enabled) {
      mutate(article?.id || "");
    }
  }, [article?.id, enabled, isFetching, mutate, referral]);

  return (
    <>
      <Modal
        title="Share and Earn"
        description="Earn by sharing this article to friends"
        trigger={
          <ModalTrigger>
            <Button
              disabled={!uid}
              icon={<MdShare className="w-6 h-6" />}
              className="text-gray-500"
              color="transparent"
              size="none"
              onClick={() => setEnabled(true)}
            >
              <span className="font-medium">{article?.shareCount}</span>
            </Button>
          </ModalTrigger>
        }
      >
        {() => (
          <div>
            <hr />
            <ul className="mt-6 space-y-3">
              <li className="flex items-center space-x-3">
                <ListCheck />
                <span className="text-gray-600">
                  You can earn up to 20 points per a unique referral link.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <ListCheck />
                <span className="text-gray-600">
                  Every time you refer a friend, you will earn 1 point.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <ListCheck />
                <span className="text-gray-600">
                  Use points you earn to claim rewards.
                </span>
              </li>
            </ul>
            {isFetching ? (
              <div className="spinner mt-8" />
            ) : (
              <div className="mt-6">
                <CopyInput
                  url={`https://joinpresage.com/referral/${referral?.id}`}
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
