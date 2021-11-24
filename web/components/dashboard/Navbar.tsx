import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  chakra,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MdApps,
  MdLogout,
  MdPerson,
  MdPublic,
  MdSearch,
  MdUpdate,
} from "react-icons/md";
import { useQuery } from "react-query";
import logo from "../../public/logo.svg";
import { Article, User } from "../../types";
import { NewDraft } from "./NewDraft";

interface NavbarProps {
  showActions?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showActions = false }) => {
  const { data: drafts } = useQuery<Article[]>("/api/drafts");
  const { data: me } = useQuery<User>("/api/me");

  return (
    <Flex
      align="center"
      justify="space-between"
      maxW="5xl"
      mx="auto"
      px={5}
      py={3}
    >
      <Image src={logo} alt="logo" />
      <HStack align="center" spacing={3}>
        {showActions && (
          <>
            <Button colorScheme="purple" leftIcon={<MdPublic size={20} />}>
              Publish
            </Button>
          </>
        )}
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon w={5} h={5} />}
            variant="outline"
          />
          <MenuList>
            <MenuGroup>
              <MenuItem
                icon={
                  <Icon
                    as={MdApps}
                    color="gray.400"
                    size={18}
                    w="auto"
                    h="auto"
                  />
                }
              >
                Dashboard
              </MenuItem>
              <MenuItem
                icon={
                  <Icon
                    as={MdSearch}
                    color="gray.400"
                    size={18}
                    w="auto"
                    h="auto"
                  />
                }
              >
                Explore
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            {(drafts || [])?.length > 0 && (
              <>
                <MenuGroup>
                  {drafts?.map((draft) => (
                    <Link href={`/draft/${draft.id}`} key={draft.id} passHref>
                      <MenuItem
                        as="a"
                        icon={
                          <chakra.svg
                            color="gray.400"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.25 3.75003V14.25H3.75V3.75003H14.25ZM14.25 2.25003H3.75C2.925 2.25003 2.25 2.92503 2.25 3.75003V14.25C2.25 15.075 2.925 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25V3.75003C15.75 2.92503 15.075 2.25003 14.25 2.25003Z"
                              fill="currentColor"
                            />
                            <path
                              d="M10.5 11.25H5.25V9.75003H10.5V11.25ZM12.75 8.25003H5.25V6.75003H12.75V8.25003Z"
                              fill="currentColor"
                            />
                          </chakra.svg>
                        }
                      >
                        {draft.title}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuGroup>
                <MenuDivider />
              </>
            )}
            <MenuGroup>
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
              <NewDraft />
            </MenuGroup>
          </MenuList>
        </Menu>
        <Menu placement="bottom-end">
          <MenuButton>
            <Avatar
              as={Avatar}
              size="md"
              name={me?.displayName}
              src={me?.profilePicture}
            />
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={
                <Icon
                  as={MdPerson}
                  color="gray.400"
                  size={18}
                  w="auto"
                  h="auto"
                />
              }
            >
              Profile
            </MenuItem>
            <MenuItem
              icon={
                <Icon
                  as={MdLogout}
                  color="gray.400"
                  size={18}
                  w="auto"
                  h="auto"
                />
              }
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};
