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
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React, { useState } from "react";
import { MdLink, MdPublic } from "react-icons/md";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Navbar } from "../../modules/dashboard/Navbar";
import { SettingsDrawer } from "../../modules/drafts/SettingsDrawer";
import { usePublishMutation } from "../../modules/drafts/usePublishMutation";
import { FormikAutoSave } from "../../modules/editor/FormikAutoSave";
import { TipTapEditor } from "../../modules/editor/TipTapEditor";
import { useUpdateDraftMutation } from "../../modules/editor/useUpdateDraftMutation";
import { defaultQueryFn } from "../../lib/utils/defaultQueryFn";
import { Article } from "../../types";
import Link from "next/link";

const Dashboard: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const [diff, setDiff] = useState<any>(null);
  const { data: draft } = useQuery<Article>(`/articles/${id}`);
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
        tags: (draft?.tags || []).join(", "),
      }}
      onSubmit={async (_, { setFieldError }) => {
        try {
          await mutateAsync({ id, values: diff, setFieldError });
        } catch (error) {}
      }}
      enableReinitialize
    >
      {({ handleChange, handleBlur, values }) => (
        <Box height="100vh">
          <Navbar />
          <Box as={Form} pt={20} pb={40} px={8} maxW="3xl" mx="auto">
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
                  <BreadcrumbLink href="#" isTruncated>
                    {draft?.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <HStack align="center" spacing={2}>
                {draft?.isPublished && (
                  <Link href={`/article/${draft.id}`} passHref>
                    <IconButton
                      as="a"
                      variant="outline"
                      aria-label="view"
                      icon={<Icon as={MdLink} w={6} h={6} />}
                    />
                  </Link>
                )}
                <SettingsDrawer article={draft!} />
                <Button
                  type="button"
                  colorScheme="blue"
                  onClick={() => publish(id)}
                  isLoading={isPublishLoading}
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
    `/articles/${id}`,
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
