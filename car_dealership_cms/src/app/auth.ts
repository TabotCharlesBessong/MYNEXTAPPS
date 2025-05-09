// src/app/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

// Create adapter first
const adapter = PrismaAdapter(prisma);

// Initialize NextAuth with the adapter and config
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter,
});

// Explicitly export GET and POST handlers
export const { GET, POST } = handlers;
