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
};


export type Journal = {
  __typename?: 'Journal';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  color: Scalars['String'];
  userId: Scalars['String'];
  user: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createJournal: Journal;
  updateJournal?: Maybe<Journal>;
  deleteJournal: Scalars['Boolean'];
};


export type MutationCreateJournalArgs = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};


export type MutationUpdateJournalArgs = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationDeleteJournalArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  findJournals: Array<Journal>;
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

export type JournalFragment = { __typename?: 'Journal', id: string, name: string, color: string, description?: Maybe<string>, createdAt: any, updatedAt: any };

export type UserFragment = { __typename?: 'User', id: string, profilePicture?: Maybe<string>, displayName: string, username: string, bio?: Maybe<string>, createdAt: any };

export type FindJournalsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindJournalsQuery = { __typename?: 'Query', findJournals: Array<{ __typename?: 'Journal', id: string, name: string, color: string, description?: Maybe<string>, createdAt: any, updatedAt: any }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, profilePicture?: Maybe<string>, displayName: string, username: string, bio?: Maybe<string>, createdAt: any }> };

export const JournalFragmentDoc = gql`
    fragment Journal on Journal {
  id
  name
  color
  description
  createdAt
  updatedAt
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