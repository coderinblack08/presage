import React, { useState } from "react";
import { MdShare } from "react-icons/md";
import { Button } from "../../components/button";
import { Modal, ModalTrigger } from "../../components/modal";
import { ListCheck } from "../landing-page/ListCheck";

interface ShareProps {
  articleId: string;
}

export const Share: React.FC<ShareProps> = ({ articleId }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        title="Share and Earn"
        description="Earn by sharing this article to friends"
        trigger={
          <ModalTrigger>
            <Button
              icon={<MdShare className="w-6 h-6" />}
              className="text-gray-500"
              color="transparent"
              size="none"
              onClick={async () => {
                setOpened(true);
              }}
            >
              <span className="font-medium">0</span>
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
                  You can earn up to 5 points per a unique referral link.
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
            <div className="mt-6">
              {/* <CopyInput
                url={`https://joinpresage.com/referral/${referral?.findReferral.code}`}
              /> */}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
