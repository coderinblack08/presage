import { Box, chakra } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { Navbar } from "../../components/dashboard/Navbar";
import { TipTapEditor } from "../../components/editor/TipTapEditor";

const Dashboard: NextPage = () => {
  return (
    <Box height="100vh">
      <Navbar showActions />
      <Box my={20} px={8} maxW="3xl" mx="auto">
        <chakra.input
          _focus={{ outline: "none" }}
          fontWeight="bold"
          fontSize="4xl"
          placeholder="Untitled"
        />
        <TipTapEditor />
      </Box>
    </Box>
  );
};

export default Dashboard;
