import { PrismaClient } from "@prisma/client";

// Global declaration to avoid multiple instances of PrismaClient in development mode (hot reload)
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
