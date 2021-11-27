import {
  Box,
  Text,
  Center,
  Flex,
  Heading,
  Link,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";
import { Navbar } from "../modules/dashboard/Navbar";
import { CreateRewardModal } from "../modules/rewards/CreateRewardModal";
import { Reward } from "../types";

const RewardsPage: NextPage = () => {
  const { data } = useQuery<Reward[]>("/rewards");

  return (
    <Box>
      <Navbar />
      <Box my={20} px={8} maxW="5xl" mx="auto">
        <Flex align="center" justify="space-between" mb={4}>
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
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((reward) => (
                    <Tr key={reward.id} onClick={() => alert("hi")}>
                      <Td>
                        <Text textTransform="capitalize">{reward.type}</Text>
                      </Td>
                      <Td>{reward.name}</Td>
                      <Td>{reward.description}</Td>
                      <Td isNumeric>{reward.cost}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Center w="full" h={8}>
                <Text color="gray.400">
                  No Rewards Found (<Link color="gray.600">Learn more</Link>)
                </Text>
              </Center>
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default RewardsPage;
