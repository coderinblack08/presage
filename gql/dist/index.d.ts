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
    DateTime: any;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    updateUser: User;
};
export declare type MutationUpdateUserArgs = {
    data: UserArgs;
};
export declare type Query = {
    __typename?: 'Query';
    hello: Scalars['String'];
    getUser: User;
    paginateUsers: Array<User>;
    me: User;
};
export declare type QueryGetUserArgs = {
    id: Scalars['String'];
};
export declare type QueryPaginateUsersArgs = {
    offset?: Maybe<Scalars['Float']>;
    limit: Scalars['Float'];
};
export declare type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    profilePicture?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
    displayName: Scalars['String'];
    createdAt: Scalars['DateTime'];
};
export declare type UserArgs = {
    email?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
    displayName?: Maybe<Scalars['String']>;
};
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
