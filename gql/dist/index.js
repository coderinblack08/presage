"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSoundbitesLazyQuery = exports.useSoundbitesQuery = exports.SoundbitesDocument = exports.useSoundbiteLazyQuery = exports.useSoundbiteQuery = exports.SoundbiteDocument = exports.useMeLazyQuery = exports.useMeQuery = exports.MeDocument = exports.useHelloLazyQuery = exports.useHelloQuery = exports.HelloDocument = exports.useVoteMutation = exports.VoteDocument = exports.useCreateSoundbiteMutation = exports.CreateSoundbiteDocument = exports.SoundbiteFragmentFragmentDoc = exports.UserFragmentFragmentDoc = void 0;
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
exports.UserFragmentFragmentDoc = client_1.gql `
    fragment UserFragment on User {
  id
  email
  username
  displayName
  profilePicture
  createdAt
}
    `;
exports.SoundbiteFragmentFragmentDoc = client_1.gql `
    fragment SoundbiteFragment on Soundbite {
  id
  title
  description
  thumbnail
  audio
  length
  points
  updatedAt
  createdAt
  voteStatus
  user {
    ...UserFragment
  }
}
    ${exports.UserFragmentFragmentDoc}`;
exports.CreateSoundbiteDocument = client_1.gql `
    mutation CreateSoundbite($thumbnail: Upload, $audio: Upload!, $data: SoundbiteArgs!) {
  createSoundbite(audio: $audio, data: $data, thumbnail: $thumbnail) {
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
function useCreateSoundbiteMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateSoundbiteDocument, options);
}
exports.useCreateSoundbiteMutation = useCreateSoundbiteMutation;
exports.VoteDocument = client_1.gql `
    mutation Vote($value: Int!, $soundbiteId: String!) {
  vote(value: $value, soundbiteId: $soundbiteId)
}
    `;
function useVoteMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.VoteDocument, options);
}
exports.useVoteMutation = useVoteMutation;
exports.HelloDocument = client_1.gql `
    query Hello {
  hello
}
    `;
function useHelloQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.HelloDocument, options);
}
exports.useHelloQuery = useHelloQuery;
function useHelloLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.HelloDocument, options);
}
exports.useHelloLazyQuery = useHelloLazyQuery;
exports.MeDocument = client_1.gql `
    query Me {
  me {
    ...UserFragment
  }
}
    ${exports.UserFragmentFragmentDoc}`;
function useMeQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.MeDocument, options);
}
exports.useMeQuery = useMeQuery;
function useMeLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.MeDocument, options);
}
exports.useMeLazyQuery = useMeLazyQuery;
exports.SoundbiteDocument = client_1.gql `
    query Soundbite($id: String!) {
  getSoundbite(id: $id) {
    ...SoundbiteFragment
  }
}
    ${exports.SoundbiteFragmentFragmentDoc}`;
function useSoundbiteQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.SoundbiteDocument, options);
}
exports.useSoundbiteQuery = useSoundbiteQuery;
function useSoundbiteLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.SoundbiteDocument, options);
}
exports.useSoundbiteLazyQuery = useSoundbiteLazyQuery;
exports.SoundbitesDocument = client_1.gql `
    query Soundbites($limit: Float!, $offset: Float) {
  paginateSoundbites(limit: $limit, offset: $offset) {
    ...SoundbiteFragment
  }
}
    ${exports.SoundbiteFragmentFragmentDoc}`;
function useSoundbitesQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.SoundbitesDocument, options);
}
exports.useSoundbitesQuery = useSoundbitesQuery;
function useSoundbitesLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.SoundbitesDocument, options);
}
exports.useSoundbitesLazyQuery = useSoundbitesLazyQuery;
//# sourceMappingURL=index.js.map