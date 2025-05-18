import { dbClient } from "../database";

interface IDeleteUserRepository {
  id: string;
}
export function deleteUserRepository({ id }: IDeleteUserRepository) {
  return dbClient.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
