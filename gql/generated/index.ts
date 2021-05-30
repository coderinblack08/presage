import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: User;
  createSoundbite: Soundbite;
};


export type MutationUpdateUserArgs = {
  data: UserArgs;
};


export type MutationCreateSoundbiteArgs = {
  audio: Scalars['Upload'];
  data: SoundbiteArgs;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getUser: User;
  paginateUsers: Array<User>;
  me: User;
  getSoundbite: Soundbite;
  paginateSoundbites: Array<Soundbite>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryPaginateUsersArgs = {
  offset?: Maybe<Scalars['Float']>;
  limit: Scalars['Float'];
};


export type QueryGetSoundbiteArgs = {
  id: Scalars['String'];
};


export type QueryPaginateSoundbitesArgs = {
  offset?: Maybe<Scalars['Float']>;
  limit: Scalars['Float'];
};

export type Soundbite = {
  __typename?: 'Soundbite';
  id: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  audio: Scalars['String'];
  length: Scalars['Int'];
  user: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SoundbiteArgs = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  length: Scalars['Int'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  profilePicture?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserArgs = {
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
};

export type CreateSoundbiteMutationVariables = Exact<{
  audio: Scalars['Upload'];
  data: SoundbiteArgs;
}>;


export type CreateSoundbiteMutation = (
  { __typename?: 'Mutation' }
  & { createSoundbite: (
    { __typename?: 'Soundbite' }
    & Pick<Soundbite, 'id' | 'title' | 'description' | 'thumbnail' | 'audio' | 'length' | 'createdAt' | 'updatedAt'>
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username' | 'displayName' | 'profilePicture' | 'createdAt'>
  ) }
);

export type SoundbitesQueryVariables = Exact<{
  limit: Scalars['Float'];
  offset?: Maybe<Scalars['Float']>;
}>;


export type SoundbitesQuery = (
  { __typename?: 'Query' }
  & { paginateSoundbites: Array<(
    { __typename?: 'Soundbite' }
    & Pick<Soundbite, 'id' | 'title' | 'description' | 'thumbnail' | 'audio' | 'length' | 'updatedAt' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'profilePicture' | 'displayName' | 'createdAt' | 'updatedAt'>
    ) }
  )> }
);


export const CreateSoundbiteDocument = gql`
    mutation CreateSoundbite($audio: Upload!, $data: SoundbiteArgs!) {
  createSoundbite(audio: $audio, data: $data) {
    id
    title
    description
    thumbnail
    audio
    length
    createdAt
    updatedAt
  }
}
    `;
export type CreateSoundbiteMutationFn = Apollo.MutationFunction<CreateSoundbiteMutation, CreateSoundbiteMutationVariables>;

/**
 * __useCreateSoundbiteMutation__
 *
 * To run a mutation, you first call `useCreateSoundbiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSoundbiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSoundbiteMutation, { data, loading, error }] = useCreateSoundbiteMutation({
 *   variables: {
 *      audio: // value for 'audio'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSoundbiteMutation(baseOptions?: Apollo.MutationHookOptions<CreateSoundbiteMutation, CreateSoundbiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSoundbiteMutation, CreateSoundbiteMutationVariables>(CreateSoundbiteDocument, options);
      }
export type CreateSoundbiteMutationHookResult = ReturnType<typeof useCreateSoundbiteMutation>;
export type CreateSoundbiteMutationResult = Apollo.MutationResult<CreateSoundbiteMutation>;
export type CreateSoundbiteMutationOptions = Apollo.BaseMutationOptions<CreateSoundbiteMutation, CreateSoundbiteMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
    displayName
    profilePicture
    createdAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SoundbitesDocument = gql`
    query Soundbites($limit: Float!, $offset: Float) {
  paginateSoundbites(limit: $limit, offset: $offset) {
    id
    title
    description
    thumbnail
    audio
    length
    updatedAt
    createdAt
    user {
      id
      username
      profilePicture
      displayName
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useSoundbitesQuery__
 *
 * To run a query within a React component, call `useSoundbitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSoundbitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSoundbitesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSoundbitesQuery(baseOptions: Apollo.QueryHookOptions<SoundbitesQuery, SoundbitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SoundbitesQuery, SoundbitesQueryVariables>(SoundbitesDocument, options);
      }
export function useSoundbitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SoundbitesQuery, SoundbitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SoundbitesQuery, SoundbitesQueryVariables>(SoundbitesDocument, options);
        }
export type SoundbitesQueryHookResult = ReturnType<typeof useSoundbitesQuery>;
export type SoundbitesLazyQueryHookResult = ReturnType<typeof useSoundbitesLazyQuery>;
export type SoundbitesQueryResult = Apollo.QueryResult<SoundbitesQuery, SoundbitesQueryVariables>;