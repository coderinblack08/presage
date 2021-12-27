import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { Navbar } from "../modules/marketing/Navbar";

const Home: NextPage = () => {
  return (
    <Box
    // bgColor="gray.50"
    // h="100vh"
    >
      <Navbar />
      <VStack
        as="header"
        spacing={[4, 5]}
        px={5}
        py={[14, 24]}
        maxW="2xl"
        mx="auto"
      >
        <Heading
          as="h1"
          fontSize={[26, "4xl", 40]}
          lineHeight="short"
          textAlign="center"
        >
          <Text as="span" color="gray.500">
            Earn from publishing
          </Text>{" "}
          <br /> Reward your top readers
        </Heading>
        <Text
          fontSize={["xs", "sm", "md"]}
          color="gray.500"
          lineHeight="taller"
          textAlign="center"
        >
          <Text as="strong">Quit Medium &amp; Substack</Text> and publish on
          Presage. Brainstorm, draft, and revise without distractions. Reward
          your readers for referring your articles.
        </Text>
        <Flex direction={["column", "row"]} w="full" maxW="xl" spacing={2}>
          <Input placeholder="Enter your email" mb={[2, 0]} mr={[0, 2]} />
          <Button colorScheme="blue" px={[4, 6]} flexShrink="0">
            Join Waitlist
          </Button>
        </Flex>
        <HStack as={List} justify="space-between" w="full" maxW="lg">
          <ListItem color="gray.600" fontSize={["xs", "sm"]}>
            <ListIcon as={CheckIcon} color="gray.400" />
            Generous Free Plan
          </ListItem>
          <ListItem color="gray.600" fontSize={["xs", "sm"]}>
            <ListIcon as={CheckIcon} color="gray.400" />
            Grow with Referrals
          </ListItem>
          <ListItem color="gray.600" fontSize={["xs", "sm"]}>
            <ListIcon as={CheckIcon} color="gray.400" />
            Open Source
          </ListItem>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Home;
