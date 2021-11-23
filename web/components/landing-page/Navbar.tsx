import { Flex, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";
import React from "react";
import { login } from "../../lib/authenticate";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Flex p={5} justifyContent="space-between" maxW="5xl" mx="auto">
      <Image src={logo} alt="presage logo" />
      <HStack spacing={6}>
        <NextLink href="/explore" passHref>
          <Link color="gray.600">Explore</Link>
        </NextLink>
        <NextLink href="/pricing" passHref>
          <Link color="gray.600">Pricing</Link>
        </NextLink>
        <Link color="gray.600" onClick={login}>
          Login
        </Link>
      </HStack>
    </Flex>
  );
};
