import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  chakra,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React, { useState } from "react";
import { MdPublic, MdSettings } from "react-icons/md";
import { useQuery } from "react-query";
import { Navbar } from "../../components/dashboard/Navbar";
import { usePublishMutation } from "../../components/drafts/usePublishMutation";
import { FormikAutoSave } from "../../components/editor/FormikAutoSave";
import { TipTapEditor } from "../../components/editor/TipTapEditor";
import { useUpdateDraftMutation } from "../../components/editor/useUpdateDraftMutation";
import { Article } from "../../types";

const Dashboard: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const [diff, setDiff] = useState(null);
  const { data: draft } = useQuery<Article>(`/api/draft/${id}`);
  const { mutateAsync } = useUpdateDraftMutation();
  const { mutateAsync: publish, isLoading: isPublishLoading } =
    usePublishMutation();

  return (
    <Box height="100vh">
      <Navbar />
      <Formik
        initialValues={{
          title: draft?.title || "",
          editorJSON: draft?.editorJSON || null,
        }}
        onSubmit={async (values) => {
          await mutateAsync({ id, values });
        }}
        enableReinitialize
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
            <TipTapEditor draft={draft} />
            <FormikAutoSave setDiff={setDiff} />
          </Box>
        )}
      </Formik>
      <Box
        w="full"
        borderTop="1px"
        borderColor="gray.200"
        as="footer"
        position="fixed"
        bottom={0}
      >
        <Flex
          align="center"
          justify="space-between"
          maxW="5xl"
          py={3}
          px={5}
          mx="auto"
        >
          <Breadcrumb
            separator={<ChevronRightIcon color="gray.400" w={5} h={5} />}
            spacing={1.5}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Drafts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Article 1</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <HStack align="center" spacing={2}>
            <Button variant="outline" leftIcon={<MdSettings size={20} />}>
              Settings
            </Button>
            <Button
              onClick={() => publish(id)}
              isLoading={isPublishLoading}
              colorScheme="purple"
              leftIcon={<MdPublic size={20} />}
            >
              Publish
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id?.toString();
  return {
    props: {
      id,
    },
  };
};

export default Dashboard;
