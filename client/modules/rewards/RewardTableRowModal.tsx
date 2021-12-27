import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { MdMoreVert } from "react-icons/md";
import { Reward } from "../../types";
import { CreateRewardModal } from "./CreateRewardModal";
import { DeleteRewardModal } from "./DeleteRewardModal";

interface RewardTableRowModalProps {
  reward: Reward;
}

export const RewardTableRowModal: React.FC<RewardTableRowModalProps> = ({
  reward,
}) => {
  return (
    <>
      <Tr key={reward.id}>
        <Td>
          <Text textTransform="capitalize">{reward.type}</Text>
        </Td>
        <Td>{reward.name}</Td>
        <Td>{reward.description}</Td>
        <Td isNumeric>{reward.cost}</Td>
        <Td>
          <Menu size="lg">
            <MenuButton
              as={IconButton}
              variant="ghost"
              aria-label="actions"
              icon={<Icon color="gray.400" as={MdMoreVert} w={5} h={5} />}
            />
            <MenuList>
              <CreateRewardModal existingReward={reward} />
              <MenuItem isDisabled>Analytics</MenuItem>
              <DeleteRewardModal reward={reward} />
            </MenuList>
          </Menu>
        </Td>
      </Tr>
    </>
  );
};
