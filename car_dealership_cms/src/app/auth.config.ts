// src/app/auth.config.ts
import { SignInSchema } from "@/app/schemas/auth.schema";
import { SESSION_MAX_AGE } from "@/config/constants";
import { routes } from "@/config/routes";
import { bcryptPasswordCompare } from "@/lib/bcrypt";
import { issueChallenge } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import type { AdapterUser } from "@auth/core/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
// Remove Resend provider if it's not available in your next-auth version
// import ResendProvider from "next-auth/providers/resend";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { NextAuthOptions } from "next-auth";

// Define custom user type to include requires2FA
interface CustomUser extends DefaultUser {
  requires2FA?: boolean;
}

// Extend the session type to include custom fields
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}

// Export the configuration object with proper typing
export const authConfig: NextAuthOptions = {
  useSecureCookies: false,
  // trustHost: true,
  session: {
    strategy: "database" as const, // Use const assertion to fix the string type issue
    maxAge: SESSION_MAX_AGE / 1000,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const validatedFields = SignInSchema.safeParse(credentials);

          if (!validatedFields.success) return null;

          const user = await prisma.user.findUnique({
            where: { email: validatedFields.data.email },
            select: { id: true, email: true, hashedPassword: true },
          });

          if (!user) return null;

          const match = await bcryptPasswordCompare(
            validatedFields.data.password,
            user.hashedPassword
          );

          if (!match) return null;

          await issueChallenge(user.id, user.email);

          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { id: true, email: true },
          });

          return { ...dbUser, requires2FA: true } as CustomUser;
        } catch (error) {
          console.log({ error });
          return null;
        }
      },
    }),
    // Only include ResendProvider if it's available in your version
    // ResendProvider({}),
  ],
  pages: {
    signIn: routes.signIn,
    signOut: "/auth/sign-out",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ user, token }) {
      if (!user) return token;

      const session = await prisma.session.create({
        data: {
          expires: new Date(Date.now() + SESSION_MAX_AGE),
          sessionToken: crypto.randomUUID(),
          userId: user.id as string,
          requires2FA: (user as CustomUser).requires2FA || false,
        },
      });

      if (!session) return token;

      if (user) token.requires2FA = (user as CustomUser).requires2FA;

      token.id = session.sessionToken;
      token.exp = session.expires.getTime();

      return token;
    },

    async session({ session, user }) {
      session.user = {
        id: user.id,
        email: user.email,
      };
      return session;
    },
  },
  jwt: {
    encode: async ({ token }) => token?.id as string,
  },
};
