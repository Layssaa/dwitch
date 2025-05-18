import { dbClient } from "../database";

interface IUpdateChannelRepository {
  id: string;
  name: string;
  about: string;
}
export function updateChannelRepository({
  id,
  about,
  name,
}: IUpdateChannelRepository) {
  return dbClient.channel.update({
    where: {
      id,
    },
    data: {
      about,
      name,
      updatedAt: new Date(),
    },
  });
}
