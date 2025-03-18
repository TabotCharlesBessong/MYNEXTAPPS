// auth.ts
import NextAuth from "next-auth";
import { config } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Add this explicitly to ensure the adapter is properly initialized
const adapter = PrismaAdapter(prisma);

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...config,
  adapter,
});
