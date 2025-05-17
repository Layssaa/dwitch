import { prisma } from "@dwitch/db-client";
import { crypto } from "../../lib/crypto";
import { createUserRepository } from "../../repositories";

export async function seedTestDatabase() {
  console.log("🌱 Seeding test database...");

  await prisma.user.deleteMany();

  const password = await crypto.generateHashPassword({
    password: "12345678",
  });

  await createUserRepository({
    email: "adminteste@gmail.com",
    name: "admin",
    password,
  });

  await prisma.user.create({
    data: {
      email: "deletedUser@gmail.com",
      name: "deletedUser",
      password: password,
      createdAt: new Date(),
      deletedAt: new Date(),
    },
  });
}
