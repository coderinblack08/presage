import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../../components/Button";
import { mutator } from "../../lib/mutator";
import { MutateRewardModal } from "./MutateRewardModal";

interface CreateRewardModalProps {}

export const CreateRewardModal: React.FC<CreateRewardModalProps> = ({}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation(mutator);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        icon={<MdAdd className="w-5 h-5 text-gray-500" />}
        color="transparent"
        size="none"
        noAnimate
      />
      <MutateRewardModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onSubmit={async (values) => {
          await mutateAsync(["/rewards", values, "post"], {
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
