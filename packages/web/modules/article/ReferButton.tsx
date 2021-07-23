import { Dialog } from "@headlessui/react";
import useClipboard from "react-use-clipboard";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { MdClose, MdContentCopy, MdEmail, MdShare } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { BASE_URL } from "../../lib/constants";
import { mutator } from "../../lib/mutator";
import { Article, Referral } from "../../lib/types";
import { ItemCheck } from "../home/LandingPage";
import { Tooltip } from "../../components/Tooltip";

interface ReferButtonProps {
  article: Article;
}

export const ReferButton: React.FC<ReferButtonProps> = ({ article }) => {
  const { mutateAsync } = useMutation(mutator);
  const [isOpen, setIsOpen] = useState(false);
  const [referral, setReferral] = useState<Referral | null>(null);
  const queryClient = useQueryClient();
  const referralURL = `${BASE_URL}/referral?token=${referral?.token}`;
  const [isCopied, setCopied] = useClipboard(referralURL, {
    successDuration: 1000,
  });

  return (
    <>
      <Tooltip content="Refer">
        <Button
          color="transparent"
          size="none"
          onClick={async () => {
            try {
              await mutateAsync([`/referrals/${article.id}`, {}, "post"], {
                onSuccess: (data) => {
                  queryClient.setQueryData<Article>(
                    `/articles/${article.id}`,
                    (old) =>
                      (old
                        ? {
                            ...old,
                            referralCount: data.new
                              ? old.referralCount + 1
                              : old.referralCount,
                          }
                        : {}) as Article
                  );
                  setReferral(data);
                  setIsOpen(true);
                },
              });
            } catch (error) {
              console.error(error);
            }
          }}
          icon={<MdShare className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />}
          noAnimate
        >
          <span className="text-gray-600">{article.referralCount}</span>
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 focus:outline-none focus-visible:ring rounded"
        >
          <MdClose className="text-gray-800 w-5 h-5" />
        </button>
        <div className="p-6">
          <Dialog.Title as="h4">Refer and Earn</Dialog.Title>
          <ul className="mt-4 space-y-5">
            <li className="flex space-x-6 items-start">
              <ItemCheck />
              <p className="text-gray-700 font-normal">
                You can earn up to one point for every article you refer (within
                3 days).
              </p>
            </li>
            <li className="flex space-x-6 items-start">
              <ItemCheck />
              <p className="text-gray-700 font-normal">
                Use these points to claim rewards such as a shoutout, private
                communities, etc.
              </p>
            </li>
          </ul>
          <div className="flex items-center mt-10 space-x-2">
            <Input color="gray" value={referralURL} />
            <Button
              onClick={setCopied}
              icon={<MdContentCopy className="w-5 h-5" />}
            >
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="mt-8">
            <hr className="border-b -mb-4" />
            <div className="flex justify-center">
              <p className="text-gray-500 bg-gray-100 px-6 inline">
                Or Share Via
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Button color="white" className="w-full">
              <AiOutlineTwitter className="w-6 h-6 text-gray-500" />
            </Button>
            <Button color="white" className="w-full">
              <AiFillFacebook className="w-6 h-6 text-gray-500" />
            </Button>
            <Button color="white" className="w-full">
              <MdEmail className="w-6 h-6 text-gray-500" />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
