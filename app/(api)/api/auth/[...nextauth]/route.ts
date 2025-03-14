import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prisma";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRERT!,
      async profile(profile) {
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          realName: user?.realName,
          email: profile.email,
          image: profile.picture,
          role: user?.role,
          city: user?.city,
          country: user?.country,
          timeZone: user?.timeZone,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (trigger === "update") {
        token.role = session.role;
        token.realName = session.realName;
        token.city = session.city;
        token.country = session.country;
        token.timeZone = session.timeZone;
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role as string;
      session.user.realName = token.realName as string;
      session.user.city = token.city as string;
      session.user.country = token.country as string;
      session.user.timeZone = token.timeZone as string;
      session.user.id = token.id as string;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
