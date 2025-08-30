import { PrismaClient } from "@prisma/client";

// Global declaration to avoid multiple instances of PrismaClient in development mode (hot reload)
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
