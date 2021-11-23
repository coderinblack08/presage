import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import { Navbar } from "../components/landing-page/Navbar";

const Home: NextPage = () => {
  return (
    <Box
    // bgColor="gray.50"
    // h="100vh"
    >
      <Navbar />
      <VStack as="header" spacing={5} px={5} py={24} maxW="2xl" mx="auto">
        <Heading as="h1" fontSize={40} lineHeight="shorter" textAlign="center">
          <Text as="span" color="gray.500">
            Earn from publishing
          </Text>{" "}
          <br /> Reward your top readers
        </Heading>
        <Text
          fontSize="md"
          color="gray.500"
          lineHeight="taller"
          textAlign="center"
        >
          <Text as="strong">Quit Medium &amp; Substack</Text> and publish on
          Presage. Brainstorm, draft, and revise without distractions. Reward
          your readers for referring your articles.
        </Text>
        <HStack w="full" maxW="xl" spacing={2}>
          <Input placeholder="Enter your email" />
          <Button colorScheme="gray" px={6} flexShrink="0">
            Join Waitlist
          </Button>
        </HStack>
        <HStack as={List} justify="space-between" w="full" maxW="lg">
          <ListItem color="gray.600" fontSize="sm">
            <ListIcon as={CheckIcon} color="gray.400" />
            Generous Free Plan
          </ListItem>
          <ListItem color="gray.600" fontSize="sm">
            <ListIcon as={CheckIcon} color="gray.400" />
            Grow with Referrals
          </ListItem>
          <ListItem color="gray.600" fontSize="sm">
            <ListIcon as={CheckIcon} color="gray.400" />
            Open Source
          </ListItem>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Home;
