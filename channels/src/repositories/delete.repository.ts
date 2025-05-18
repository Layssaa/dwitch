import { dbClient } from "../database";

interface IDeleteChannelRepository {
  id: string;
}
export function deleteChannelRepository({ id }: IDeleteChannelRepository) {
  return dbClient.channel.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
