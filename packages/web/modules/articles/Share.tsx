import React, { useEffect, useState } from "react";
import { MdShare } from "react-icons/md";
import { useQuery } from "react-query";
import { Button } from "../../components/button";
import { CopyInput } from "../../components/input";
import { Modal, ModalTrigger } from "../../components/modal";
import { baseURL } from "../../lib/constants";
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
    if (!referral && !isFetching && enabled && article) {
      mutate(article);
    }
  }, [enabled, isFetching, mutate, referral, JSON.stringify(article)]);

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
              <li className="flex space-x-3">
                <div className="mt-1">
                  <ListCheck />
                </div>
                <span className="text-gray-600">
                  You can earn up to 20 points per a unique referral link.
                </span>
              </li>
              <li className="flex space-x-3">
                <div className="mt-1">
                  <ListCheck />
                </div>
                <span className="text-gray-600">
                  Every time you refer a friend (they have to be logged in), you
                  will earn 1 point.
                </span>
              </li>
              <li className="flex space-x-3">
                <div className="mt-1">
                  <ListCheck />
                </div>
                <span className="text-gray-600">
                  Use points you earn to claim rewards.
                </span>
              </li>
            </ul>
            {isFetching ? (
              <div className="spinner py-8" />
            ) : (
              <div className="mt-8">
                <p className="mb-1 font-bold">
                  {referral?.claimCount} reader
                  {referral?.claimCount === 1 ? " has" : "s have"} been referred
                </p>
                <CopyInput url={`${baseURL}/referral/${referral?.id}`} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};
