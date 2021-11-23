import { CheckIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import {
  MdAdd,
  MdAppRegistration,
  MdDescription,
  MdGrid3X3,
  MdHandyman,
  MdPublic,
  MdUpdate,
  MdVerified,
} from "react-icons/md";
import logo from "../public/logo.svg";

const Dashboard: NextPage = () => {
  return (
    <Box height="100vh">
      <Flex
        align="center"
        justify="space-between"
        maxW="5xl"
        mx="auto"
        px={5}
        py={3}
      >
        <Image src={logo} alt="logo" />
        <HStack align="center" spacing={4}>
          <Button colorScheme="purple" leftIcon={<MdPublic size={20} />}>
            Publish
          </Button>
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon w={5} h={5} />}
              variant="outline"
            />
            <MenuList>
              <MenuItem>Dashboard</MenuItem>
              <MenuItem>Explore</MenuItem>
              <MenuDivider />
              <MenuItem
                icon={
                  <Icon
                    as={MdUpdate}
                    color="gray.400"
                    size={18}
                    w="auto"
                    h="auto"
                  />
                }
              >
                Upgrade
              </MenuItem>
              <MenuItem
                icon={
                  <Icon
                    as={MdAdd}
                    color="gray.400"
                    size={18}
                    w="auto"
                    h="auto"
                  />
                }
                command="⌘⇧N"
              >
                New Draft
              </MenuItem>
            </MenuList>
          </Menu>
          <Avatar size="md" name="Kevin Lu" />
        </HStack>
      </Flex>
      <Box my={20} px={8} maxW="3xl" mx="auto">
        <Heading as="h1" fontFamily="body">
          Hello Guys
        </Heading>
        <List spacing={5} mt={8}>
          <ListItem color="gray.500">
            <ListIcon color="gray.300" w={5} h={5} as={MdDescription} />
            Press Enter to continue with an empty draft
          </ListItem>
          <ListItem color="gray.500">
            <ListIcon color="gray.300" w={5} h={5} as={MdHandyman} />
            Press '/' to bring up a command palette
          </ListItem>
        </List>
        <SimpleGrid columns={2} mt={12}>
          <Box>
            <Text as="h6" color="gray.600" fontWeight="bold" mb={4}>
              Get started
            </Text>
            <List spacing={4}>
              <ListItem color="gray.500">
                <ListIcon color="gray.300" as={CheckIcon} />
                Create your first article
              </ListItem>
              <ListItem color="gray.500">
                <ListIcon color="gray.300" as={CheckIcon} />
                Earning revenue from your audience
              </ListItem>
              <ListItem color="gray.500">
                <ListIcon color="gray.300" as={CheckIcon} />
                Blog &amp; Help Center
              </ListItem>
              <ListItem color="gray.500">
                <ListIcon color="gray.300" as={CheckIcon} />
                Upgrade to Pro
              </ListItem>
            </List>
          </Box>
          <Box>
            <Text as="h6" color="gray.600" fontWeight="bold" mb={4}>
              Writing Guides
            </Text>
            <List spacing={4}>
              <ListItem color="gray.500">
                <ListIcon color="gray.300" as={CheckIcon} />
                Bullet journalism
              </ListItem>
              <ListItem color="gray.500">
                <ListIcon color="gray.300" as={CheckIcon} />
                Fighting writer's block
              </ListItem>
              <ListItem color="gray.500">
                <ListIcon color="gray.300" as={CheckIcon} />
                Storytelling for beginners
              </ListItem>
              <ListItem color="gray.500">
                <ListIcon color="gray.300" as={CheckIcon} />
                More Coming Soon...
              </ListItem>
            </List>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;
