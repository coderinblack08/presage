import Prismic from "@prismicio/client";

const apiEndpoint = process.env.NEXT_PUBLIC_PRISMIC;
export const client = Prismic.client(apiEndpoint);
