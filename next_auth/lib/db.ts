import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `prisma` to be used in development (without restarting the server)
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}