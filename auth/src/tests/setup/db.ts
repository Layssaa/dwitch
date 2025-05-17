import { config } from "dotenv";
config({ path: ".env.test" });

import { prisma } from "@dwitch/db-client";
import { seedTestDatabase } from "./seed";

export default async function globalSetup() {
  if (process.env.NODE_ENV === "test" && process.env.DATABASE_URL?.search("test") !== -1) {
    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "User" RESTART IDENTITY CASCADE'
    );
    await seedTestDatabase();
  }
}
