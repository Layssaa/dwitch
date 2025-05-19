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
    omit: {
      password: true,
    }
  });
}

interface IFindChannelByUserId {
  userId: string;
}
export function findChannelByUserIdRepository({
  userId,
}: IFindChannelByUserId) {
  return dbClient.channel.findFirst({
    where: {
      owner_id: userId,
      deletedAt: null,
    },
  });
}

