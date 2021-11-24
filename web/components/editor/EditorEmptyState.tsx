import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { MdDescription, MdHandyman } from "react-icons/md";

interface EditorEmptyStateProps {}

export const EditorEmptyState: React.FC<EditorEmptyStateProps> = ({}) => {
  return (
    <Box>
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
          <Text as="h6" color="gray.500" fontWeight="bold" mb={4}>
            Get Started
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
          <Text as="h6" color="gray.500" fontWeight="bold" mb={4}>
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
  );
};
