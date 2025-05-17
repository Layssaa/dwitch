import { dbClient } from "../database";

interface IFindUserByEmail {
  email: string;
}

export function findUserRepository({ email }: IFindUserByEmail) {
  return dbClient.user.findFirst({
    where: {
      email,
      deletedAt: null,
    },
  });
}

interface IFindUserById {
  id: string;
}
export function findUserRepositoryById({ id }: IFindUserById) {
  return dbClient.user.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  });
}
