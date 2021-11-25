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
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Navbar } from "../../components/dashboard/Navbar";
import { SettingsDrawer } from "../../components/drafts/SettingsDrawer";
import { usePublishMutation } from "../../components/drafts/usePublishMutation";
import { FormikAutoSave } from "../../components/editor/FormikAutoSave";
import { TipTapEditor } from "../../components/editor/TipTapEditor";
import { useUpdateDraftMutation } from "../../components/editor/useUpdateDraftMutation";
import { defaultQueryFn } from "../../lib/utils/defaultQueryFn";
import { Article } from "../../types";

const Dashboard: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const [diff, setDiff] = useState<any>(null);
  const { data: draft } = useQuery<Article>(`/api/draft/${id}`);
  const { mutateAsync } = useUpdateDraftMutation();
  const { mutateAsync: publish, isLoading: isPublishLoading } =
    usePublishMutation();

  return (
    <Formik
      initialValues={{
        title: draft?.title || "",
        editorJSON: draft?.editorJSON || null,
        description: draft?.description || "",
        canonical: draft?.canonical || "",
      }}
      onSubmit={async () => {
        await mutateAsync({ id, values: diff });
      }}
      enableReinitialize
    >
      {({ handleChange, handleBlur, values }) => (
        <Box height="100vh">
          <Navbar />
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
                <SettingsDrawer />
                <Button
                  type="button"
                  onClick={() => publish(id)}
                  isLoading={isPublishLoading}
                  colorScheme="purple"
                  leftIcon={<MdPublic size={20} />}
                >
                  {draft?.isPublished ? "Unpublish" : "Publish"}
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id?.toString();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    `/api/draft/${id}`,
    defaultQueryFn(ctx.req.headers.cookie)
  );

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Dashboard;
