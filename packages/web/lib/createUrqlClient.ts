import { dedupExchange, fetchExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  CreateBlankArticleMutation,
  CreateJournalMutation,
  FindArticleDocument,
  FindArticleQuery,
  FindDraftsDocument,
  FindDraftsQuery,
  FindJournalsDocument,
  FindJournalsQuery,
  PublishMutation,
} from "../generated/graphql";
import { isServer } from "./constants";
import { updateCacheQuery } from "./updateCacheUtils";

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            createJournal: (
              result: CreateJournalMutation,
              _args,
              cache,
              _info
            ) => {
              updateCacheQuery<CreateJournalMutation, FindJournalsQuery>(
                cache,
                { query: FindJournalsDocument },
                (old) => ({
                  ...old,
                  findJournals: [...old.findJournals, result.createJournal],
                })
              );
            },
            createArticle: (
              result: CreateBlankArticleMutation,
              _args,
              cache,
              _info
            ) => {
              updateCacheQuery<CreateBlankArticleMutation, FindDraftsQuery>(
                cache,
                {
                  query: FindDraftsDocument,
                  variables: { journalId: result.createArticle.journalId },
                },
                (old) => ({
                  ...old,
                  findDrafts: [...old.findDrafts, result.createArticle],
                })
              );
            },
            togglePublishStatus: (result, args, cache, _info) => {
              updateCacheQuery<PublishMutation, FindArticleQuery>(
                cache,
                {
                  query: FindArticleDocument,
                  variables: args,
                },
                (old) => ({
                  ...old,
                  findArticle: {
                    ...old.findArticle,
                    isPublished: result.togglePublishStatus,
                  } as any,
                })
              );
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};
