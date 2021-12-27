import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Link,
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
              <Link>Create your first article</Link>
            </ListItem>
            <ListItem color="gray.500">
              <ListIcon color="gray.300" as={CheckIcon} />
              <Link>Earning revenue from your audience</Link>
            </ListItem>
            <ListItem color="gray.500">
              <ListIcon color="gray.300" as={CheckIcon} />
              <Link>Blog &amp; Help Center</Link>
            </ListItem>
            <ListItem color="gray.500">
              <ListIcon color="gray.300" as={CheckIcon} />
              <Link>Upgrade to Pro</Link>
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
              <Link>Bullet journalism</Link>
            </ListItem>
            <ListItem color="gray.500">
              <ListIcon color="gray.300" as={CheckIcon} />
              <Link>Fighting writer's block</Link>
            </ListItem>
            <ListItem color="gray.500">
              <ListIcon color="gray.300" as={CheckIcon} />
              <Link>Storytelling for beginners</Link>
            </ListItem>
            <ListItem color="gray.500">
              <ListIcon color="gray.300" as={CheckIcon} />
              <Link>More Coming Soon...</Link>
            </ListItem>
          </List>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
