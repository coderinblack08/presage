import { CheckCircleIcon } from "@chakra-ui/icons";
import {
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

const Home: NextPage = () => {
  return (
    <VStack as="header" spacing={5} px={5} py={24} maxW="2xl" mx="auto">
      <Heading as="h1" size="2xl" lineHeight="shorter" textAlign="center">
        <Text as="span" color="gray.500">
          Earn from publishing
        </Text>{" "}
        <br /> Reward your top readers
      </Heading>
      <Text color="gray.500" lineHeight="taller" textAlign="center">
        <Text as="strong">Quit Medium &amp; Substack</Text> and publish on
        Presage. Brainstorm, draft, and revise without distractions. Reward your
        readers for referring your articles.
      </Text>
      <HStack w="full" maxW="xl" spacing={2}>
        <Input placeholder="Enter your email" />
        <Button px={6} flexShrink="0">
          Join Waitlist
        </Button>
      </HStack>
      <HStack as={List} justify="space-between" w="full" maxW="lg">
        <ListItem color="gray.600" fontSize="sm">
          <ListIcon w={4} h={4} as={CheckCircleIcon} color="gray.400" />
          Generous Free Plan
        </ListItem>
        <ListItem color="gray.600" fontSize="sm">
          <ListIcon w={4} h={4} as={CheckCircleIcon} color="gray.400" />
          Grow with Referrals
        </ListItem>
        <ListItem color="gray.600" fontSize="sm">
          <ListIcon w={4} h={4} as={CheckCircleIcon} color="gray.400" />
          Open Source
        </ListItem>
      </HStack>
    </VStack>
  );
};

export default Home;
