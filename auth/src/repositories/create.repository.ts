import { dbClient } from "../database";

interface ICreateUserRepository {
  name: string;
  email: string;
  password: string;
}
export function createUserRepository({
  email,
  name,
  password,
}: ICreateUserRepository) {
  return dbClient.user.create({
    data: {
      name,
      email,
      password,
      createdAt: new Date(),
    },
  });
}
