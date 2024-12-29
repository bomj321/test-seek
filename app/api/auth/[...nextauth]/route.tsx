import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@config/env";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      //Any cuz I am sending a custom body to control errors.
      async authorize(credentials): Promise<any> {
        const correctUser = { email: "test@test.com", password: "123456" };
        if (
          credentials.email !== correctUser.email ||
          credentials.password !== correctUser.password
        ) {
          throw new Error("401");
        } else {
          return correctUser;
        }
      },
    }),
  ],
  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: env.AUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session = token as any;
      return session;
    },
    async redirect({ url }) {
      if (url) {
        return url;
      }
    },
  },

  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
