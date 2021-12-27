import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { generateHTML } from "@tiptap/core";
import { format } from "date-fns";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import { MdFavoriteBorder, MdOutlineComment, MdShare } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { defaultMutationFn } from "../../lib/utils/defaultMutationFn";
import { CommentsDrawer } from "../../modules/comments/CommentsDrawer";
import { Navbar as AuthenticatedNavbar } from "../../modules/dashboard/Navbar";
import { extensions } from "../../modules/editor/TipTapEditor";
import { Navbar } from "../../modules/marketing/Navbar";
import { Article } from "../../types";

const ArticlePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const { mutateAsync } = useMutation(defaultMutationFn);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: me } = useQuery("/auth/me");
  const { data: article } = useQuery<Article>(`/articles/${id}`);

  return (
    <Box>
      {me ? <AuthenticatedNavbar /> : <Navbar />}
      <Box as="header" borderBottom="1px" borderColor="gray.200">
        <Box maxW="3xl" mx="auto" px={5} pt={16} pb={12}>
          <Heading fontFamily="body" fontSize="3xl">
            {article?.title}
          </Heading>
          <HStack mt={2} mb={8} align="center" spacing={3}>
            <Text color="gray.500">
              By <Link>{article?.user?.displayName}</Link>
            </Text>
            <Divider orientation="vertical" h={4} borderColor="gray.300" />
            <Text color="gray.500">
              Published on{" "}
              {article?.publishedAt &&
                format(new Date(article?.publishedAt), "MMMM dd, yyyy")}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Button
              size="sm"
              color="gray.500"
              onClick={async () => {
                await mutateAsync(
                  [`/reactions/${id}`, { type: "like" }, "POST"],
                  {
                    onSuccess: () => {},
                  }
                );
              }}
              leftIcon={<MdFavoriteBorder size={18} />}
              variant="outline"
            >
              {article?.likeCount}
            </Button>
            <Button
              size="sm"
              color="gray.500"
              variant="outline"
              onClick={onOpen}
              leftIcon={<MdOutlineComment size={18} />}
            >
              {article?.commentCount}
            </Button>
            <Button
              size="sm"
              color="gray.500"
              variant="outline"
              leftIcon={<MdShare size={18} />}
            >
              {article?.shareCount}
            </Button>
          </HStack>
        </Box>
      </Box>
      <Box maxW="3xl" mx="auto" px={5} py={12}>
        {article && (
          <Box
            className="typography"
            dangerouslySetInnerHTML={{
              __html: generateHTML(article?.editorJSON || {}, extensions),
            }}
          />
        )}
        <Flex mt={12} onClick={onOpen}>
          <Input placeholder="Enter your comment..." />
          <Button px={6} colorScheme="blue" flexShrink={0} ml={2}>
            Reply
          </Button>
        </Flex>
        <CommentsDrawer isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.query.id?.toString(),
    },
  };
};

export default ArticlePage;
