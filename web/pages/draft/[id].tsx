import { Box, chakra } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import React from "react";
import { Navbar } from "../../components/dashboard/Navbar";
import { TipTapEditor } from "../../components/editor/TipTapEditor";

const Dashboard: NextPage = () => {
  return (
    <Box height="100vh">
      <Navbar showActions />
      <Formik
        initialValues={{ title: "", editorJSON: null }}
        onSubmit={() => {}}
      >
        {({ handleChange, handleBlur, values }) => (
          <Box as={Form} my={20} px={8} maxW="3xl" mx="auto">
            <chakra.input
              _focus={{ outline: "none" }}
              placeholder="Untitled"
              fontWeight="bold"
              fontSize="4xl"
              w="full"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TipTapEditor />
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Dashboard;
