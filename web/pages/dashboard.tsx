import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { Navbar } from "../modules/dashboard/Navbar";

const Dashboard: NextPage = () => {
  return (
    <Box>
      <Navbar />
    </Box>
  );
};

export default Dashboard;
