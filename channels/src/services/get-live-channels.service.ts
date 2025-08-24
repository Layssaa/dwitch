import { getLiveBroadcastsRepository } from "../repositories/get.repository";

export async function getLiveChannelsService(data: { userId: string }) {
  const { userId } = data;

  const liveBroadcastsFound = await getLiveBroadcastsRepository({ userId });

  return liveBroadcastsFound ?? [];
}
