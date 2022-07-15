import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../server/prisma";
import { generateUsername } from "friendly-username-generator";
import { env } from "../../../server/env";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: (data) => {
      return prisma.user.create({
        data: { ...data, username: generateUsername() },
      });
    },
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  secret: env.NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);
