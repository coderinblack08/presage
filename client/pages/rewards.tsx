import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Link,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { MdMoreVert } from "react-icons/md";
import { useQuery } from "react-query";
import { Navbar } from "../modules/dashboard/Navbar";
import { CreateRewardModal } from "../modules/rewards/CreateRewardModal";
import { RewardTableRowModal } from "../modules/rewards/RewardTableRowModal";
import { Reward } from "../types";

const RewardsPage: NextPage = () => {
  const { data } = useQuery<Reward[]>("/rewards");

  return (
    <Box minH="100vh">
      <Navbar />
      <Box my={20} px={5} maxW="5xl" mx="auto">
        <Flex align="center" justify="space-between" mb={6}>
          <Heading fontFamily="body" as="h1" size="lg">
            Rewards
          </Heading>
          <CreateRewardModal />
        </Flex>
        <Tabs colorScheme="blue" isLazy>
          <TabList>
            <Tab _focus={{ outline: "none" }}>Created</Tab>
            <Tab _focus={{ outline: "none" }}>Claimed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <Table variant="simple" my={8}>
                <Thead>
                  <Tr>
                    <Th fontFamily="body">Type</Th>
                    <Th fontFamily="body">Name</Th>
                    <Th fontFamily="body">Description</Th>
                    <Th fontFamily="body" isNumeric>
                      Cost
                    </Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((reward) => (
                    <RewardTableRowModal key={reward.id} reward={reward} />
                  ))}
                </Tbody>
              </Table>
              {data?.length === 0 && (
                <Center w="full" h={8}>
                  <Text color="gray.400">
                    No Rewards Found (<Link color="gray.600">Learn more</Link>)
                  </Text>
                </Center>
              )}
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default RewardsPage;
