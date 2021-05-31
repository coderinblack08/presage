import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Upload: any;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    updateUser: User;
    createSoundbite: Soundbite;
};
export declare type MutationUpdateUserArgs = {
    data: UserArgs;
};
export declare type MutationCreateSoundbiteArgs = {
    thumbnail?: Maybe<Scalars['Upload']>;
    audio: Scalars['Upload'];
    data: SoundbiteArgs;
};
export declare type Query = {
    __typename?: 'Query';
    hello: Scalars['String'];
    getUser: User;
    paginateUsers: Array<User>;
    me: User;
    getSoundbite: Soundbite;
    paginateSoundbites: Array<Soundbite>;
};
export declare type QueryGetUserArgs = {
    id: Scalars['String'];
};
export declare type QueryPaginateUsersArgs = {
    offset?: Maybe<Scalars['Float']>;
    limit: Scalars['Float'];
};
export declare type QueryGetSoundbiteArgs = {
    id: Scalars['String'];
};
export declare type QueryPaginateSoundbitesArgs = {
    offset?: Maybe<Scalars['Float']>;
    limit: Scalars['Float'];
};
export declare type Soundbite = {
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
export declare type SoundbiteArgs = {
    title: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    length: Scalars['Int'];
};
export declare type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    profilePicture?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
    displayName: Scalars['String'];
    createdAt: Scalars['String'];
    updatedAt: Scalars['String'];
};
export declare type UserArgs = {
    email?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
    displayName?: Maybe<Scalars['String']>;
};
export declare type CreateSoundbiteMutationVariables = Exact<{
    thumbnail?: Maybe<Scalars['Upload']>;
    audio: Scalars['Upload'];
    data: SoundbiteArgs;
}>;
export declare type CreateSoundbiteMutation = ({
    __typename?: 'Mutation';
} & {
    createSoundbite: ({
        __typename?: 'Soundbite';
    } & Pick<Soundbite, 'id' | 'title' | 'description' | 'thumbnail' | 'audio' | 'length' | 'createdAt' | 'updatedAt'>);
});
export declare type HelloQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type HelloQuery = ({
    __typename?: 'Query';
} & Pick<Query, 'hello'>);
export declare type MeQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type MeQuery = ({
    __typename?: 'Query';
} & {
    me: ({
        __typename?: 'User';
    } & Pick<User, 'id' | 'email' | 'username' | 'displayName' | 'profilePicture' | 'createdAt'>);
});
export declare type SoundbitesQueryVariables = Exact<{
    limit: Scalars['Float'];
    offset?: Maybe<Scalars['Float']>;
}>;
export declare type SoundbitesQuery = ({
    __typename?: 'Query';
} & {
    paginateSoundbites: Array<({
        __typename?: 'Soundbite';
    } & Pick<Soundbite, 'id' | 'title' | 'description' | 'thumbnail' | 'audio' | 'length' | 'updatedAt' | 'createdAt'> & {
        user: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'username' | 'profilePicture' | 'displayName' | 'createdAt' | 'updatedAt'>);
    })>;
});
export declare const CreateSoundbiteDocument: Apollo.DocumentNode;
export declare type CreateSoundbiteMutationFn = Apollo.MutationFunction<CreateSoundbiteMutation, CreateSoundbiteMutationVariables>;
export declare function useCreateSoundbiteMutation(baseOptions?: Apollo.MutationHookOptions<CreateSoundbiteMutation, CreateSoundbiteMutationVariables>): Apollo.MutationTuple<CreateSoundbiteMutation, Exact<{
    thumbnail?: any;
    audio: any;
    data: SoundbiteArgs;
}>>;
export declare type CreateSoundbiteMutationHookResult = ReturnType<typeof useCreateSoundbiteMutation>;
export declare type CreateSoundbiteMutationResult = Apollo.MutationResult<CreateSoundbiteMutation>;
export declare type CreateSoundbiteMutationOptions = Apollo.BaseMutationOptions<CreateSoundbiteMutation, CreateSoundbiteMutationVariables>;
export declare const HelloDocument: Apollo.DocumentNode;
export declare function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>): Apollo.QueryResult<HelloQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>): Apollo.QueryTuple<HelloQuery, Exact<{
    [key: string]: never;
}>>;
export declare type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export declare type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export declare type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export declare const MeDocument: Apollo.DocumentNode;
export declare function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>): Apollo.QueryResult<MeQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.QueryTuple<MeQuery, Exact<{
    [key: string]: never;
}>>;
export declare type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export declare type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export declare type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export declare const SoundbitesDocument: Apollo.DocumentNode;
export declare function useSoundbitesQuery(baseOptions: Apollo.QueryHookOptions<SoundbitesQuery, SoundbitesQueryVariables>): Apollo.QueryResult<SoundbitesQuery, Exact<{
    limit: number;
    offset?: Maybe<number> | undefined;
}>>;
export declare function useSoundbitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SoundbitesQuery, SoundbitesQueryVariables>): Apollo.QueryTuple<SoundbitesQuery, Exact<{
    limit: number;
    offset?: Maybe<number> | undefined;
}>>;
export declare type SoundbitesQueryHookResult = ReturnType<typeof useSoundbitesQuery>;
export declare type SoundbitesLazyQueryHookResult = ReturnType<typeof useSoundbitesLazyQuery>;
export declare type SoundbitesQueryResult = Apollo.QueryResult<SoundbitesQuery, SoundbitesQueryVariables>;
