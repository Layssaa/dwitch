import { dbClient } from "../database";

interface IFindChannelById {
  id: string;
}
export function findChannelByIdRepository({ id }: IFindChannelById) {
  return dbClient.channel.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  });
}
