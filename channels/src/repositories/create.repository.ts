import { dbClient } from "../database";

interface ICreateChannelRepository {
  name: string;
  about: string;
  userId: string;
}
export function createChannelRepository({
  name,
  about,
  userId,
}: ICreateChannelRepository) {
  return dbClient.channel.create({
    data: {
      name,
      about,
      owner_id: userId,
      createdAt: new Date(),
    },
  });
}
