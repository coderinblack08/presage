import { Flex, HStack, Link, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import { API_URL } from "../../constants";
import logo from "../../public/logo.svg";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const responsiveSize = useBreakpointValue([
    [20, (131 * 20) / 22],
    [22, 131],
  ]);
  const [h, w] = responsiveSize || [22, 131];

  return (
    <Flex
      px={5}
      py={[5, 6]}
      justifyContent="space-between"
      maxW="5xl"
      mx="auto"
    >
      <Image height={h} width={w} src={logo} alt="presage logo" />
      <HStack display={["none", "block"]} spacing={6}>
        <NextLink href="/explore" passHref>
          <Link color="gray.600">Explore</Link>
        </NextLink>
        <NextLink href="/pricing" passHref>
          <Link color="gray.600">Pricing</Link>
        </NextLink>
        <Link href={`${API_URL}/auth/google`} color="gray.600">
          Login
        </Link>
      </HStack>
    </Flex>
  );
};
