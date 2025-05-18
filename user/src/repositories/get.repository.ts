import { dbClient } from "../database";

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
