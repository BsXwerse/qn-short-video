import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      image: string | null;
      email: string | null;
    };
  }
}

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // console.log('session: ', session, ' user: ', user)
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

const handlers = NextAuth(options);

export { handlers as GET, handlers as POST };
