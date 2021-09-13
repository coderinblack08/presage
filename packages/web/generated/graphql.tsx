import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type Application = {
  __typename?: 'Application';
  id: Scalars['ID'];
  email: Scalars['String'];
  reason: Scalars['String'];
  twitter?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  substack?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  status: Scalars['Float'];
  userId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Article = {
  __typename?: 'Article';
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  canonical?: Maybe<Scalars['String']>;
  editorJSON?: Maybe<Scalars['JSONObject']>;
  html?: Maybe<Scalars['String']>;
  isPublished: Scalars['Boolean'];
  userId: Scalars['String'];
  user: User;
  journalId: Scalars['String'];
  journal: Journal;
  tags: Array<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  points: Scalars['Float'];
  bookmarks: Scalars['Float'];
  isFavored?: Maybe<Scalars['Boolean']>;
  isBookmarked?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type CreateApplicationInput = {
  email: Scalars['String'];
  reason: Scalars['String'];
  twitter?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  substack?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type CreateJournalArgs = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
};

export type CreateRewardInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  points: Scalars['Float'];
  type: RewardType;
  maxShoutouts?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


export enum FavoriteType {
  Like = 'Like',
  Bookmark = 'Bookmark'
}


export type Journal = {
  __typename?: 'Journal';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  emoji: Scalars['String'];
  userId: Scalars['String'];
  user: User;
  articles: Array<Article>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createJournal: Journal;
  updateJournal?: Maybe<Journal>;
  deleteJournal: Scalars['Boolean'];
  createArticle: Article;
  updateArticle?: Maybe<Article>;
  togglePublishStatus: Scalars['Boolean'];
  deleteArticle: Scalars['Boolean'];
  toggleFavorite: Scalars['Boolean'];
  createApplication: Application;
  createReward: Reward;
};


export type MutationCreateJournalArgs = {
  data: CreateJournalArgs;
};


export type MutationUpdateJournalArgs = {
  data: UpdateJournalArgs;
  id: Scalars['String'];
};


export type MutationDeleteJournalArgs = {
  id: Scalars['String'];
};


export type MutationCreateArticleArgs = {
  journalId: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  data: UpdateArticleInput;
  articleId: Scalars['String'];
};


export type MutationTogglePublishStatusArgs = {
  id: Scalars['String'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String'];
};


export type MutationToggleFavoriteArgs = {
  type?: Maybe<FavoriteType>;
  articleId: Scalars['String'];
};


export type MutationCreateApplicationArgs = {
  data: CreateApplicationInput;
};


export type MutationCreateRewardArgs = {
  data: CreateRewardInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  findJournals: Array<Journal>;
  findDrafts: Array<Article>;
  findArticle?: Maybe<Article>;
  myRewards: Array<Reward>;
};


export type QueryFindDraftsArgs = {
  journalId: Scalars['String'];
};


export type QueryFindArticleArgs = {
  id: Scalars['String'];
};

export type Reward = {
  __typename?: 'Reward';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  points: Scalars['Float'];
  claimCount: Scalars['Float'];
  type: RewardType;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum RewardType {
  Form = 'Form',
  Shoutout = 'Shoutout',
  Message = 'Message',
  Link = 'Link'
}

export type UpdateArticleInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  editorJSON?: Maybe<Scalars['JSONObject']>;
  canonical?: Maybe<Scalars['String']>;
};

export type UpdateJournalArgs = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  username: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ArticleFragment = { __typename?: 'Article', id: string, title: string, description?: Maybe<string>, canonical?: Maybe<string>, html?: Maybe<string>, tags: Array<string>, editorJSON?: Maybe<any>, isPublished: boolean, publishedAt?: Maybe<any>, journalId: string, userId: string, points: number, bookmarks: number, isFavored?: Maybe<boolean>, isBookmarked?: Maybe<boolean>, createdAt: any, updatedAt: any };

export type JournalFragment = { __typename?: 'Journal', id: string, name: string, emoji: string, description?: Maybe<string>, createdAt: any, updatedAt: any };

export type RewardFragment = { __typename?: 'Reward', id: string, name: string, description: string, points: number, claimCount: number, type: RewardType };

export type UserFragment = { __typename?: 'User', id: string, profilePicture?: Maybe<string>, displayName: string, username: string, bio?: Maybe<string>, createdAt: any };

export type CreateBlankArticleMutationVariables = Exact<{
  journalId: Scalars['String'];
}>;


export type CreateBlankArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', id: string, title: string, description?: Maybe<string>, canonical?: Maybe<string>, html?: Maybe<string>, tags: Array<string>, editorJSON?: Maybe<any>, isPublished: boolean, publishedAt?: Maybe<any>, journalId: string, userId: string, points: number, bookmarks: number, isFavored?: Maybe<boolean>, isBookmarked?: Maybe<boolean>, createdAt: any, updatedAt: any } };

export type CreateJournalMutationVariables = Exact<{
  data: CreateJournalArgs;
}>;


export type CreateJournalMutation = { __typename?: 'Mutation', createJournal: { __typename?: 'Journal', id: string, name: string, emoji: string, description?: Maybe<string>, createdAt: any, updatedAt: any } };

export type CreateRewardMutationVariables = Exact<{
  data: CreateRewardInput;
}>;


export type CreateRewardMutation = { __typename?: 'Mutation', createReward: { __typename?: 'Reward', id: string, name: string, description: string, points: number, claimCount: number, type: RewardType } };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: boolean };

export type FavoriteMutationVariables = Exact<{
  articleId: Scalars['String'];
  type?: Maybe<FavoriteType>;
}>;


export type FavoriteMutation = { __typename?: 'Mutation', toggleFavorite: boolean };

export type PublishMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type PublishMutation = { __typename?: 'Mutation', togglePublishStatus: boolean };

export type UpdateArticleMutationVariables = Exact<{
  articleId: Scalars['String'];
  data: UpdateArticleInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle?: Maybe<{ __typename?: 'Article', id: string, title: string, description?: Maybe<string>, canonical?: Maybe<string>, html?: Maybe<string>, tags: Array<string>, editorJSON?: Maybe<any>, isPublished: boolean, publishedAt?: Maybe<any>, journalId: string, userId: string, points: number, bookmarks: number, isFavored?: Maybe<boolean>, isBookmarked?: Maybe<boolean>, createdAt: any, updatedAt: any }> };

export type FindArticleQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindArticleQuery = { __typename?: 'Query', findArticle?: Maybe<{ __typename?: 'Article', id: string, title: string, description?: Maybe<string>, canonical?: Maybe<string>, html?: Maybe<string>, tags: Array<string>, editorJSON?: Maybe<any>, isPublished: boolean, publishedAt?: Maybe<any>, journalId: string, userId: string, points: number, bookmarks: number, isFavored?: Maybe<boolean>, isBookmarked?: Maybe<boolean>, createdAt: any, updatedAt: any, journal: { __typename?: 'Journal', id: string, name: string, emoji: string, description?: Maybe<string>, createdAt: any, updatedAt: any }, user: { __typename?: 'User', id: string, profilePicture?: Maybe<string>, displayName: string, username: string, bio?: Maybe<string>, createdAt: any } }> };

export type FindDraftsQueryVariables = Exact<{
  journalId: Scalars['String'];
}>;


export type FindDraftsQuery = { __typename?: 'Query', findDrafts: Array<{ __typename?: 'Article', id: string, title: string, description?: Maybe<string>, canonical?: Maybe<string>, html?: Maybe<string>, tags: Array<string>, editorJSON?: Maybe<any>, isPublished: boolean, publishedAt?: Maybe<any>, journalId: string, userId: string, points: number, bookmarks: number, isFavored?: Maybe<boolean>, isBookmarked?: Maybe<boolean>, createdAt: any, updatedAt: any }> };

export type FindJournalsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindJournalsQuery = { __typename?: 'Query', findJournals: Array<{ __typename?: 'Journal', id: string, name: string, emoji: string, description?: Maybe<string>, createdAt: any, updatedAt: any }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, profilePicture?: Maybe<string>, displayName: string, username: string, bio?: Maybe<string>, createdAt: any }> };

export type MyRewardsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRewardsQuery = { __typename?: 'Query', myRewards: Array<{ __typename?: 'Reward', id: string, name: string, description: string, points: number, claimCount: number, type: RewardType }> };

export const ArticleFragmentDoc = gql`
    fragment Article on Article {
  id
  title
  description
  canonical
  html
  tags
  editorJSON
  isPublished
  publishedAt
  journalId
  userId
  points
  bookmarks
  isFavored
  isBookmarked
  createdAt
  updatedAt
}
    `;
export const JournalFragmentDoc = gql`
    fragment Journal on Journal {
  id
  name
  emoji
  description
  createdAt
  updatedAt
}
    `;
export const RewardFragmentDoc = gql`
    fragment Reward on Reward {
  id
  name
  description
  points
  claimCount
  type
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  profilePicture
  displayName
  username
  bio
  createdAt
}
    `;
export const CreateBlankArticleDocument = gql`
    mutation CreateBlankArticle($journalId: String!) {
  createArticle(journalId: $journalId) {
    ...Article
  }
}
    ${ArticleFragmentDoc}`;

export function useCreateBlankArticleMutation() {
  return Urql.useMutation<CreateBlankArticleMutation, CreateBlankArticleMutationVariables>(CreateBlankArticleDocument);
};
export const CreateJournalDocument = gql`
    mutation CreateJournal($data: CreateJournalArgs!) {
  createJournal(data: $data) {
    ...Journal
  }
}
    ${JournalFragmentDoc}`;

export function useCreateJournalMutation() {
  return Urql.useMutation<CreateJournalMutation, CreateJournalMutationVariables>(CreateJournalDocument);
};
export const CreateRewardDocument = gql`
    mutation CreateReward($data: CreateRewardInput!) {
  createReward(data: $data) {
    ...Reward
  }
}
    ${RewardFragmentDoc}`;

export function useCreateRewardMutation() {
  return Urql.useMutation<CreateRewardMutation, CreateRewardMutationVariables>(CreateRewardDocument);
};
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: String!) {
  deleteArticle(id: $id)
}
    `;

export function useDeleteArticleMutation() {
  return Urql.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument);
};
export const FavoriteDocument = gql`
    mutation Favorite($articleId: String!, $type: FavoriteType) {
  toggleFavorite(articleId: $articleId, type: $type)
}
    `;

export function useFavoriteMutation() {
  return Urql.useMutation<FavoriteMutation, FavoriteMutationVariables>(FavoriteDocument);
};
export const PublishDocument = gql`
    mutation Publish($id: String!) {
  togglePublishStatus(id: $id)
}
    `;

export function usePublishMutation() {
  return Urql.useMutation<PublishMutation, PublishMutationVariables>(PublishDocument);
};
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($articleId: String!, $data: UpdateArticleInput!) {
  updateArticle(articleId: $articleId, data: $data) {
    ...Article
  }
}
    ${ArticleFragmentDoc}`;

export function useUpdateArticleMutation() {
  return Urql.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument);
};
export const FindArticleDocument = gql`
    query FindArticle($id: String!) {
  findArticle(id: $id) {
    ...Article
    journal {
      ...Journal
    }
    user {
      ...User
    }
  }
}
    ${ArticleFragmentDoc}
${JournalFragmentDoc}
${UserFragmentDoc}`;

export function useFindArticleQuery(options: Omit<Urql.UseQueryArgs<FindArticleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindArticleQuery>({ query: FindArticleDocument, ...options });
};
export const FindDraftsDocument = gql`
    query FindDrafts($journalId: String!) {
  findDrafts(journalId: $journalId) {
    ...Article
  }
}
    ${ArticleFragmentDoc}`;

export function useFindDraftsQuery(options: Omit<Urql.UseQueryArgs<FindDraftsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindDraftsQuery>({ query: FindDraftsDocument, ...options });
};
export const FindJournalsDocument = gql`
    query FindJournals {
  findJournals {
    ...Journal
  }
}
    ${JournalFragmentDoc}`;

export function useFindJournalsQuery(options: Omit<Urql.UseQueryArgs<FindJournalsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindJournalsQuery>({ query: FindJournalsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyRewardsDocument = gql`
    query MyRewards {
  myRewards {
    ...Reward
  }
}
    ${RewardFragmentDoc}`;

export function useMyRewardsQuery(options: Omit<Urql.UseQueryArgs<MyRewardsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyRewardsQuery>({ query: MyRewardsDocument, ...options });
};