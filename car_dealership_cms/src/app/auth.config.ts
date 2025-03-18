// auth.config.ts
import { SignInSchema } from "@/app/schemas/auth.schema";
import { SESSION_MAX_AGE } from "@/config/constants";
import { routes } from "@/config/routes";
import { bcryptPasswordCompare } from "@/lib/bcrypt";
import { issueChallenge } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import type { AdapterUser } from "@auth/core/adapters";
import CredentialsProvider from "@auth/core/providers/credentials";
import ResendProvider from "@auth/core/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig, User } from "next-auth";
import { JWT } from "next-auth/jwt";

// Define custom user type to include requires2FA
interface CustomUser extends User {
  requires2FA?: boolean;
}

export const config = {
  adapter: PrismaAdapter(prisma),
  useSecureCookies: false,
  trustHost: true,
  session: {
    strategy: "database",
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
      authorize: async (credentials): Promise<CustomUser | null> => {
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
            select: { id: true, email: true }, // Explicitly select fields instead of omit
          });

          // @ts-ignore
          return { ...dbUser, requires2FA: true };
        } catch (error) {
          console.log({ error });
          return null;
        }
      },
    }),
    ResendProvider({}),
  ],
  pages: {
    signIn: routes.signIn,
    signOut: "/auth/sign-out",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ user, token }: { user?: CustomUser; token: JWT }) {
      if (!user) return token;

      const session = await prisma.session.create({
        data: {
          expires: new Date(Date.now() + SESSION_MAX_AGE),
          sessionToken: crypto.randomUUID(),
          userId: user.id as string,
          requires2FA: user.requires2FA || false,
        },
      });

      if (!session) return token;

      if (user) token.requires2FA = user.requires2FA;

      token.id = session.sessionToken;
      token.exp = session.expires.getTime();

      return token;
    },

    async session({ session, user }: { session: any; user: AdapterUser }) {
      session.user = {
        id: user.id,
        email: user.email,
      };
      return session;
    },
  },
  jwt: {
    encode: async ({ token }: { token?: JWT }) => token?.id as string,
  },
} satisfies NextAuthConfig;
